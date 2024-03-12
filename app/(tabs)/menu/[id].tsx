import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "@/assets/data/products";
import { defaultPizzaImg } from "@/components/ProductListItem";
import Button from "@/components/Button";
import { useCart } from "@/providers/CartProvider";
import { PizzaSize } from "@/types";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

//Khi bạn tạo một file với tên [id].tsx trong thư mục pages của ứng dụng Next.js, nó sẽ tạo ra một dynamic route cho trang đó.
//Dynamic route này có thể nhận các giá trị động cho id từ URL. \
//Ví dụ, nếu URL là /products/123, thì 123 sẽ là giá trị của id.
const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams(); //useLocalSearchParams: Hook này trả về một object chứa các query params của URL.
  const { addItem } = useCart(); //useCart: Hook này trả về các thông tin của giỏ hàng.

  const router = useRouter(); //useRouter: Hook này trả về một object chứa các thông tin của router.

  //useState: Hook này cho phép bạn thêm state vào các functional component.
  const [selectSize, setSelectSize] = useState<PizzaSize>("S");

  //find: Phương thức này trả về giá trị của phần tử đầu tiên trong mảng thỏa mãn hàm kiểm tra được cung cấp.
  const product = products.find((p) => p.id.toString() === id);

  //addToCard: Hàm này sẽ được gọi khi người dùng nhấn vào nút "Add to cart".
  const addToCard = () => {
    console.warn("addToCard - size: ", selectSize);
    if (!product) return;
    addItem(product, selectSize);
    router.push("/cart"); //router.push: Phương thức này sẽ chuyển hướng người dùng đến một cart screen.
  };

  if (!product) return <Text>Product not found</Text>;

  return (
    <View>
      <Stack.Screen //<Stack.Screen> để định nghĩa một màn hình trong Stack Navigator
        options={{ title: product?.name }} //options để đặt tiêu đề của màn hình là "Details: " cộng với giá trị của biến id.
      />
      <Image
        source={{ uri: product.image || defaultPizzaImg }}
        style={styles.img}
      />

      <Text>Select Size</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => setSelectSize(size)} //setSelectSize: Hàm này sẽ được gọi khi người dùng nhấn vào một size.
            style={[
              styles.size,
              { backgroundColor: selectSize === size ? "lightgrey" : "white" }, //Nếu size được chọn thì màu sẽ là lightgrey, ngược lại thì là white.
            ]}
            key={size}
          >
            <Text
              style={[
                styles.sizeText,
                {
                  color: selectSize === size ? "white" : "black", //Nếu size được chọn thì màu sẽ là white, ngược lại thì là black.
                },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.price}>${product.price}</Text>

      <Button //Button: Component này sẽ hiển thị một nút nhấn.
        text="Add to cart"
        onPress={addToCard}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 12,
  },
  img: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    marginStart: 10,
    marginTop: 100,
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 12,
  },
  size: {
    backgroundColor: "lightgrey",
    padding: 6,
    borderRadius: 25,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: {
    fontSize: 22,
    fontWeight: "bold",
    margin: 10,
  },
});

export default ProductDetailsScreen;
