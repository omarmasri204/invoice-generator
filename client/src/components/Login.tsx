import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  padding: 32px 24px;
  max-width: 350px;
  margin: 40px auto;
`;

const Title = styled.h2`
  margin-bottom: 24px;
  color: #764ba2;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
`;

const ErrorMsg = styled.div`
  color: #d32f2f;
  margin-bottom: 12px;
  font-size: 0.95rem;
`;

interface LoginProps {
  onLoginSuccess: () => void;
}

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await axios.post(
        `${API_BASE_URL}/login`,
        { username, password },
        { withCredentials: true }
      );
      setLoading(false);
      onLoginSuccess();
    } catch (err: any) {
      setLoading(false);
      setError(
        err?.response?.data?.error || 'Login failed. Please try again.'
      );
    }
  };

  return (
    <LoginContainer>
      <Title>Login</Title>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <Input
          type="text"
          placeholder="Username"
          value={username}
          autoComplete="username"
          onChange={e => setUsername(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          autoComplete="current-password"
          onChange={e => setPassword(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </LoginContainer>
  );
};

export default Login;