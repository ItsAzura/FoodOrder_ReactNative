import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import products from "@/assets/data/products";

const product = products[0];

import { Image } from "react-native";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image}} style = {styles.img} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    padding: 10,
    borderRadius: 10,
  },
  img: {
    width: "100%",
    aspectRatio: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.tint,
    marginHorizontal: 10,
  },
  
});