import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "@/assets/data/products";
import { defaultPizzaImg } from "@/components/ProductListItem";
import Button from "@/components/Button";
import { useCart } from "@/providers/CartProvider";
import { PizzaSize } from "@/types";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";

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
      <Stack.Screen
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

      <Stack.Screen options={{ title: product.name }} />

      <Image
        source={{ uri: product.image || defaultPizzaImg }}
        style={styles.img}
      />

      <Text style={styles.title}>${product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
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
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginStart: 10,
  },
});

export default ProductDetailsScreen;
