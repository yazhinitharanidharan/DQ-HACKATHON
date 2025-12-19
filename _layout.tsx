import { Stack } from "expo-router";
import { Text } from "react-native";

export default function RootStack() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#f6f7fb" },
        headerShadowVisible: false,
        headerTitle: "",
        headerLeft: () => (
          <Text
            style={{
              color: "#7b5cff",
              fontSize: 20,
              fontWeight: "800",
              letterSpacing: 2,
              marginLeft: 10,
            }}
          >
            NEXI
          </Text>
        ),
      }}
    >
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="home" />
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
