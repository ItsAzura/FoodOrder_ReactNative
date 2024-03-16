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
  profile: any; //Đinh nghĩa kiểu dữ liệu cho profile
  loading: boolean; //Để xác định trạng thái tải của quá trình xác thực
  isAdmin: boolean;
};

//Tạo Context với kiểU dữ liệu bên trên
const AuthContext = createContext<AuthData>({
  session: null, //Khởi tạo giá trị mặc định cho session = null
  profile: null, //Khởi tạo giá trị mặc định cho profile = null
  loading: true, //Khởi tạo giá trị mặc định cho loading = true
  isAdmin: false, //Khởi tạo giá trị mặc định cho isAdmin = false
});

export default function AuthProvider({ children }: PropsWithChildren) {
  //Định nghĩa state session, profile và loading
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Được sử dụng để thực hiện các tác vụ một lần khi component được tạo ra
  useEffect(() => {
    console.log("AuthProvider mounted");

    //Định nghĩa Hàm để lấy thông tin phiên đăng nhập từ supabase.auth.getSession()
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session); //Cập nhật giá trị của session.

      //Kiểm tra xem phiên user có đang tồn tại hay không?
      if (session) {
        // fetch profile
        const { data } = await supabase
          .from("profiles") //Lấy dữ liệu từ bảng profiles
          .select("*") //Chọn tất cả các trường
          .eq("id", session.user.id) //Lọc ID
          .single(); //Chỉ lấy một dòng
        setProfile(data || null); //Cập nhật giá trị của profile. có thì trả về data không thì trả về null
      }

      setLoading(false); //Cập nhật giá trị của loading.
    };

    //Gọi hàm
    fetchSession();
    //Đăng ký sự kiện onAuthStateChange để lắng nghe sự kiện thay đổi trạng thái đăng nhập
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  console.log(profile);

  //Cung cấp giá trị của session và loading cho toàn bộ ứng dụng thông qua context.
  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        profile,
        isAdmin: profile?.group === "ADMIN", //Kiểm tra xem user có phải là admin hay không?
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

//Hàm này sẽ trả về giá trị của context và có thể tái sử dụng nhiều lần
export const useAuth = () => useContext(AuthContext);
