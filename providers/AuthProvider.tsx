import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

//Định nghĩa kiểu dữ liệu AuthData
type AuthData = {
  session: Session | null; //Đai diện cho thông tin phiên đăng nhập của user
  loading: boolean; //Để xác định trạng thái tải của quá trình xác thực
};

//Tạo Context với kiểU dữ liệu bên trên
const AuthContext = createContext<AuthData>({
  session: null, //Khởi tạo giá trị mặc định cho session = null
  loading: true, //Khởi tạo giá trị mặc định cho loading = true
});

export default function AuthProvider({ children }: PropsWithChildren) {
  //Định nghĩa state session và loading
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Được sử dụng để thực hiện các tác vụ một lần khi component được tạo ra
  useEffect(() => {
    console.log("AuthProvider mounted");

    //Định nghĩa Hàm để lấy thông tin phiên đăng nhập từ supabase.auth.getSession()
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session); //Cập nhật giá trị của session.
      setLoading(false); //Cập nhật giá trị của loading.
    };

    //Gọi hàm
    fetchSession();
    //Đăng ký sự kiện onAuthStateChange để lắng nghe sự kiện thay đổi trạng thái đăng nhập
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  //Cung cấp giá trị của session và loading cho toàn bộ ứng dụng thông qua context.
  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

//Hàm này sẽ trả về giá trị của context và có thể tái sử dụng nhiều lần
export const useAuth = () => useContext(AuthContext);
