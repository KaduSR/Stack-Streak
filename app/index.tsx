import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native-paper";
import { router } from "expo-router";
import Header from "@/components/Header";
import StreakDisplay from "@/components/StreakDisplay";
import WeeklyProgress from "@/components/WeeklyProgress";
import StudyInput from "@/components/StudyInput";
import StudyButton from "@/components/StudyButton";
import { useAuth } from "@/hooks/useAuth";
import { useStudy } from "@/hooks/useStudy";

const { width: screenWidth } = Dimensions.get("window");
const isWeb = screenWidth > 768;

export default function HomeScreen() {
  const { user, loading: authLoading } = useAuth();
  const { loading: studyLoading } = useStudy();

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/(auth)/login");
    }
  }, [user, authLoading]);

  if (authLoading || studyLoading || !user) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#58CC02" />
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          isWeb && styles.webScrollContent,
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.content, isWeb && styles.webContent]}>
          <StreakDisplay />
          <WeeklyProgress />
          <StudyInput />
          <StudyButton />
        </View>
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  webScrollContent: {
    paddingHorizontal: 0,
    alignItems: "center",
  },
  content: {
    width: "100%",
  },
  webContent: {
    maxWidth: 600,
    width: "100%",
    paddingHorizontal: 20,
  },
  bottomSpacing: {
    height: 32,
  },
});
