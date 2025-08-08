import { useAuth } from "@/hooks/useAuth";
import { useStudy } from "@/hooks/useStudy";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const AnimatedView = Animated.createAnimatedComponent(View);
const { width: screenWidth } = Dimensions.get("window");
const isWeb = screenWidth > 768;

export default function StreakDisplay() {
  const { stats } = useStudy();
  const { profile } = useAuth();
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  React.useEffect(() => {
    if (stats.currentStreak > 0) {
      scale.value = withSequence(withSpring(1.2), withSpring(1));

      rotate.value = withRepeat(
        withSequence(
          withTiming(-10, { duration: 100 }),
          withTiming(10, { duration: 100 }),
          withTiming(0, { duration: 100 })
        ),
        3
      );
    }
  }, [stats.currentStreak]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotate.value}deg` }],
  }));

  const getStreakColor = () => {
    if (stats.currentStreak === 0) return "#9CA3AF";
    if (stats.currentStreak < 7) return "#FF9600";
    if (stats.currentStreak < 30) return "#FF4444";
    return "#FF0000";
  };

  const getMotivationalText = () => {
    if (stats.todayCompleted && profile?.unique_reward) {
      return `Continue assim, você está liberado para sua recompensa: "${profile.unique_reward}" 🎉`;
    }
    if (stats.currentStreak === 0 && stats.longestStreak > 0) {
      return "Sua ofensiva foi interrompida! Hora de recomeçar forte! 💪";
    }
    if (stats.currentStreak === 0) return "Comece sua jornada de estudos!";
    if (stats.currentStreak === 1) return "Primeiro dia! Continue assim!";
    if (stats.currentStreak < 7) return "Você está no caminho certo!";
    if (stats.currentStreak < 30) return "Ofensiva impressionante!";
    if (stats.currentStreak < 100) return "Você é incrível!";
    return "Lenda dos estudos!";
  };

  return (
    <Card style={[styles.card, isWeb && styles.webCard]}>
      <View style={[styles.content, isWeb && styles.webContent]}>
        <View style={styles.streakContainer}>
          <AnimatedView style={[styles.fireContainer, animatedStyle]}>
            <MaterialIcons
              name="local-fire-department"
              size={isWeb ? 80 : 60}
              color={getStreakColor()}
            />
          </AnimatedView>

          <Text style={[styles.streakNumber, isWeb && styles.webStreakNumber]}>
            {stats.currentStreak}
          </Text>
          <Text style={[styles.streakLabel, isWeb && styles.webStreakLabel]}>
            dias seguidos
          </Text>
        </View>

        <Text
          style={[styles.motivationalText, isWeb && styles.webMotivationalText]}
        >
          {getMotivationalText()}
        </Text>

        <View style={[styles.statsRow, isWeb && styles.webStatsRow]}>
          <View style={[styles.statItem, isWeb && styles.webStatItem]}>
            <Text style={[styles.statNumber, isWeb && styles.webStatNumber]}>
              {stats.longestStreak}
            </Text>
            <Text style={[styles.statLabel, isWeb && styles.webStatLabel]}>
              Recorde
            </Text>
          </View>

          <View style={[styles.statItem, isWeb && styles.webStatItem]}>
            <Text style={[styles.statNumber, isWeb && styles.webStatNumber]}>
              {stats.totalStudyDays}
            </Text>
            <Text style={[styles.statLabel, isWeb && styles.webStatLabel]}>
              Total
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    elevation: 4,
    backgroundColor: "#FFFFFF",
  },
  webCard: {
    margin: 20,
    elevation: 6,
    borderRadius: 16,
  },
  content: {
    padding: 24,
    alignItems: "center",
  },
  webContent: {
    padding: 32,
  },
  streakContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  fireContainer: {
    marginBottom: 8,
  },
  streakNumber: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#58CC02",
    marginBottom: 4,
  },
  webStreakNumber: {
    fontSize: 64,
    marginBottom: 8,
  },
  streakLabel: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
  },
  webStreakLabel: {
    fontSize: 18,
  },
  motivationalText: {
    fontSize: 18,
    color: "#374151",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  webMotivationalText: {
    fontSize: 20,
    marginBottom: 32,
    lineHeight: 28,
    maxWidth: 500,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  webStatsRow: {
    gap: 60,
  },
  statItem: {
    alignItems: "center",
  },
  webStatItem: {
    minWidth: 100,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1CB0F6",
  },
  webStatNumber: {
    fontSize: 32,
  },
  statLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  webStatLabel: {
    fontSize: 16,
    marginTop: 6,
  },
});
