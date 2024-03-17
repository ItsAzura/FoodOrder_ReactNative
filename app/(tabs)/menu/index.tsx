import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import ProductListItem from "@/components/ProductListItem";
import { useProductList } from "@/api/products";

export default function MenuScreen() {
  //lấy dữ liệu về danh sách sản phẩm từ supabase
  const { data: products, isLoading, error } = useProductList();

  //Nếu đang tải thì hiển thị ActivityIndicator để giúp người dùng nhận biết rằng ứng dụng đang xử lý dữ liệu và chờ đợi.
  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  //Nếu có lỗi xảy ra, hiển thị thông báo lỗi
  if (error) {
    return <div>Failed to fetch products</div>;
  }

  return (
    <FlatList //Một component hiển thị danh sách dữ liệu
      data={products} //chứa dữ liệu của danh sách cần hiển thị
      renderItem={
        //Props này xác định cách mỗi phần tử trong data được hiển thị.
        ({ item }) => <ProductListItem product={item} /> //Cho biết rằng mỗi phần tử của danh sách (item) sẽ được truyền vào component ProductListItem thông qua props product
      }
      numColumns={2} //Props này xác định số cột trong danh sách
      contentContainerStyle={{ gap: 10, padding: 10 }} //Props này cho phép bạn cấu hình kiểu dáng của nội dung chính của FlatList
      columnWrapperStyle={{ justifyContent: "space-between" }} //Props này xác định kiểu dáng của mỗi dòng trong danh sách khi numColumns lớn hơn 1.
    />
  );
}
