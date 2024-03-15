import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import Button from "../../components/Button";
import Colors from "../../constants/Colors";
import { Link, Stack } from "expo-router";
import { supabase } from "@/lib/supabase";

const SignUpScreen = () => {
  //Khởi tạo trạng thái của email
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //Khởi tạo trạng thái của loading
  const [loading, setLoading] = useState(false);

  //Hàm đăng ký với email
  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password }); //Gửi yêu cầu đăng ký người dùng mới bằng email và pass
    if (error) Alert.alert(error.message); //Nếu có lỗi thì hiển thị thông báo
    setLoading(false);
    console.log("Sign Up");
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign up" }} />

      <Text style={styles.textTitle}>Sign Up</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter Email"
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter Password"
        style={styles.input}
        secureTextEntry
      />

      <Button
        text={loading ? "Creating account..." : "Create account"}
        disabled={loading}
        onPress={signUpWithEmail}
      />
      <Link href="/sign-in" style={styles.textButton}>
        Sign in
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    flex: 1,
  },
  label: {
    color: "gray",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 5,
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
  textTitle: {
    alignSelf: "center",
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.light.tint,
    marginBottom: 20,
  },
});

export default SignUpScreen;
