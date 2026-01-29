'use client';

import React from 'react';

type TabType = 'about' | 'navbar' | 'hero' | 'counters' | 'skills' | 'services' | 'projects' | 'blog' | 'contact' | 'footer' | 'users';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  handleLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, handleLogout }) => {
  const contentTabs: { id: TabType; label: string }[] = [
    { id: 'navbar', label: 'Navbar' },
    { id: 'hero', label: 'Hero Section' },
    { id: 'counters', label: 'Stats Counters' },
    { id: 'about', label: 'About Me' },
    { id: 'skills', label: 'Skills' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'blog', label: 'Blog Posts' },
    { id: 'contact', label: 'Contact Info' },
    { id: 'footer', label: 'Footer' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="admin-avatar">A</div>
        <h1>Admin CMS</h1>
      </div>

      <nav className="nav-menu" style={{ overflowY: 'auto' }}>
        <div style={{ color: '#4b5563', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', marginTop: '1rem' }}>
          Content
        </div>
        {contentTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: activeTab === tab.id ? '#c084fc' : '#4b5563' }}></span>
            {tab.label}
          </button>
        ))}
        <button
          onClick={() => setActiveTab('users')}
          className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: activeTab === 'users' ? '#c084fc' : '#4b5563' }}></span>
          Users Table
        </button>
      </nav>

      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
