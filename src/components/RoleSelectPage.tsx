import React from 'react'
import { Link } from 'react-router-dom'

export default function RoleSelectPage() {
  return (
    <div>
      <h2>Chọn vai trò</h2>
      <ul>
        <li>
          <Link to="/seller">👤 Người bán</Link>
        </li>
        <li>
          <Link to="/viewer">👀 Người xem</Link>
        </li>
      </ul>
    </div>
  )
}
