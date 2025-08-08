import React, { useState } from "react";
import { View, StyleSheet, Platform, Alert, Modal } from "react-native";
import { Text, IconButton, Button } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStudy } from "@/hooks/useStudy";

export default function Header() {
  const { resetStreak } = useStudy();
  const [showResetModal, setShowResetModal] = useState(false);

  const handleReset = () => {
    if (Platform.OS === "web") {
      setShowResetModal(true);
    } else {
      Alert.alert(
        "Resetar Ofensiva",
        "Tem certeza que deseja resetar sua ofensiva? Esta ação não pode ser desfeita.",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Resetar", style: "destructive", onPress: resetStreak },
        ]
      );
    }
  };

  const confirmReset = () => {
    setShowResetModal(false);
    resetStreak();
  };

  return (
    <>
      <SafeAreaView edges={["top"]} style={styles.container}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <MaterialIcons
              name="local-fire-department"
              size={28}
              color="#FF9600"
            />
            <Text style={styles.title}>Study Streak</Text>
          </View>

          <IconButton
            icon="refresh"
            size={24}
            onPress={handleReset}
            iconColor="#6B7280"
          />
        </View>
      </SafeAreaView>

      {Platform.OS === "web" && (
        <Modal visible={showResetModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Resetar Ofensiva</Text>
              <Text style={styles.modalMessage}>
                Tem certeza que deseja resetar sua ofensiva? Esta ação não pode
                ser desfeita.
              </Text>
              <View style={styles.modalButtons}>
                <Button
                  mode="outlined"
                  onPress={() => setShowResetModal(false)}
                  style={styles.modalButton}
                >
                  Cancelar
                </Button>
                <Button
                  mode="contained"
                  onPress={confirmReset}
                  buttonColor="#FF4444"
                  style={styles.modalButton}
                >
                  Resetar
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#374151",
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    minWidth: 280,
    maxWidth: "90%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#374151",
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    color: "#6B7280",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  modalButton: {
    minWidth: 80,
  },
});
