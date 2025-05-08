// File: components/Cart.tsx
import React from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ items, onCheckout }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-4 border rounded shadow bg-white">
      <h2 className="text-xl font-bold mb-4">Giỏ hàng</h2>
      {items.length === 0 ? (
        <p>Không có sản phẩm nào trong giỏ.</p>
      ) : (
        <ul className="mb-4 space-y-2">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>{item.name} × {item.quantity}</span>
              <span>{item.price * item.quantity}₫</span>
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-between font-semibold">
        <span>Tổng cộng:</span>
        <span>{total}₫</span>
      </div>
      <button
        onClick={onCheckout}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Thanh toán
      </button>
    </div>
  );
};

export default Cart;
