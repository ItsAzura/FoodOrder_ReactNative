//Định nghĩa kiểu dữ liệu cho một sản phẩm trong cửa hàng.
export type Product = {
  id: number;
  image: string | null;
  name: string;
  price: number;
};

//Định nghĩa kiểu dữ liệu cho kích thước của pizza.
export type PizzaSize = "S" | "M" | "L" | "XL";

//Định nghĩa kiểu dữ liệu cho một mục trong giỏ hàng.
export type CartItem = {
  id: string;
  product: Product;
  product_id: number;
  size: PizzaSize;
  quantity: number;
};

//Định nghĩa kiểu dữ liệu cho giỏ hàng.
export const OrderStatusList: OrderStatus[] = [
  "New",
  "Cooking",
  "Delivering",
  "Delivered",
];

//Định nghĩa kiểu dữ liệu cho trạng thái của đơn hàng.
export type OrderStatus = "New" | "Cooking" | "Delivering" | "Delivered";

//Định nghĩa kiểu dữ liệu cho một đơn hàng.
export type Order = {
  id: number;
  created_at: string;
  total: number;
  user_id: string;
  status: OrderStatus;

  order_items?: OrderItem[];
};

//Định nghĩa kiểu dữ liệu cho một mục trong đơn hàng.
export type OrderItem = {
  id: number;
  product_id: number;
  products: Product;
  order_id: number;
  size: PizzaSize;
  quantity: number;
};

//Định nghĩa kiểu dữ liệu cho một hồ sơ người dùng.
export type Profile = {
  id: string;
  group: string;
};
