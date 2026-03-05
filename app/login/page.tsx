"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const endpoint = isRegistering ? '/register' : '/login';
    const url = `http://localhost:5001${endpoint}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error(isRegistering ? 'Erro ao criar conta. A senha deve ter letras maiúsculas, minúsculas, números e caracteres especiais.' : 'E-mail ou senha inválidos.');
      }

      if (isRegistering) {
        alert('Conta criada com sucesso! Faça login agora.');
        setIsRegistering(false);
        setPassword('');
      } else {
        const data = await response.json();
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('userEmail', email);
        router.push('/'); // Manda pro chat
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
        <h2>{isRegistering ? 'Criar Conta' : 'Entrar no Chat'}</h2>
        
        {error && <div style={{ color: 'red', fontSize: '14px' }}>{error}</div>}
        
        <input 
          type="email" 
          placeholder="Seu e-mail" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
          style={{ padding: '8px' }}
        />
        <input 
          type="password" 
          placeholder="Sua senha" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required 
          style={{ padding: '8px' }}
        />
        
        <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>
          {isRegistering ? 'Registrar' : 'Entrar'}
        </button>
        
        <button 
          type="button" 
          onClick={() => setIsRegistering(!isRegistering)} 
          style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', marginTop: '10px' }}
        >
          {isRegistering ? 'Já tenho uma conta' : 'Quero criar uma conta'}
        </button>
      </form>
    </div>
  );
}