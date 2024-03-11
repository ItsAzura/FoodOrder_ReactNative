import { CartItem, Product } from "@/types";
import { PropsWithChildren, createContext, useContext, useState } from "react";

type CartType = {
  items: CartItem[]; //items là một mảng chứa các đối tượng CartItem.
  addItem: (Product: Product, size: CartItem["size"]) => void; // hàm được sử dụng để thêm một sản phẩm mới vào giỏ hàng.
};

//định nghĩa một CartContext với giá trị mặc định là một object có kiểu dữ liệu CartType.
const CartContext = createContext<CartType>({
  items: [], //Một mảng rỗng đại diện cho danh sách sản phẩm trong giỏ hàng.
  addItem: () => {}, //Một hàm rỗng không làm gì cả
});

//CartProvider:để tạo ra một context provider cho giỏ hàng. Hàm này nhận một đối số là children, đại diện cho các thành phần con được bọc bên trong CartProvider.
const CartProvider = ({ children }: PropsWithChildren) => {
  //Khởi tạo một trạng thái cho biến items.
  const [items, setItems] = useState<CartItem[]>([]);

  //Hàm addItem nhận vào product và size, sau đó thêm sản phẩm đó vào giỏ hàng.
  const addItem = (product: Product, size: CartItem["size"]) => {
    console.log(product);
    //Tạo một đối tượng mới có kiểu dữ liệu CartItem.
    const newCartItem: CartItem = {
      id: "1",
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };
    //Thêm đối tượng mới vào mảng items.
    setItems([newCartItem, ...items]);
    console.log(items);
  };

  return (
    //Trả về một CartContext.Provider với giá trị của items và addItem.
    <CartContext.Provider value={{ items: items, addItem }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext); //hàm useCart sẽ trả về giá trị của CartContext.
