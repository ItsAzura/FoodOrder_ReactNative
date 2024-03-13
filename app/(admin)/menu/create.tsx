import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Button from "@/components/Button";
import { defaultPizzaImg } from "@/components/ProductListItem";
import * as ImagePicker from "expo-image-picker";

const CreateProductScreen = () => {
  //Khởi tạo trạng thái của name
  const [name, setName] = useState("");
  //Khởi tạo trạng thái của price
  const [price, setPrice] = useState("");
  //Khởi tạo trạng thái của error
  const [errors, setErrors] = useState("");
  //Khởi tạo trạng thái của image
  const [img, setImg] = useState<string | null>(null);

  //Hàm reset các trường input
  const resetFields = () => {
    setName("");
    setPrice("");
  };

  //khi tạo sản phẩm mớI
  const onCreate = () => {
    if (!validateInput()) {
      return;
    }

    console.log("Create Product: ", name, price);

    resetFields();
  };

  //Hàm kiểm tra xem lỗi khi nhập vào các trường hay không?
  const validateInput = () => {
    setErrors("");
    if (!name) {
      setErrors("Name is required");
      return false;
    }
    if (!price) {
      setErrors("Price is required");
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setErrors("Price must be a number");
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImg(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text>create</Text>

      <Image source={{ uri: img || defaultPizzaImg }} style={styles.image} />

      <Text onPress={pickImage} style={styles.textButton}>
        Select Image
      </Text>

      <Text style={styles.label}>Product Name</Text>
      <TextInput
        onChangeText={setName}
        placeholder="Product Name"
        style={styles.input}
      />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        onChangeText={setPrice}
        placeholder="9.99"
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={{ color: "red" }}>{errors}</Text>
      <Button text="Create" onPress={onCreate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },

  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  label: {
    color: "gray",
    fontSize: 16,
  },
});

export default CreateProductScreen;
