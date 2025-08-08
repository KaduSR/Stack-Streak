import { useStudy } from "@/hooks/useStudy";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, TextInput } from "react-native-paper";

export default function StudyInput() {
  const { stats, todayStudyContent, setTodayStudyContent } = useStudy();

  if (stats.todayCompleted) {
    return (
      <Card style={styles.card}>
        <View style={styles.content}>
          <View style={styles.header}>
            <MaterialIcons name="school" size={24} color="#58CC02" />
            <Text style={styles.title}>O que você estudou hoje</Text>
          </View>

          <Text style={styles.completedText}>&ldquo;{todayStudyContent}&rdquo;</Text>

          <View style={styles.successContainer}>
            <MaterialIcons name="check-circle" size={20} color="#58CC02" />
            <Text style={styles.successText}>Estudo do dia concluído!</Text>
          </View>
        </View>
      </Card>
    );
  }

  return (
    <Card style={styles.card}>
      <View style={styles.content}>
        <View style={styles.header}>
          <MaterialIcons name="edit" size={24} color="#1CB0F6" />
          <Text style={styles.title}>O que você vai estudar hoje?</Text>
        </View>

        <TextInput
          mode="outlined"
          label="Descreva seu estudo de hoje"
          placeholder="Ex: Matemática - Equações do 2º grau, Inglês - Present Perfect..."
          value={todayStudyContent}
          onChangeText={setTodayStudyContent}
          style={styles.input}
          multiline
          numberOfLines={3}
          maxLength={200}
        />

        <Text style={styles.helperText}>
          📚 Descreva brevemente o que você estudou ou pretende estudar hoje
        </Text>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#374151",
    marginLeft: 8,
  },
  input: {
    backgroundColor: "#FFFFFF",
    marginBottom: 8,
  },
  helperText: {
    fontSize: 14,
    color: "#6B7280",
    fontStyle: "italic",
  },
  completedText: {
    fontSize: 16,
    color: "#374151",
    textAlign: "center",
    fontStyle: "italic",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#F0FDF4",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#58CC02",
    marginBottom: 16,
  },
  successContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  successText: {
    fontSize: 16,
    color: "#58CC02",
    fontWeight: "600",
    marginLeft: 8,
  },
});
