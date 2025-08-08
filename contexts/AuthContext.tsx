import React, { createContext, useState, useEffect, ReactNode } from "react";
import { User, Session, AuthError } from "@supabase/supabase-js";
import { supabase } from "@/services/supabase";
import { Alert, Platform } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

// Configure WebBrowser for OAuth
WebBrowser.maybeCompleteAuthSession();

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  study_objective: string;
  unique_reward: string;
  created_at: string;
  updated_at: string;
}

export interface SignUpData {
  email: string;
  password: string;
  name: string;
  study_objective: string;
  unique_reward: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  signUp: (data: SignUpData) => Promise<{ error: AuthError | null }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // URL do redirecionamento baseado na plataforma
  const getRedirectUrl = () => {
    if (Platform.OS === "web") {
      return `${window.location.origin}/auth/callback`;
    } else {
      return Linking.createURL("/auth/callback");
    }
  };

  // Buscar perfil do usuário
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  // Configurar deep linking para mobile
  useEffect(() => {
    if (Platform.OS !== "web") {
      const handleDeepLink = (url: string) => {
        console.log("Deep link received:", url);

        if (url.includes("#access_token") || url.includes("?access_token")) {
          // Extrair tokens da URL
          const urlParams = new URLSearchParams(
            url.split("#")[1] || url.split("?")[1]
          );
          const accessToken = urlParams.get("access_token");
          const refreshToken = urlParams.get("refresh_token");

          if (accessToken) {
            supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken || "",
            });
          }
        }
      };

      const subscription = Linking.addEventListener("url", ({ url }) => {
        handleDeepLink(url);
      });

      // Verificar URL inicial
      Linking.getInitialURL().then((url) => {
        if (url) handleDeepLink(url);
      });

      return () => {
        subscription?.remove();
      };
    }
  }, []);

  // Inicializar sessão
  useEffect(() => {
    setLoading(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state change:", event, session?.user?.email);

      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }

      if (event === "SIGNED_OUT") {
        setProfile(null);
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (data: SignUpData) => {
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            study_objective: data.study_objective,
            unique_reward: data.unique_reward,
          },
        },
      });

      if (error) {
        console.error("SignUp error:", error);
      }

      return { error };
    } catch (error) {
      console.error("SignUp error:", error);
      return { error: error as AuthError };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("SignIn error:", error);
      }

      return { error };
    } catch (error) {
      console.error("SignIn error:", error);
      return { error: error as AuthError };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("SignOut error:", error);
      }
    } catch (error) {
      console.error("SignOut error:", error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      console.log("Attempting Google OAuth sign-in...");

      if (Platform.OS === "web") {
        // Web: usar redirecionamento padrão
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: getRedirectUrl(),
            queryParams: {
              access_type: "offline",
              prompt: "consent",
            },
          },
        });

        if (error) {
          console.error("Google sign in error:", error);
          alert(`Erro ao entrar com Google: ${error.message}`);
        }
      } else {
        // Mobile: usar WebBrowser
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: getRedirectUrl(),
            queryParams: {
              access_type: "offline",
              prompt: "consent",
            },
          },
        });

        if (error) {
          console.error("Google sign in error:", error);
          Alert.alert("Erro", `Erro ao entrar com Google: ${error.message}`);
          return;
        }

        if (data.url) {
          console.log("Opening OAuth URL:", data.url);

          // Abrir o browser para autenticação
          const result = await WebBrowser.openAuthSessionAsync(
            data.url,
            getRedirectUrl()
          );

          console.log("WebBrowser result:", result);

          if (result.type === "success" && result.url) {
            // Processar URL de retorno
            const url = result.url;
            if (
              url.includes("#access_token") ||
              url.includes("?access_token")
            ) {
              const urlParams = new URLSearchParams(
                url.split("#")[1] || url.split("?")[1]
              );

              const accessToken = urlParams.get("access_token");
              const refreshToken = urlParams.get("refresh_token");

              if (accessToken) {
                await supabase.auth.setSession({
                  access_token: accessToken,
                  refresh_token: refreshToken || "",
                });
              }
            }
          } else if (result.type === "cancel") {
            console.log("OAuth cancelled by user");
          }
        }
      }
    } catch (error) {
      console.error("Google sign in error:", error);
      const errorMessage = "Erro inesperado ao tentar entrar com Google";
      if (Platform.OS === "web") {
        alert(errorMessage);
      } else {
        Alert.alert("Erro", errorMessage);
      }
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user || !profile) return;

    try {
      const { error } = await supabase
        .from("user_profiles")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) {
        console.error("Error updating profile:", error);
      } else {
        setProfile((prev) => (prev ? { ...prev, ...updates } : null));
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const value = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    signInWithGoogle,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
