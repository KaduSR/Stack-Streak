import { useAuth } from "@/hooks/useAuth";
import { useStudy } from "@/hooks/useStudy";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Modal,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { Button, IconButton, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: screenWidth } = Dimensions.get("window");
const isWeb = screenWidth > 768;

export default function Header() {
  const { resetStreak } = useStudy();
  const { signOut, profile } = useAuth();
  const [showResetModal, setShowResetModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

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

  const handleSignOut = () => {
    setShowUserMenu(false);
    signOut();
  };

  return (
    <>
      <SafeAreaView edges={["top"]} style={styles.container}>
        <View style={[styles.header, isWeb && styles.webHeader]}>
          <View style={styles.titleContainer}>
            <MaterialIcons
              name="local-fire-department"
              size={isWeb ? 32 : 28}
              color="#FF9600"
            />
            <Text style={[styles.title, isWeb && styles.webTitle]}>
              Study Streak
            </Text>
          </View>

          <View style={styles.rightActions}>
            <IconButton
              icon="refresh"
              size={isWeb ? 28 : 24}
              onPress={handleReset}
              iconColor="#6B7280"
            />

            <IconButton
              icon="account-circle"
              size={isWeb ? 28 : 24}
              onPress={() => setShowUserMenu(true)}
              iconColor="#6B7280"
            />
          </View>
        </View>

        {profile && (
          <View style={[styles.welcomeBar, isWeb && styles.webWelcomeBar]}>
            <Text style={[styles.welcomeText, isWeb && styles.webWelcomeText]}>
              Olá, {profile.name}! 👋
            </Text>
            <Text
              style={[styles.objectiveText, isWeb && styles.webObjectiveText]}
            >
              Objetivo: {profile.study_objective}
            </Text>
          </View>
        )}
      </SafeAreaView>

      {/* Modal de Reset */}
      {Platform.OS === "web" && (
        <Modal visible={showResetModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View
              style={[styles.modalContent, isWeb && styles.webModalContent]}
            >
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

      {/* Modal do Menu do Usuário */}
      <Modal visible={showUserMenu} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, isWeb && styles.webModalContent]}>
            <Text style={styles.modalTitle}>Menu do Usuário</Text>
            {profile && (
              <>
                <Text style={styles.profileInfo}>
                  <Text style={styles.profileLabel}>Nome:</Text> {profile.name}
                </Text>
                <Text style={styles.profileInfo}>
                  <Text style={styles.profileLabel}>Email:</Text>{" "}
                  {profile.email}
                </Text>
                <Text style={styles.profileInfo}>
                  <Text style={styles.profileLabel}>Recompensa:</Text>{" "}
                  {profile.unique_reward}
                </Text>
              </>
            )}
            <View style={styles.modalButtons}>
              <Button
                mode="outlined"
                onPress={() => setShowUserMenu(false)}
                style={styles.modalButton}
              >
                Fechar
              </Button>
              <Button
                mode="contained"
                onPress={handleSignOut}
                buttonColor="#FF4444"
                style={styles.modalButton}
              >
                Sair
              </Button>
            </View>
          </View>
        </View>
      </Modal>
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
  webHeader: {
    paddingHorizontal: 24,
    paddingVertical: 16,
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
  webTitle: {
    fontSize: 28,
    marginLeft: 12,
  },
  rightActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  welcomeBar: {
    backgroundColor: "#F0FDF4",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  webWelcomeBar: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },
  webWelcomeText: {
    fontSize: 18,
  },
  objectiveText: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  webObjectiveText: {
    fontSize: 16,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    minWidth: 280,
    maxWidth: "90%",
  },
  webModalContent: {
    minWidth: 400,
    padding: 24,
    borderRadius: 12,
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
  profileInfo: {
    fontSize: 16,
    marginBottom: 8,
    color: "#374151",
  },
  profileLabel: {
    fontWeight: "bold",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 20,
  },
  modalButton: {
    minWidth: 80,
  },
});
