'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'users'>('portfolio');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [portfolioData, setPortfolioData] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken');
    if (!storedToken) {
      router.push('/admin/login');
      return;
    }
    setToken(storedToken);
    fetchData(storedToken);
  }, []);

  const fetchData = async (authToken: string) => {
    try {
      const usersRes = await fetch('http://localhost:5000/api/users', {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      if (usersRes.ok) setUsers(await usersRes.json());

      const portRes = await fetch('http://localhost:5000/api/portfolio');
      if (portRes.ok) setPortfolioData(await portRes.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSaving(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const updatedAbout = {
      ...portfolioData.about,
      name: formData.get('name'),
      email: formData.get('email'),
      description: formData.get('description'),
    };

    try {
      const res = await fetch('http://localhost:5000/api/portfolio', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...portfolioData, about: updatedAbout }),
      });

      if (res.ok) {
        const newData = await res.json();
        setPortfolioData(newData);
        alert('Portfolio updated successfully!');
      } else {
        alert('Failed to update portfolio');
      }
    } catch (err) {
      alert('Error updating portfolio');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateNavbar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSaving(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const updatedNavbar: any[] = [];
    
    // Extracting navbar data from form
    portfolioData.navbar.forEach((_: any, index: number) => {
      updatedNavbar.push({
        name: formData.get(`nav_name_${index}`),
        url: formData.get(`nav_url_${index}`),
      });
    });

    try {
      const res = await fetch('http://localhost:5000/api/portfolio', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...portfolioData, navbar: updatedNavbar }),
      });

      if (res.ok) {
        const newData = await res.json();
        setPortfolioData(newData);
        alert('Navbar updated successfully!');
      } else {
        alert('Failed to update Navbar');
      }
    } catch (err) {
      alert('Error updating Navbar');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  const handleDeleteUser = async (id: string) => {
    if (!token || !confirm('Are you sure you want to delete this user?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setUsers(users.filter(u => u._id !== id));
      }
    } catch (err) {
      alert('Delete failed');
    }
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="animate-spin" style={{ borderRadius: '50%', height: '3rem', width: '3rem', borderTop: '2px solid #9333ea', borderBottom: '2px solid #9333ea' }}></div>
    </div>
  );

  return (
    <>
      <style>{`
        .admin-dashboard {
          min-height: 100vh;
          background-color: #0a0a0a;
          color: white;
          display: flex;
          font-family: 'Inter', sans-serif;
        }
        .sidebar {
          width: 16rem;
          background: rgba(255, 255, 255, 0.05);
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
        }
        .sidebar-header {
          margin-bottom: 2.5rem;
          padding: 0 0.5rem;
        }
        .sidebar-header h1 {
          font-size: 1.25rem;
          font-weight: 700;
          background: linear-gradient(to right, #c084fc, #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .nav-menu {
          flex: 1;
        }
        .nav-item {
          width: 100%;
          text-align: left;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          margin-bottom: 0.5rem;
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.2s;
          background: transparent;
          color: #9ca3af;
        }
        .nav-item:hover {
          background: rgba(255, 255, 255, 0.05);
        }
        .nav-item.active {
          background: rgba(147, 51, 234, 0.1);
          color: #c084fc;
          border-color: rgba(147, 51, 234, 0.2);
        }
        .logout-btn {
          margin-top: auto;
          padding: 0.75rem 1rem;
          color: #9ca3af;
          background: transparent;
          border: none;
          text-align: left;
          cursor: pointer;
          border-radius: 0.75rem;
        }
        .logout-btn:hover {
          color: #f87171;
          background: rgba(239, 68, 68, 0.1);
        }
        .main-content {
          flex: 1;
          padding: 2.5rem;
          overflow-y: auto;
        }
        .content-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2.5rem;
        }
        .content-header h2 {
          font-size: 1.875rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }
        .content-header p {
          color: #9ca3af;
        }
        .btn-primary {
          padding: 0.6rem 1.5rem;
          background: linear-gradient(to right, #9333ea, #2563eb);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 0.5rem;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .btn-primary:hover {
          transform: translateY(-1px);
          filter: brightness(1.1);
          box-shadow: 0 10px 15px -3px rgba(147, 51, 234, 0.3);
        }
        .btn-secondary {
          padding: 0.6rem 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
          color: white;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }
        .card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1.5rem;
          padding: 2rem;
          backdrop-filter: blur(10px);
        }
        .table-container {
          overflow: hidden;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1.5rem;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        th {
          background: rgba(255, 255, 255, 0.05);
          padding: 1rem 1.5rem;
          color: #9ca3af;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        td {
          padding: 1rem 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
        .badge {
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        .badge-admin {
          background: rgba(147, 51, 234, 0.2);
          color: #c084fc;
        }
        .badge-user {
          background: rgba(107, 114, 128, 0.2);
          color: #9ca3af;
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .form-group label {
          display: block;
          font-size: 0.875rem;
          color: #9ca3af;
          margin-bottom: 0.5rem;
        }
        .form-control {
          width: 100%;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
          color: white;
          box-sizing: border-box;
        }
        .form-control:focus {
          outline: none;
          border-color: rgba(147, 51, 234, 0.5);
        }
        textarea.form-control {
          resize: vertical;
        }
        .btn-save {
          padding: 0.75rem 2rem;
          background: #9333ea;
          border: none;
          border-radius: 0.5rem;
          color: white;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
        }
        .btn-save:hover {
          background: #a855f7;
        }
        .btn-save:disabled {
          opacity: 0.5;
        }
      `}</style>

      <div className="admin-dashboard">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <h1>Admin CMS</h1>
          </div>

          <nav className="nav-menu">
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`nav-item ${activeTab === 'portfolio' ? 'active' : ''}`}
            >
              Portfolio Data
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
            >
              Users Table
            </button>
          </nav>

          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <header className="content-header">
            <div>
              <h2>{activeTab === 'portfolio' ? 'Manage Portfolio' : 'User Management'}</h2>
              <p>{activeTab === 'portfolio' ? 'Edit your website content in real-time' : 'Manage administrative access'}</p>
            </div>
            <div>
              {activeTab === 'users' ? (
                <button className="btn-primary">+ Add New User</button>
              ) : (
                <button onClick={() => fetchData(token || '')} className="btn-secondary">⟳ Refresh Data</button>
              )}
            </div>
          </header>

          {activeTab === 'users' ? (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td style={{ fontWeight: 500 }}>{user.name}</td>
                      <td style={{ color: '#9ca3af' }}>{user.email}</td>
                      <td>
                        <span className={`badge ${user.role === 'admin' ? 'badge-admin' : 'badge-user'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button 
                          onClick={() => handleDeleteUser(user._id)}
                          style={{ color: '#f87171', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 500 }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div className="card">
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
                  <span style={{ width: '0.5rem', height: '2rem', backgroundColor: '#9333ea', borderRadius: '1rem', marginRight: '1rem' }}></span>
                  Quick Edit: About Section
                </h3>
                <form onSubmit={handleUpdateAbout}>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Name</label>
                      <input 
                        name="name"
                        type="text" 
                        defaultValue={portfolioData?.about?.name}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input 
                        name="email"
                        type="email" 
                        defaultValue={portfolioData?.about?.email}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label>Description</label>
                    <textarea 
                      name="description"
                      rows={4}
                      defaultValue={portfolioData?.about?.description}
                      className="form-control"
                    ></textarea>
                  </div>
                  <button type="submit" disabled={saving} className="btn-save">
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              </div>

              <div className="card">
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
                  <span style={{ width: '0.5rem', height: '2rem', backgroundColor: '#3b82f6', borderRadius: '1rem', marginRight: '1rem' }}></span>
                  Edit Website Header Links
                </h3>
                <form onSubmit={handleUpdateNavbar}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                    {portfolioData?.navbar?.map((item: any, index: number) => (
                      <div key={index} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem' }}>
                        <div className="form-group">
                          <label>Link Label</label>
                          <input 
                            name={`nav_name_${index}`}
                            type="text" 
                            defaultValue={item.name}
                            className="form-control"
                          />
                        </div>
                        <div className="form-group">
                          <label>Link URL (e.g. #about-section)</label>
                          <input 
                            name={`nav_url_${index}`}
                            type="text" 
                            defaultValue={item.url}
                            className="form-control"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <button type="submit" disabled={saving} className="btn-save" style={{ backgroundColor: '#2563eb' }}>
                    {saving ? 'Saving...' : 'Update Navbar'}
                  </button>
                </form>
              </div>

              <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
                <p style={{ color: '#6b7280', fontStyle: 'italic' }}>Advanced CMS features (Sliders, Projects, Blog) are coming soon</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
