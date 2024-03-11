import { View, Text } from "react-native";
import React, { useContext } from "react";
import { useCart } from "@/providers/CartProvider";

const CartScreen = () => {
  const { items } = useCart();

  return (
    <View>
      <Text>{items.length}</Text>
    </View>
  );
};

export default CartScreen;
