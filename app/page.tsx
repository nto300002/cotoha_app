
'use cliant';
import Image from 'next/image';
import { useState } from 'react';
import axios from 'axios';
export default function Home() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/user_attribute', { text });
      setResult(response.data);
    } catch (error) {
      console.error('Error fetching user attribute:', error);
    }
  };
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>ユーザー属性推測</h1>
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={handleSubmit}>推測</button>
        {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
      </div>
    </main>
  );
}
