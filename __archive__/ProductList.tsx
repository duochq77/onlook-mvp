// File: components/ProductList.tsx
import React from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  if (products.length === 0) {
    return <p className="text-center text-gray-500">Chưa có sản phẩm nào</p>;
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      {products.map((product) => (
        <li key={product.id} className="border rounded p-4 shadow">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-sm text-gray-700">{product.price.toLocaleString()} VND</p>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
