import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Button from "@/components/Button";
import { defaultPizzaImg } from "@/components/ProductListItem";
import * as ImagePicker from "expo-image-picker";
import { Stack } from "expo-router";

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
    //Kiểm tra xem người dùng đã nhập vào trường name hay chưa?
    if (!name) {
      setErrors("Name is required");
      return false;
    }
    //Kiểm tra xem người dùng đã nhập vào trường price hay chưa?
    if (!price) {
      setErrors("Price is required");
      return false;
    }
    //Kiểm tra xem người dùng đã nhập vào trường price là một số hay không?
    if (isNaN(parseFloat(price))) {
      setErrors("Price must be a number");
      return false;
    }
    return true;
  };

  // Hàm Chọn Img
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, //mediaTypes: Loại phương tiện mà người dùng có thể chọn.
      allowsEditing: true, //cho phép chỉnh ảnh
      aspect: [4, 3], // Xác định tỷ lệ khung hình
      quality: 1, //Xác định chất lượng img
    });

    //Kiểm tra xem người dùng đã chọn ảnh từ thư viện chưa?
    if (!result.canceled) {
      setImg(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Create Product" }} />

      <Text>create</Text>

      <Image
        source={{ uri: img || defaultPizzaImg }} //Có img thì product.image ko thì defaultPizzaImg
        style={styles.image}
      />

      <Text
        onPress={pickImage} //Khi người dùng nhấn vào nút "Select Image" thì hàm pickImage sẽ được gọi.
        style={styles.textButton}
      >
        Select Image
      </Text>

      <Text style={styles.label}>Product Name</Text>
      <TextInput
        onChangeText={setName} //setName: Hàm này sẽ được gọi khi người dùng nhập vào trường input.
        placeholder="Product Name"
        style={styles.input}
      />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        onChangeText={setPrice} //setPrice: Hàm này sẽ được gọi khi người dùng nhập vào trường input.
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
