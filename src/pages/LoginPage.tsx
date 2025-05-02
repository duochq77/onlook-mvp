import { useState } from 'react'
import { signIn } from '../utils/authUtils'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      const result = await signIn(email, password)
      console.log('Logged in:', result)
    } catch (err) {
      console.error('Login failed:', err)
    }
  }

  return (
    <div>
      <h2>Đăng nhập</h2>
      <input
        type="email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="Mật khẩu"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Đăng nhập</button>
    </div>
  )
}
