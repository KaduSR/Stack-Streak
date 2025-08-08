import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useStudy } from "@/hooks/useStudy";

const DAYS = ["D", "S", "T", "Q", "Q", "S", "S"];
const DAY_NAMES = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export default function WeeklyProgress() {
  const { stats } = useStudy();
  const today = new Date().getDay();

  return (
    <Card style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.title}>Esta Semana</Text>

        <View style={styles.progressContainer}>
          {DAYS.map((day, index) => {
            const isToday = index === today;
            const isCompleted = stats.weeklyProgress[index];
            const isPast = index < today;

            return (
              <View key={index} style={styles.dayContainer}>
                <View
                  style={[
                    styles.dayCircle,
                    isCompleted && styles.completedDay,
                    isToday && styles.todayCircle,
                    isPast && !isCompleted && styles.missedDay,
                  ]}
                >
                  {isCompleted ? (
                    <MaterialIcons name="check" size={20} color="#FFFFFF" />
                  ) : (
                    <Text style={[styles.dayText, isToday && styles.todayText]}>
                      {day}
                    </Text>
                  )}
                </View>
                <Text style={styles.dayName}>{DAY_NAMES[index]}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
    backgroundColor: "#FFFFFF",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 16,
    textAlign: "center",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayContainer: {
    alignItems: "center",
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    marginBottom: 4,
  },
  completedDay: {
    backgroundColor: "#58CC02",
    borderColor: "#58CC02",
  },
  todayCircle: {
    borderColor: "#1CB0F6",
    borderWidth: 3,
  },
  missedDay: {
    backgroundColor: "#FEE2E2",
    borderColor: "#FCA5A5",
  },
  dayText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  todayText: {
    color: "#1CB0F6",
  },
  dayName: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 2,
  },
});
