import { View, Text, FlatList, ScrollView } from "react-native";
import React from "react";
import { useCart } from "@/providers/CartProvider";
import CartListItem from "@/components/CartListItem";
import Button from "@/components/Button";

const CartScreen = () => {
  //useCart() trả về một đối tượng có thuộc tính items.
  //items sẽ chứa danh sách các sản phẩm trong giỏ hàng, được lấy từ context CartContext.
  //total sẽ chứa tổng giá trị của các sản phẩm trong giỏ hàng.
  const { items, total } = useCart();

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ padding: 10 }}
        ListFooterComponent={() => (
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 6 }}>
              Total: ${total.toFixed(2)}
            </Text>
            <Button text="Checkout" />
          </View>
        )}
      />
    </View>
  );
};

export default CartScreen;
