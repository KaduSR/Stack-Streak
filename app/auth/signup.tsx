import { useAuth } from "@/hooks/useAuth";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignupScreen() {
  const { signUp, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    study_objective: "",
    unique_reward: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      return;
    }

    if (formData.password != formData.confirmPassword) {
      return;
    }

    if (!formData.study_objective.trim() || !formData.unique_reward.trim()) {
      return;
    }

    setIsLoading(true);
    const { error } = await signUp({
      email: formData.email.trim(),
      password: formData.password,
      name: formData.name.trim(),
      study_objective: formData.study_objective.trim(),
      unique_reward: formData.unique_reward.trim(),
    });

    if (error) {
      console.error("Signup error:", error.message);
    } else {
      router.replace("/");
    }

    setIsLoading(false);
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Carregando...</Text>
      </SafeAreaView>
    );
  }

  const isFormValid =
    formData.name.trim() &&
    formData.email.trim() &&
    formData.password.trim() &&
    formData.confirmPassword.trim() &&
    formData.password === formData.confirmPassword &&
    formData.study_objective.trim() &&
    formData.unique_reward.trim();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <MaterialIcons
            name="local-fire-department"
            size={60}
            color="#FF9600"
          />
          <Text style={styles.title}>Study Streak</Text>
          <Text style={styles.subtitle}>
            Crie sua conta e comece sua jornada!
          </Text>
        </View>

        <Card style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Cadastro</Text>

            <TextInput
              mode="outlined"
              label="Nome completo"
              value={formData.name}
              onChangeText={(value) => updateField("name", value)}
              style={styles.input}
              autoCapitalize="words"
            />

            <TextInput
              mode="outlined"
              label="Email"
              value={formData.email}
              onChangeText={(value) => updateField("email", value)}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />

            <TextInput
              mode="outlined"
              label="Senha"
              value={formData.password}
              onChangeText={(value) => updateField("password", value)}
              style={styles.input}
              secureTextEntry={!showPassword}
              right={
                <TextInput.Icon
                  icon={showPassword ? "eye-off" : "eye"}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />

            <TextInput
              mode="outlined"
              label="Confirmar senha"
              value={formData.confirmPassword}
              onChangeText={(value) => updateField("confirmPassword", value)}
              style={styles.input}
              secureTextEntry={!showPassword}
              error={
                formData.confirmPassword &&
                formData.password != formData.confirmPassword
              }
            />

            <TextInput
              mode="outlined"
              label="Objetivo de estudo"
              placeholder="Ex: Passar no vestibular, aprender inglês..."
              value={formData.study_objective}
              onChangeText={(value) => updateField("study_objective", value)}
              style={styles.input}
              multiline
              maxLength={200}
            />

            <TextInput
              mode="outlined"
              label="Sua recompensa única"
              placeholder="Ex: Assistir Netflix, comer chocolate, jogar..."
              value={formData.unique_reward}
              onChangeText={(value) => updateField("unique_reward", value)}
              style={styles.input}
              multiline
              maxLength={200}
            />

            <Text style={styles.helperText}>
              💡 Defina uma recompensa especial que você poderá ter a cada dia
              que estudar!
            </Text>

            <Button
              mode="contained"
              onPress={handleSignup}
              style={styles.signupButton}
              loading={isLoading}
              disabled={isLoading || !isFormValid}
            >
              Criar conta
            </Button>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>
                Já tem uma conta?{" "}
                <Link href="/(auth)/login" style={styles.loginLink}>
                  Entrar
                </Link>
              </Text>
            </View>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#374151",
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 8,
  },
  card: {
    elevation: 4,
    backgroundColor: "#FFFFFF",
  },
  cardContent: {
    padding: 24,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#374151",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
  },
  helperText: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 16,
    textAlign: "center",
    fontStyle: "italic",
  },
  signupButton: {
    marginTop: 8,
    marginBottom: 16,
  },
  loginContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  loginText: {
    fontSize: 16,
    color: "#6B7280",
  },
  loginLink: {
    color: "#58CC02",
    fontWeight: "bold",
  },
});
