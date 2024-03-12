import { CartItem, Product } from "@/types";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import * as Crypto from "expo-crypto";

type CartType = {
  items: CartItem[]; //items là một mảng chứa các đối tượng CartItem.
  addItem: (Product: Product, size: CartItem["size"]) => void; // hàm được sử dụng để thêm một sản phẩm mới vào giỏ hàng.
  updateQuantity: (itemId: string, amount: -1 | 1) => void; //hàm được sử dụng để cập nhật số lượng của một sản phẩm trong giỏ hàng.
};

//định nghĩa một CartContext với giá trị mặc định là một object có kiểu dữ liệu CartType.
const CartContext = createContext<CartType>({
  items: [], //Một mảng rỗng đại diện cho danh sách sản phẩm trong giỏ hàng.
  addItem: () => {}, //Một hàm rỗng không làm gì cả
  updateQuantity: () => {}, //Một hàm rỗng không làm gì cả
});

//CartProvider:để tạo ra một context provider cho giỏ hàng. Hàm này nhận một đối số là children, đại diện cho các thành phần con được bọc bên trong CartProvider.
const CartProvider = ({ children }: PropsWithChildren) => {
  //Khởi tạo một trạng thái cho biến items.
  const [items, setItems] = useState<CartItem[]>([]);

  //Hàm addItem nhận vào product và size, sau đó thêm sản phẩm đó vào giỏ hàng.
  const addItem = (product: Product, size: CartItem["size"]) => {
    console.log(product);

    //Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa.
    const existingItem = items.find(
      (item) => item.product === product && item.size === size
    );

    //Nếu sản phẩm đã tồn tại trong giỏ hàng thì tăng số lượng lên 1.
    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }

    //Tạo một đối tượng mới có kiểu dữ liệu CartItem.
    const newCartItem: CartItem = {
      id: Crypto.randomUUID(), // Tạo một id ngẫu nhiên cho sản phẩm.
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };

    //Thêm đối tượng mới vào mảng items.
    setItems([newCartItem, ...items]);
    console.log(items);
  };

  //Hàm updateQuantity nhận vào itemId và amount, sau đó cập nhật số lượng của sản phẩm có id là itemId.
  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    const updateItems = items
      .map((item) =>
        item.id !== itemId
          ? item
          : { ...item, quantity: item.quantity + amount }
      )
      .filter((item) => item.quantity > 0); //Lọc ra những sản phẩm có số lượng lớn hơn 0.
    setItems(updateItems); //Cập nhật lại giá trị của items.
  };

  return (
    //Trả về một CartContext.Provider với giá trị của items và addItem.
    <CartContext.Provider value={{ items: items, addItem, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext); //hàm useCart sẽ trả về giá trị của CartContext.
