import { useAuth } from "@/providers/AuthProvider";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { session } = useAuth();

  //Nếu người dùng đã đăng nhập thì chuyển hướng về trang chủ
  if (session) {
    return <Redirect href={"/"} />;
  }

  return <Stack />;
}
