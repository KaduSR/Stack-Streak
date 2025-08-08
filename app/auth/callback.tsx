import { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { router } from "expo-router";
import { supabase } from "@/services/supabase";

export default function AuthCallback() {
  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Em ambientes web, o Supabase automaticamente processa o callback
        // Aguardar um momento para que a sessão seja processada
        setTimeout(() => {
          router.replace("/");
        }, 1000);
      } catch (error) {
        console.error("Auth callback error:", error);
        router.replace("/(auth)/login");
      }
    };

    handleAuthCallback();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#58CC02" />
      <Text style={styles.text}>Processando autenticação...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: "#374151",
  },
});
