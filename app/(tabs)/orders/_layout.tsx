import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
// Đoạn mã này có thể được sử dụng để tạo ra một stack navigator
export default function MenuStack() {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen name="index" options={{ title: "Orders" }} />
    </Stack>
  );
}
