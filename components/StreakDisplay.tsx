import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useStudy } from "@/hooks/useStudy";


const AnimatedView = Animated.createAnimatedComponent(View);

export default function StreakDisplay() {
  const { stats } = useStudy();
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
    if (stats.currentStreak === 0) return "Comece sua jornada!";
    if (stats.currentStreak === 1) return "Primeiro dia! Continue assim!";
    if (stats.currentStreak < 7) return "Você está no caminho certo!";
    if (stats.currentStreak < 30) return "Ofensiva impressionante!";
    if (stats.currentStreak < 100) return "Você é incrível!";
    return "Lenda dos estudos!";
  };

  return (
    <Card style={styles.card}>
      <View style={styles.content}>
        <View style={styles.streakContainer}>
          <AnimatedView style={[styles.fireContainer, animatedStyle]}>
            <MaterialIcons
              name="local-fire-department"
              size={60}
              color={getStreakColor()}
            />
          </AnimatedView>

          <Text style={styles.streakNumber}>{stats.currentStreak}</Text>
          <Text style={styles.streakLabel}>dias seguidos</Text>
        </View>

        <Text style={styles.motivationalText}>{getMotivationalText()}</Text>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.longestStreak}</Text>
            <Text style={styles.statLabel}>Recorde</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.totalStudyDays}</Text>
            <Text style={styles.statLabel}>Total</Text>
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
  content: {
    padding: 24,
    alignItems: "center",
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
  streakLabel: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
  },
  motivationalText: {
    fontSize: 18,
    color: "#374151",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1CB0F6",
  },
  statLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
});
