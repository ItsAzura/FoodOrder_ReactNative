import "react-native-url-polyfill/auto";
import * as SecureStore from "expo-secure-store";
import { createClient } from "@supabase/supabase-js";

//Định nghĩa một adapter cho việc lưu trữ an toàn
const ExpoSecureStoreAdapter = {
  //Hàm getItem trả về giá trị của key
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  //Hàm setItem lưu giá trị value vào key
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  //Hàm removeItem xóa key
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = "https://bejoovseedanntciolar.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlam9vdnNlZWRhbm50Y2lvbGFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA1MTE0MjEsImV4cCI6MjAyNjA4NzQyMX0.XoJSUilm_LUG0yZ9Tb3l-Sfh-3-ewre3B0mhKBQTrLc";

//Tạo một client để kết nối với supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    //Sử dụng adapter để lưu trữ an toàn
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
