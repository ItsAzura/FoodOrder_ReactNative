import { Redirect } from "expo-router";

//Đoạn mã trên sử dụng Redirect từ thư viện expo-router để thực hiện chuyển hướng từ trang index đến trang menu trong ứng dụng.
export default function TabIndex() {
  return <Redirect href={"/(admin)/menu"} />;
}
