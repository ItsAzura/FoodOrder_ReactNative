import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { Link, Redirect, Stack } from "expo-router";
import Button from "@/components/Button";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/lib/supabase";

//Đoạn mã trên sử dụng Redirect từ thư viện expo-router để thực hiện chuyển hướng từ trang index đến trang menu trong ứng dụng.
const index = () => {
  const { session, loading, isAdmin } = useAuth();
  //console.log(session);

  //Nếu đang tải thì hiển thị ActivityIndicator để giúp người dùng nhận biết rằng ứng dụng đang xử lý dữ liệu và chờ đợi.
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  //Nếu chưa đăng nhập thì về sign-in
  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  //Nếu ko phải là admin thì chuyển hướng đến trang user
  if (!isAdmin) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Stack.Screen options={{ title: "Welcome" }} />
      <Link href={"/(tabs)"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(admin)"} asChild>
        <Button text="Admin" />
      </Link>
      <Button onPress={() => supabase.auth.signOut()} text="Sign out" />
    </View>
  );
};

export default index;
