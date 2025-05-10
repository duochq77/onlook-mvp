import Link from 'next/link'

export default function Home() {
    return (
        <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
            <h1>🌐 Onlook MVP</h1>
            <p>Chọn vai trò để bắt đầu livestream:</p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                <li>
                    <Link href="/SellerPage">
                        <button style={{ margin: '1rem', padding: '1rem', fontSize: '1rem' }}>🔴 Vào trang Người Bán</button>
                    </Link>
                </li>
                <li>
                    <Link href="/ViewerPage">
                        <button style={{ margin: '1rem', padding: '1rem', fontSize: '1rem' }}>👀 Vào trang Người Xem</button>
                    </Link>
                </li>
            </ul>
        </div>
    )
}
