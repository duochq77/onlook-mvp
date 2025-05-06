// src/App.tsx
import React from 'react';

const App = ({ pageProps }: any) => {  // Đảm bảo nhận pageProps
  return (
    <div>
      <h1>Welcome to Onlook</h1>
      {/* Bạn có thể thêm các component con ở đây và truyền pageProps cho chúng */}
      {pageProps && <div>{pageProps.content}</div>}
    </div>
  );
};

export default App;
