import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

//tạo một đối tượng quản lý trạng thái và thực hiện các truy vấn
const client = new QueryClient();

//Tạo một component QueryProvider để cung cấp client cho các thành phần con
export default function QueryProvider({ children }: PropsWithChildren) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
