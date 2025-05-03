import React, { useState } from 'react'
import { saveTransaction } from '../utils/saveTransaction'

interface Product {
  id: string
  name: string
  price: number
  [key: string]: any
}

interface CartProps {
  livestreamId: string
  buyerId: string
  selectedProduct: Product | null
}

export default function Cart({ livestreamId, buyerId, selectedProduct }: CartProps) {
  const [quantity, setQuantity] = useState(1)
  const [status, setStatus] = useState('')

  const handleOrder = async () => {
    if (!selectedProduct) return

    const transaction = {
      buyer_id: buyerId,
      product_id: selectedProduct.id,
      livestream_id: livestreamId,
      quantity,
      price: selectedProduct.price,
    }

    const { error } = await saveTransaction(transaction)

    if (error) {
      setStatus('❌ Giao dịch thất bại.')
    } else {
      setStatus('✅ Đặt hàng thành công!')
    }
  }

  if (!selectedProduct) return null

  return (
    <div class
