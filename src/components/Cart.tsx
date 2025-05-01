import React, { useState } from 'react';
import { saveTransaction } from '../utils/saveTransaction';

interface CartProps {
  livestreamId: string;
  buyerId: string;
  selectedProduct: any;
}

export default function Cart({ livestreamId, buyerId, selectedProduct }: CartProps) {
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState('');

  const handleOrder = async () => {
    if (!selectedProduct) return;

    const transaction = {
      buyer_id: buyerId,
      product_id: selectedProduct.id,
      livestream_id: livestreamId,
      quantity,
      price: selectedProduct.price,
    };

    const { error } = await saveTransaction(transaction);

    if (error) {
      setStatus('Giao dịch thất bại.');
    } else {
      setStatus('Đặt hàng thành công!');
    }
  };

  if (!selectedProduct) return null;

  return (
    <div className="bg-white p-3 rounded shadow">
      <h3 className="font-bold">{selectedProduct.name}</h3>
      <p>Giá: {selectedProduct.price}đ</p>
      <div className="flex items-center mt-2">
        <label className="mr-2">Số lượng:</label>
        <input
          type="number"
          value={quantity}
          min={1}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="border p-1 w-16"
        />
      </div>
      <button
        onClick={handleOrder}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Mua ngay
      </button>
      {status && <p className="mt-2 text-sm">{status}</p>}
    </div>
  );
}
