import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Button, Text } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  runOnJS,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { useStudy } from "@/hooks/useStudy";


const AnimatedButton = Animated.createAnimatedComponent(Button);

export default function StudyButton() {
  const { stats, markTodayComplete } = useStudy();
  const [isPressed, setIsPressed] = useState(false);
  const scale = useSharedValue(1);

  const handlePress = async () => {
    if (stats.todayCompleted) return;

    setIsPressed(true);

    // Haptic feedback
    if (Platform.OS !== "web") {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    // Animation
    scale.value = withSequence(
      withSpring(0.95),
      withSpring(1.05),
      withSpring(1, undefined, () => {
        runOnJS(setIsPressed)(false);
      })
    );

    await markTodayComplete();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const buttonMode = stats.todayCompleted ? "outlined" : "contained";
  const buttonColor = stats.todayCompleted ? "#58CC02" : undefined;
  const textColor = stats.todayCompleted ? "#58CC02" : "#FFFFFF";

  return (
    <View style={styles.container}>
      <AnimatedButton
        mode={buttonMode}
        onPress={handlePress}
        disabled={isPressed}
        style={[
          styles.button,
          animatedStyle,
          stats.todayCompleted && styles.completedButton,
        ]}
        contentStyle={styles.buttonContent}
        buttonColor={buttonColor}
        loading={isPressed}
      >
        <View style={styles.buttonInner}>
          {stats.todayCompleted ? (
            <>
              <MaterialIcons name="check-circle" size={24} color="#58CC02" />
              <Text style={[styles.buttonText, { color: textColor }]}>
                Concluído hoje!
              </Text>
            </>
          ) : (
            <>
              <MaterialIcons name="school" size={24} color="#FFFFFF" />
              <Text style={[styles.buttonText, { color: textColor }]}>
                Marcar como estudado
              </Text>
            </>
          )}
        </View>
      </AnimatedButton>

      {!stats.todayCompleted && (
        <Text style={styles.encouragementText}>
          Toque para manter sua ofensiva!
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  button: {
    borderRadius: 12,
    elevation: 3,
  },
  completedButton: {
    borderColor: "#58CC02",
    borderWidth: 2,
  },
  buttonContent: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  encouragementText: {
    textAlign: "center",
    fontSize: 14,
    color: "#6B7280",
    marginTop: 8,
    fontStyle: "italic",
  },
});
