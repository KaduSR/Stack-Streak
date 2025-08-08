import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button, Card } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useStudy } from "@/hooks/useStudy";

export default function RewardInput() {
  const { stats, setTodayReward } = useStudy();
  const [tempReward, setTempReward] = useState(stats.todayReward);
  const [isEditing, setIsEditing] = useState(!stats.todayReward);

  const handleSave = async () => {
    await setTodayReward(tempReward);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setTempReward(stats.todayReward);
    setIsEditing(true);
  };

  return (
    <Card style={styles.card}>
      <View style={styles.content}>
        <View style={styles.header}>
          <MaterialIcons name="card-giftcard" size={24} color="#FF9600" />
          <Text style={styles.title}>Recompensa do Dia</Text>
        </View>

        {isEditing ? (
          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              label="Sua recompensa por estudar hoje"
              placeholder="Ex: Assistir um episódio, comer um doce..."
              value={tempReward}
              onChangeText={setTempReward}
              style={styles.input}
              multiline
              maxLength={100}
            />
            <View style={styles.buttonRow}>
              <Button
                mode="outlined"
                onPress={() => setIsEditing(false)}
                style={styles.button}
              >
                Cancelar
              </Button>
              <Button
                mode="contained"
                onPress={handleSave}
                style={styles.button}
                disabled={!tempReward.trim()}
              >
                Salvar
              </Button>
            </View>
          </View>
        ) : (
          <View style={styles.displayContainer}>
            {stats.todayReward ? (
              <>
                <Text style={styles.rewardText}>"{stats.todayReward}"</Text>
                <Button
                  mode="outlined"
                  onPress={handleEdit}
                  style={styles.editButton}
                  icon="edit"
                >
                  Editar
                </Button>
              </>
            ) : (
              <Button
                mode="contained"
                onPress={() => setIsEditing(true)}
                style={styles.addButton}
                icon="add"
              >
                Definir Recompensa
              </Button>
            )}
          </View>
        )}
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
  inputContainer: {
    gap: 12,
  },
  input: {
    backgroundColor: "#FFFFFF",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  button: {
    minWidth: 80,
  },
  displayContainer: {
    alignItems: "center",
    gap: 12,
  },
  rewardText: {
    fontSize: 16,
    color: "#374151",
    textAlign: "center",
    fontStyle: "italic",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FEF3C7",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#F59E0B",
  },
  editButton: {
    minWidth: 100,
  },
  addButton: {
    minWidth: 150,
  },
});
