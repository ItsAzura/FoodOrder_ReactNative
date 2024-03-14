import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import OrderListItem from "../../../components/OrderListItem";
import orders from "@/assets/data/orders";
import OrderItemListItem from "@/components/OrderItemListItem";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { OrderStatusList } from "@/types";

const OrderDetailScreen = () => {
  //giá trị của id sẽ chứa giá trị của tham số truy vấn id từ URL hiện tại.
  const { id } = useLocalSearchParams();

  //Tìm kiếm đơn hàng có id trùng với id từ URL hiện tại.
  const order = orders.find((o) => o.id.toString() === id);

  //Nếu không tìm thấy đơn hàng, hiển thị thông báo "Order not found!".
  if (!order) {
    return <Text>Order not found!</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />

      <OrderListItem order={order} />

      <FlatList
        data={order.order_items} //Dữ liệu của FlatList sẽ chứa các item trong đơn hàng
        renderItem={({ item }) => <OrderItemListItem item={item} />} //Render từng item trong đơn hàng
        contentContainerStyle={{ gap: 10 }} //Khoảng cách giữa các item trong FlatList
        ListHeaderComponent={() => <OrderListItem order={order} />} //Header của FlatList sẽ chứa thông tin của đơn hàng
        ListFooterComponent={() => (
          <>
            <Text style={{ fontWeight: "bold" }}>Status</Text>
            <View style={{ flexDirection: "row", gap: 5 }}>
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => console.warn("Update status")}
                  style={{
                    borderColor: Colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      order.status === status
                        ? Colors.light.tint
                        : "transparent",
                  }}
                >
                  <Text
                    style={{
                      color:
                        order.status === status ? "white" : Colors.light.tint,
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10,
  },
});

export default OrderDetailScreen;
