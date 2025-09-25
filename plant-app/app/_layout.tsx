import { Stack } from "expo-router";
import "./global.css"
import { SafeAreaView, StatusBar } from "react-native";

export default function RootLayout() {
  return (
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
  )
}
