import { useAuth } from "@/hooks/useAuth";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Divider, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const { signIn, signInWithGoogle, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      return;
    }

    setIsLoading(true);
    const { error } = await signIn(email.trim(), password);

    if (error) {
      console.error("Login error:", error.message);
    } else {
      router.replace("/");
    }

    setIsLoading(false);
  };

  const handleGoogleLogin = async () => {
    await signInWithGoogle();
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Carregando...</Text>
      </SafeAreaView>
    );
  }

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
          <Text style={styles.subtitle}>Mantenha sua ofensiva de estudos!</Text>
        </View>

        <Card style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Entrar</Text>

            <TextInput
              mode="outlined"
              label="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />

            <TextInput
              mode="outlined"
              label="Senha"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry={!showPassword}
              right={
                <TextInput.Icon
                  icon={showPassword ? "eye-off" : "eye"}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />

            <Button
              mode="contained"
              onPress={handleLogin}
              style={styles.loginButton}
              loading={isLoading}
              disabled={isLoading || !email.trim() || !password.trim()}
            >
              Entrar
            </Button>

            <Divider style={styles.divider} />

            <Button
              mode="outlined"
              onPress={handleGoogleLogin}
              style={styles.socialButton}
              icon="google"
              disabled={isLoading}
            >
              Continuar com Google
            </Button>

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>
                Não tem uma conta?{" "}
                <Link href="/(auth)/signup" style={styles.signupLink}>
                  Cadastre-se
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
  loginButton: {
    marginTop: 8,
    marginBottom: 16,
  },
  divider: {
    marginVertical: 16,
  },
  socialButton: {
    marginBottom: 12,
  },
  signupContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  signupText: {
    fontSize: 16,
    color: "#6B7280",
  },
  signupLink: {
    color: "#58CC02",
    fontWeight: "bold",
  },
});
