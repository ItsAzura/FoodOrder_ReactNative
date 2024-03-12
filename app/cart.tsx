import { View, Text, FlatList } from "react-native";
import React from "react";
import { useCart } from "@/providers/CartProvider";
import CartListItem from "@/components/CartListItem";

const CartScreen = () => {
  //useCart() trả về một đối tượng có thuộc tính items.
  //items sẽ chứa danh sách các sản phẩm trong giỏ hàng, được lấy từ context CartContext.
  const { items } = useCart();

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={items} //data: Mảng chứa các sản phẩm trong giỏ hàng.
        renderItem={({ item }) => <CartListItem cartItem={item} />} //renderItem: Hàm này sẽ được gọi để render mỗi sản phẩm trong giỏ hàng.
        contentContainerStyle={{ padding: 6, gap: 10 }}
      />
    </View>
  );
};

export default CartScreen;
