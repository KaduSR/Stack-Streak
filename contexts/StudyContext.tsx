import React, { createContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/services/supabase";
import { useAuth } from "@/hooks/useAuth";

export interface StudyStats {
  currentStreak: number;
  longestStreak: number;
  totalStudyDays: number;
  lastStudyDate: string | null;
  todayCompleted: boolean;
  weeklyProgress: boolean[];
}

export interface StudyRecord {
  id: string;
  user_id: string;
  study_content: string;
  study_date: string;
  created_at: string;
}

interface StudyContextType {
  stats: StudyStats;
  loading: boolean;
  todayStudyContent: string;
  setTodayStudyContent: (content: string) => void;
  markTodayComplete: () => Promise<void>;
  resetStreak: () => Promise<void>;
  refreshStats: () => Promise<void>;
}

const DEFAULT_STATS: StudyStats = {
  currentStreak: 0,
  longestStreak: 0,
  totalStudyDays: 0,
  lastStudyDate: null,
  todayCompleted: false,
  weeklyProgress: [false, false, false, false, false, false, false],
};

export const StudyContext = createContext<StudyContextType | undefined>(
  undefined
);

export function StudyProvider({ children }: { children: ReactNode }) {
  const { user, profile } = useAuth();
  const [stats, setStats] = useState<StudyStats>(DEFAULT_STATS);
  const [loading, setLoading] = useState(true);
  const [todayStudyContent, setTodayStudyContent] = useState("");

  // Buscar estatísticas do usuário
  const fetchStats = async () => {
    if (!user) {
      setStats(DEFAULT_STATS);
      setLoading(false);
      return;
    }

    try {
      // Buscar streak do usuário
      const { data: streakData } = await supabase
        .from("user_streaks")
        .select("*")
        .eq("user_id", user.id)
        .single();

      // Verificar se a ofensiva deve ser resetada automaticamente
      let currentStreak = streakData?.current_streak || 0;
      const lastStudyDate = streakData?.last_study_date;

      if (lastStudyDate && currentStreak > 0) {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const lastDate = new Date(lastStudyDate + "T00:00:00");
        const yesterdayString = yesterday.toISOString().split("T")[0];

        // Se o último estudo não foi ontem e a streak é maior que 0, resetar
        if (
          lastDate.toISOString().split("T")[0] !== yesterdayString &&
          lastDate.toISOString().split("T")[0] !==
            today.toISOString().split("T")[0]
        ) {
          console.log(
            "🔥 Ofensiva resetada automaticamente - última data:",
            lastStudyDate
          );

          // Resetar streak no banco
          await supabase
            .from("user_streaks")
            .update({
              current_streak: 0,
              last_study_date: null,
              updated_at: new Date().toISOString(),
            })
            .eq("user_id", user.id);

          currentStreak = 0;
        }
      }

      // Buscar registros de estudo desta semana
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      startOfWeek.setHours(0, 0, 0, 0);

      const { data: weeklyData } = await supabase
        .from("study_records")
        .select("study_date")
        .eq("user_id", user.id)
        .gte("study_date", startOfWeek.toISOString().split("T")[0]);

      // Processar dados da semana
      const weeklyProgress = [false, false, false, false, false, false, false];
      weeklyData?.forEach((record) => {
        const recordDate = new Date(record.study_date + "T00:00:00");
        const dayOfWeek = recordDate.getDay();
        weeklyProgress[dayOfWeek] = true;
      });

      // Verificar se estudou hoje
      const todayString = today.toISOString().split("T")[0];
      const todayCompleted = weeklyProgress[today.getDay()];

      // Buscar o que estudou hoje
      if (todayCompleted) {
        const { data: todayRecord } = await supabase
          .from("study_records")
          .select("study_content")
          .eq("user_id", user.id)
          .eq("study_date", todayString)
          .single();

        if (todayRecord) {
          setTodayStudyContent(todayRecord.study_content);
        }
      }

      const currentStats: StudyStats = {
        currentStreak: currentStreak,
        longestStreak: streakData?.longest_streak || 0,
        totalStudyDays: streakData?.total_study_days || 0,
        lastStudyDate:
          currentStreak > 0 ? streakData?.last_study_date || null : null,
        todayCompleted,
        weeklyProgress,
      };

      setStats(currentStats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      setStats(DEFAULT_STATS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [user]);

  const markTodayComplete = async () => {
    if (!user || stats.todayCompleted || !todayStudyContent.trim()) return;

    try {
      const today = new Date().toISOString().split("T")[0];

      // Salvar registro de estudo
      const { error: recordError } = await supabase
        .from("study_records")
        .insert({
          user_id: user.id,
          study_content: todayStudyContent.trim(),
          study_date: today,
        });

      if (recordError) {
        console.error("Error saving study record:", recordError);
        return;
      }

      // Atualizar streak
      const newStreak = stats.currentStreak + 1;
      const newTotalDays = stats.totalStudyDays + 1;
      const newLongestStreak = Math.max(stats.longestStreak, newStreak);

      const { error: streakError } = await supabase.from("user_streaks").upsert(
        {
          user_id: user.id,
          current_streak: newStreak,
          longest_streak: newLongestStreak,
          total_study_days: newTotalDays,
          last_study_date: today,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id",
        }
      );

      if (streakError) {
        console.error("Error updating streak:", streakError);
        return;
      }

      // Atualizar estado local
      const todayIndex = new Date().getDay();
      const newWeeklyProgress = [...stats.weeklyProgress];
      newWeeklyProgress[todayIndex] = true;

      setStats({
        ...stats,
        currentStreak: newStreak,
        longestStreak: newLongestStreak,
        totalStudyDays: newTotalDays,
        lastStudyDate: today,
        todayCompleted: true,
        weeklyProgress: newWeeklyProgress,
      });
    } catch (error) {
      console.error("Error marking today complete:", error);
    }
  };

  const resetStreak = async () => {
    if (!user) return;

    try {
      const { error } = await supabase.from("user_streaks").upsert(
        {
          user_id: user.id,
          current_streak: 0,
          longest_streak: stats.longestStreak, // Mantém o recorde
          total_study_days: stats.totalStudyDays,
          last_study_date: null,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id",
        }
      );

      if (error) {
        console.error("Error resetting streak:", error);
        return;
      }

      setStats({
        ...stats,
        currentStreak: 0,
        lastStudyDate: null,
        todayCompleted: false,
        weeklyProgress: [false, false, false, false, false, false, false],
      });

      setTodayStudyContent("");
    } catch (error) {
      console.error("Error resetting streak:", error);
    }
  };

  const refreshStats = async () => {
    await fetchStats();
  };

  const value = {
    stats,
    loading,
    todayStudyContent,
    setTodayStudyContent,
    markTodayComplete,
    resetStreak,
    refreshStats,
  };

  return (
    <StudyContext.Provider value={value}>{children}</StudyContext.Provider>
  );
}
