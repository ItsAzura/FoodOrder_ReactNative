import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import products from "@/assets/data/products";
import { defaultPizzaImg } from "@/components/ProductListItem";
import Button from "@/components/Button";

const sizes = ["S", "M", "L", "XL"];

//Khi bạn tạo một file với tên [id].tsx trong thư mục pages của ứng dụng Next.js, nó sẽ tạo ra một dynamic route cho trang đó.
//Dynamic route này có thể nhận các giá trị động cho id từ URL. \
//Ví dụ, nếu URL là /products/123, thì 123 sẽ là giá trị của id.
const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams(); //useLocalSearchParams: Hook này trả về một object chứa các query params của URL.

  const [selectSize, setSelectSize] = useState("S");

  const product = products.find((p) => p.id.toString() === id);

  const addToCard = () => {
    console.warn("addToCard - size: ", selectSize);
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
            onPress={() => setSelectSize(size)}
            style={[
              styles.size,
              { backgroundColor: selectSize === size ? "lightgrey" : "white" },
            ]}
            key={size}
          >
            <Text
              style={[
                styles.sizeText,
                {
                  color: selectSize === size ? "white" : "black",
                },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.price}>${product.price}</Text>

      <Button text="Add to cart" onPress={addToCard} />
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
