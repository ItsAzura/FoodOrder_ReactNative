import { FlatList, StyleSheet } from "react-native";
import products from "@/assets/data/products";
import ProductListItem from "@/components/ProductListItem";

export default function MenuScreen() {
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
