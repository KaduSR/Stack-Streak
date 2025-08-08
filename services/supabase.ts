import { createClient } from "@supabase/supabase-js";
import { Platform } from "react-native";
import "react-native-url-polyfill/auto";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables");
  throw new Error("Variáveis de ambiente do Supabase não foram definidas.");
}

// Cross-platform storage adapter
const createStorageAdapter = () => {
  if (Platform.OS === "web") {
    return {
      getItem: (key: string) => {
        if (typeof window !== "undefined" && window.localStorage) {
          return Promise.resolve(window.localStorage.getItem(key));
        }
        return Promise.resolve(null);
      },
      setItem: (key: string, value: string) => {
        if (typeof window !== "undefined" && window.localStorage) {
          window.localStorage.setItem(key, value);
          return Promise.resolve();
        }
        return Promise.resolve();
      },
      removeItem: (key: string) => {
        if (typeof window !== "undefined" && window.localStorage) {
          window.localStorage.removeItem(key);
          return Promise.resolve();
        }
        return Promise.resolve();
      },
    };
  } else {
    // For React Native, use AsyncStorage
    const AsyncStorage =
      require("@react-native-async-storage/async-storage").default;
    return AsyncStorage;
  }
};

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: createStorageAdapter(),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: Platform.OS === "web",
  },
});
