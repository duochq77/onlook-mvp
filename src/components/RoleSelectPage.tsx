import React from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
}

interface Props {
  products: Product[];
}

const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Sản phẩm đang bán</h3>
      <ul className="space-y-2">
        {products.map((product) => (
          <li
            key={product.id}
            className="p-3 bg-white rounded-xl shadow border flex justify-between"
          >
            <span>{product.name}</span>
            <span className="font-bold">{product.price.toLocaleString()} đ</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
