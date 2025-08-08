import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "../contexts/AuthContext";
import { StudyProvider } from "../contexts/StudyContext";

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#58CC02",
    secondary: "#FF9600",
    tertiary: "#1CB0F6",
  },
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <AuthProvider>
            <StudyProvider>
              <Slot />
            </StudyProvider>
          </AuthProvider>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
