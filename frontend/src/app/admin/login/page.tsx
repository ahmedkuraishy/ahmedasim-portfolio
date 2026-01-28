'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.user));
        router.push('/admin/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .admin-login-body {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #0a0a0a;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
          margin: 0;
          color: white;
        }
        .blob {
          position: absolute;
          filter: blur(120px);
          border-radius: 50%;
          opacity: 0.2;
          z-index: 0;
        }
        .blob-1 {
          top: -10%;
          left: -10%;
          width: 40%;
          height: 40%;
          background: #9333ea;
        }
        .blob-2 {
          bottom: -10%;
          right: -10%;
          width: 40%;
          height: 40%;
          background: #2563eb;
        }
        .login-card {
          width: 100%;
          max-width: 400px;
          padding: 2.5rem;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1.5rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          position: relative;
          z-index: 10;
          transition: all 0.3s ease;
        }
        .login-card:hover {
          border-color: rgba(255, 255, 255, 0.2);
        }
        .login-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .login-header h1 {
          font-size: 2.25rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          letter-spacing: -0.025em;
          color: white;
        }
        .login-header p {
          color: #9ca3af;
        }
        .error-msg {
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #ef4444;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          text-align: center;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        .form-group label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: #d1d5db;
          margin-bottom: 0.5rem;
        }
        .form-control {
          width: 100%;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
          color: white;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }
        .form-control:focus {
          outline: none;
          border-color: #9333ea;
          box-shadow: 0 0 0 2px rgba(147, 51, 234, 0.3);
        }
        .btn-submit {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(to right, #9333ea, #2563eb);
          border: none;
          border-radius: 0.5rem;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .btn-submit:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }
        .btn-submit:active {
          transform: translateY(0);
        }
        .btn-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }
        .footer-tag {
          position: absolute;
          bottom: 2.5rem;
          width: 100%;
          text-align: center;
          color: #4b5563;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 500;
        }
      `}</style>
      
      <div className="admin-login-body">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>

        <div className="login-card">
          <div className="login-header">
            <h1>Admin Portal</h1>
            <p>Please sign in to manage your portfolio</p>
          </div>

          {error && <div className="error-msg">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control"
                placeholder="email"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-control"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" disabled={loading} className="btn-submit">
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        </div>

        <div className="footer-tag">
          Secure Admin Panel
        </div>
      </div>
    </>
  );
}
