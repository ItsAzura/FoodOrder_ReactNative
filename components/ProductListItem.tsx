import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { Image } from "react-native";
import { Product } from "@/types";
import { Link, useSegments } from "expo-router";

export const defaultPizzaImg =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

//kiểu dữ liệu đại diện cho các props mà một component ProductListItem cần nhận.
type ProductListItemProps = {
  product: Product; //product: Đại diện cho thông tin của một sản phẩm và có kiểu dữ liệu là Product
};

//Định nghĩa một functional component ProductListItem, nhận props product thông qua destructuring.
const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments();
  console.log(segments);

  return (
    //Link: Điều hướng người dùng đến các trang khác hoặc điều hướng nội dung trong ứng dụng mà không cần tải lại trang
    <Link href={`./${segments[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <Image
          source={{ uri: product.image || defaultPizzaImg }} //Có img thì product.image ko thì defaultPizzaImg
          style={styles.img}
          resizeMode="contain"
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 12,
    borderRadius: 10,
    maxWidth: "50%",
    marginHorizontal: 6,
  },
  img: {
    width: "100%",
    aspectRatio: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.tint,
  },
});
