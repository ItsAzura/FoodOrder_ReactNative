import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { Link, Redirect, Stack } from "expo-router";
import Button from "@/components/Button";

//Đoạn mã trên sử dụng Redirect từ thư viện expo-router để thực hiện chuyển hướng từ trang index đến trang menu trong ứng dụng.
const index = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Stack.Screen options={{ title: "Welcome" }} />
      <Link href={"/(tabs)"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(admin)"} asChild>
        <Button text="Admin" />
      </Link>
      <Link href={"/sign-in"} asChild>
        <Button text="Sign in" />
      </Link>
    </View>
  );
};

export default index;
