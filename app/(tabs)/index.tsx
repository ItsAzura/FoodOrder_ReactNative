import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import products from "@/assets/data/products";

import { Image } from "react-native";
import ProductListItem from "@/components/ProductListItem";

export default function MenuScreen() {
  return (
    <View style={{ flex: 1 }}>
      <ProductListItem product={products[5]} />
    </View>
  );
}
