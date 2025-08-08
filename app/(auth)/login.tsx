import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Text, TextInput, Button, Card, Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

const { width: screenWidth } = Dimensions.get("window");
const isWeb = screenWidth > 768;

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
      <SafeAreaView
        style={[styles.loadingContainer, isWeb && styles.webLoadingContainer]}
      >
        <Text style={isWeb && styles.webLoadingText}>Carregando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, isWeb && styles.webContainer]}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          isWeb && styles.webScrollContent,
        ]}
      >
        <View style={[styles.content, isWeb && styles.webContent]}>
          <View style={[styles.header, isWeb && styles.webHeader]}>
            <MaterialIcons
              name="local-fire-department"
              size={isWeb ? 80 : 60}
              color="#FF9600"
            />
            <Text style={[styles.title, isWeb && styles.webTitle]}>
              Study Streak
            </Text>
            <Text style={[styles.subtitle, isWeb && styles.webSubtitle]}>
              Mantenha sua ofensiva de estudos!
            </Text>
          </View>

          <Card style={[styles.card, isWeb && styles.webCard]}>
            <View style={[styles.cardContent, isWeb && styles.webCardContent]}>
              <Text style={[styles.cardTitle, isWeb && styles.webCardTitle]}>
                Entrar
              </Text>

              <TextInput
                mode="outlined"
                label="Email"
                value={email}
                onChangeText={setEmail}
                style={[styles.input, isWeb && styles.webInput]}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                contentStyle={isWeb && styles.webInputContent}
              />

              <TextInput
                mode="outlined"
                label="Senha"
                value={password}
                onChangeText={setPassword}
                style={[styles.input, isWeb && styles.webInput]}
                secureTextEntry={!showPassword}
                contentStyle={isWeb && styles.webInputContent}
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
                style={[styles.loginButton, isWeb && styles.webButton]}
                contentStyle={isWeb && styles.webButtonContent}
                loading={isLoading}
                disabled={isLoading || !email.trim() || !password.trim()}
              >
                <Text style={isWeb && styles.webButtonText}>Entrar</Text>
              </Button>

              <Divider style={[styles.divider, isWeb && styles.webDivider]} />

              <Button
                mode="outlined"
                onPress={handleGoogleLogin}
                style={[styles.socialButton, isWeb && styles.webButton]}
                contentStyle={isWeb && styles.webButtonContent}
                icon="google"
                disabled={isLoading}
              >
                <Text style={isWeb && styles.webButtonText}>
                  Continuar com Google
                </Text>
              </Button>

              <View
                style={[
                  styles.signupContainer,
                  isWeb && styles.webSignupContainer,
                ]}
              >
                <Text
                  style={[styles.signupText, isWeb && styles.webSignupText]}
                >
                  Não tem uma conta?{" "}
                  <Link href="/(auth)/signup" style={styles.signupLink}>
                    Cadastre-se
                  </Link>
                </Text>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  webContainer: {
    minHeight: "100vh",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  webLoadingContainer: {
    minHeight: "100vh",
  },
  webLoadingText: {
    fontSize: 18,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  webScrollContent: {
    padding: 40,
    alignItems: "center",
    minHeight: "100vh",
  },
  content: {
    width: "100%",
  },
  webContent: {
    maxWidth: 480,
    width: "100%",
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  webHeader: {
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#374151",
    marginTop: 16,
  },
  webTitle: {
    fontSize: 42,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 8,
  },
  webSubtitle: {
    fontSize: 18,
    marginTop: 12,
  },
  card: {
    elevation: 4,
    backgroundColor: "#FFFFFF",
  },
  webCard: {
    elevation: 8,
    borderRadius: 16,
  },
  cardContent: {
    padding: 24,
  },
  webCardContent: {
    padding: 40,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#374151",
    textAlign: "center",
    marginBottom: 24,
  },
  webCardTitle: {
    fontSize: 28,
    marginBottom: 32,
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
  },
  webInput: {
    marginBottom: 20,
  },
  webInputContent: {
    paddingVertical: 8,
    fontSize: 16,
  },
  loginButton: {
    marginTop: 8,
    marginBottom: 16,
  },
  divider: {
    marginVertical: 16,
  },
  webDivider: {
    marginVertical: 24,
  },
  socialButton: {
    marginBottom: 12,
  },
  webButton: {
    borderRadius: 12,
  },
  webButtonContent: {
    paddingVertical: 8,
  },
  webButtonText: {
    fontSize: 16,
  },
  signupContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  webSignupContainer: {
    marginTop: 24,
  },
  signupText: {
    fontSize: 16,
    color: "#6B7280",
  },
  webSignupText: {
    fontSize: 18,
  },
  signupLink: {
    color: "#58CC02",
    fontWeight: "bold",
  },
});
