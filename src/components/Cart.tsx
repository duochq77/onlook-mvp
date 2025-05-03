import React from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ items, onRemove, onCheckout }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart p-4 border rounded-xl shadow bg-white max-w-sm">
      <h2 className="text-lg font-semibold mb-3">🛒 Giỏ hàng</h2>
      {items.length === 0 ? (
        <p className="text-gray-500">Chưa có sản phẩm nào.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  {item.quantity} x {item.price.toLocaleString()}₫
                </p>
              </div>
              <button
                className="text-red-500 text-sm hover:underline"
                onClick={() => onRemove(item.id)}
              >
                Xóa
              </button>
            </li>
          ))}
        </ul>
      )}
      {items.length > 0 && (
        <div className="mt-4">
          <p className="font-bold">Tổng cộng: {total.toLocaleString()}₫</p>
          <button
            onClick={onCheckout}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600"
          >
            Thanh toán
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
