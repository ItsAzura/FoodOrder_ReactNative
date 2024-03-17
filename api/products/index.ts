import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase";
import { Product } from "../../types";

//Định nghĩa 1 Hook useProductList sử dụng để lấy danh sách sản phẩm từ cơ sở dữ liệu
export const useProductList = () => {
  return useQuery<Product[]>({
    //Đại diện cho truy vấn danh sách sản phẩm.
    queryKey: ["products"],
    //một hàm xử lý truy vấn dữ liệu
    queryFn: async () => {
      //gọi API từ supabase để lấy danh sách sản phẩm
      const { data, error } = await supabase.from("products").select("*");
      //nếu có lỗi xảy ra, lỗi sẽ được trả về trong prop error.
      if (error) {
        throw new Error(error.message);
      }
      //Nếu truy vấn thành công, dữ liệu trả về sẽ được truyền vào prop data
      return data;
    },
  });
};

//Định nghĩa 1 Hook useProduct sử dụng để lấy thông tin về một sản phẩm cụ thể từ cơ sở dữ liệu
export const useProduct = (id: number) => {
  return useQuery<Product>({
    // một chuỗi định danh cho loại truy vấn và id là ID của sản phẩm cụ thể.
    queryKey: ["product", id],
    //Là một hàm bất đồng bộ được sử dụng để thực hiện truy vấn dữ liệu
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

//Được sử dụng để thêm một sản phẩm mới vào cơ sở dữ liệu.
export const useInsertProduct = () => {
  //Được sử dụng để quản lý truy vấn dữ liệu.
  const queryClient = useQueryClient();

  //Thêm một bản ghi mới vào cơ sở dữ liệu.
  return useMutation({
    async mutationFn(data: any) {
      //Omit: Hàm này sẽ loại bỏ các thuộc tính được chỉ định từ một type.
      const { error } = await supabase.from("products").insert({
        //insert: Phương thức này sẽ thêm một bản ghi mới vào cơ sở dữ liệu.
        name: data.name,
        price: data.price ? data.price.toString() : "",
        image: data.image,
      });
      //Nếu có lỗi xảy ra, lỗi sẽ được trả về.
      if (error) {
        throw error;
      }
    },
    //Khi truy vấn thành công, dữ liệu sẽ được cập nhật lại.
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    //Khi truy vấn thất bại, lỗi sẽ được hiển thị.
    onError(error) {
      console.log(error);
    },
  });
};

//Được sử dụng để cập nhật thông tin của một sản phẩm cụ thể.
export const useUpdateProduct = () => {
  //Được sử dụng để quản lý truy vấn dữ liệu.
  const queryClient = useQueryClient();
  //Cập nhật thông tin của một sản phẩm cụ thể.
  return useMutation({
    async mutationFn({ id, ...update }: Product) {
      const { data, error } = await supabase
        .from("products")
        .update(update)
        .eq("id", id)
        .select();

      if (error) {
        throw error;
      }
      return data;
    },
    //Khi truy vấn thành công, dữ liệu sẽ được cập nhật lại.
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      await queryClient.invalidateQueries({ queryKey: ["product", id] });
    },
    //Khi truy vấn thất bại, lỗi sẽ được hiển thị.
    onError(error) {
      console.log(error);
    },
  });
};

//Định nghĩa một hook tùy chỉnh để xóa một sản phẩm cụ thể từ cơ sở dữ liệu
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  //Được cấu hình để thực hiện hành động xóa sản phẩm.
  return useMutation({
    //Thực hiện việc gọi API để xóa sản phẩm từ cơ sở dữ liệu Supabase
    async mutationFn(id: number) {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) {
        throw new Error(error.message);
      }
    },
    //Sau khi xóa sản phẩm thành công
    async onSuccess() {
      //Để làm mới cache và cập nhật dữ liệu sản phẩm, đảm bảo rằng danh sách sản phẩm được hiển th
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
