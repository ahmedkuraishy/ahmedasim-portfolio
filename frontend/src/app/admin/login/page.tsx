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
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
        
        .admin-login-body {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0f0f23;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
          margin: 0;
          color: #ffffff;
        }
        
        .admin-login-body::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255, 219, 98, 0.2) 0%, transparent 50%);
          animation: floatingGradient 20s ease-in-out infinite;
        }
        
        @keyframes floatingGradient {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-20px, -20px) rotate(120deg); }
          66% { transform: translate(20px, -10px) rotate(240deg); }
        }
        
        .admin-login-body::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridMove 10s linear infinite;
        }
        
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        .blob {
          position: absolute;
          filter: blur(120px);
          border-radius: 50%;
          opacity: 0.1;
          z-index: 0;
        }
        .blob-1 {
          top: -10%;
          left: -10%;
          width: 40%;
          height: 40%;
          background: linear-gradient(135deg, #ff77c6 0%, #7877c6 100%);
        }
        .blob-2 {
          bottom: -10%;
          right: -10%;
          width: 40%;
          height: 40%;
          background: linear-gradient(135deg, #7877c6 0%, #ff77c6 100%);
        }
        .login-card {
          width: 100%;
          max-width: 400px;
          padding: 2.5rem;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          box-shadow: 
            0 20px 40px -12px rgba(0, 0, 0, 0.2),
            inset 0 0 20px rgba(255, 255, 255, 0.02);
          position: relative;
          z-index: 10;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }
        
        .login-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 119, 198, 0.5), transparent);
          animation: slideTop 3s linear infinite;
        }
        
        @keyframes slideTop {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .login-card:hover {
          border-color: rgba(255, 119, 198, 0.3);
          transform: translateY(-4px) scale(1.02);
          box-shadow: 
            0 25px 50px -12px rgba(0, 0, 0, 0.3),
            inset 0 0 20px rgba(255, 255, 255, 0.05);
        }
        .login-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .login-header h1 {
          font-size: 2.25rem;
          font-weight: 900;
          margin-bottom: 0.5rem;
          letter-spacing: -0.05em;
          background: linear-gradient(135deg, #ffffff 0%, #ff77c6 50%, #7877c6 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: glow 2s ease-in-out infinite alternate;
        }
        
        @keyframes glow {
          from { filter: drop-shadow(0 0 20px rgba(255, 119, 198, 0.5)); }
          to { filter: drop-shadow(0 0 40px rgba(120, 119, 198, 0.8)); }
        }
        
        .login-header p {
          color: #b8b8d0;
        }
        .error-msg {
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: linear-gradient(135deg, rgba(255, 59, 48, 0.1) 0%, rgba(255, 119, 198, 0.1) 100%);
          border: 1px solid rgba(255, 59, 48, 0.2);
          color: #ff6b60;
          border-radius: 16px;
          font-size: 0.875rem;
          text-align: center;
          backdrop-filter: blur(10px);
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        .form-group label {
          display: block;
          font-size: 0.875rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .form-control {
          width: 100%;
          padding: 1rem 1.5rem;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          color: #ffffff;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-sizing: border-box;
          box-shadow: 
            0 4px 20px rgba(0, 0, 0, 0.1),
            inset 0 0 20px rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
        }
        .form-control:focus {
          outline: none;
          border-color: #ff77c6;
          background: linear-gradient(135deg, rgba(255, 119, 198, 0.1) 0%, rgba(120, 119, 198, 0.1) 100%);
          box-shadow: 
            0 0 0 4px rgba(255, 119, 198, 0.1),
            0 8px 32px rgba(255, 119, 198, 0.2),
            inset 0 0 20px rgba(255, 255, 255, 0.05);
          transform: translateY(-2px);
        }
        .form-control::placeholder {
          color: #6b6b80;
        }
        .btn-submit {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #ff77c6 0%, #7877c6 100%);
          border: none;
          border-radius: 16px;
          color: white;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 
            0 8px 32px rgba(255, 119, 198, 0.3),
            inset 0 0 20px rgba(255, 255, 255, 0.2);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          position: relative;
          overflow: hidden;
        }
        
        .btn-submit::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }
        
        .btn-submit:hover::before {
          left: 100%;
        }
        
        .btn-submit:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 
            0 16px 64px rgba(255, 119, 198, 0.4),
            inset 0 0 20px rgba(255, 255, 255, 0.3);
          filter: brightness(1.1);
        }
        .btn-submit:active {
          transform: translateY(0);
        }
        .btn-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        /* Mobile Responsive Design */
        @media (max-width: 768px) {
          .admin-login-body {
            padding: 1rem;
          }
          
          .login-card {
            max-width: 100%;
            padding: 2rem;
            margin: 0 1rem;
          }
          
          .login-header h1 {
            font-size: 2rem;
          }
          
          .form-control {
            padding: 0.875rem 1rem;
            font-size: 0.9rem;
          }
          
          .btn-submit {
            padding: 0.875rem;
            font-size: 0.9rem;
          }
          
          .footer-tag {
            bottom: 1rem;
            font-size: 0.65rem;
          }
        }
        
        @media (max-width: 480px) {
          .login-card {
            padding: 1.5rem;
            margin: 0 0.5rem;
          }
          
          .login-header h1 {
            font-size: 1.75rem;
          }
          
          .login-header p {
            font-size: 0.9rem;
          }
          
          .form-group {
            margin-bottom: 1rem;
          }
          
          .form-control {
            padding: 0.75rem 1rem;
            font-size: 0.85rem;
          }
          
          .form-group label {
            font-size: 0.8rem;
          }
          
          .btn-submit {
            padding: 0.75rem;
            font-size: 0.85rem;
          }
          
          .error-msg {
            padding: 0.75rem;
            font-size: 0.8rem;
          }
          
          .footer-tag {
            font-size: 0.6rem;
          }
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
      </div>
    </>
  );
}
