import React, { useEffect, useState } from 'react'
import { supabase } from '../utils/authUtils'

interface Product {
  id: string
  name: string
  price: number
  [key: string]: any
}

interface ProductListProps {
  livestreamId: string
  onSelect: (product: Product) => void
}

export default function ProductList({ livestreamId, onSelect }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetchProducts()
  }, [livestreamId])

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('livestream_id', livestreamId)

    if (error) {
      console.error('❌ Lỗi tải sản phẩm:', error)
    } else {
      setProducts(data || [])
    }
  }

  return (
    <div className="mt-2">
      <h3 className="font-bold mb-2">📦 Danh sách sản phẩm</h3>
      {products.map((product) => (
        <div
          key={product.id}
          className="mb-3 p-3 border rounded cursor-pointer hover:bg-gray-100"
          onClick={() => onSelect(product)}
        >
          <p className="font-semibold">{product.name}</p>
          <p>Giá: {product.price.toLocaleString()}đ</p>
        </div>
      ))}
    </div>
  )
}
