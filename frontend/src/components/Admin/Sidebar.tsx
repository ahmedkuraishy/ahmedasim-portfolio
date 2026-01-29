'use client';

import React from 'react';

type TabType = 'about' | 'navbar' | 'hero' | 'counters' | 'skills' | 'services' | 'projects' | 'blog' | 'contact' | 'footer' | 'users';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  handleLogout: () => void;
  isOpen?: boolean;
  isMobile?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, handleLogout, isOpen = true, isMobile = false, onClose }) => {
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

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
    if (isMobile && onClose) {
      onClose();
    }
  };

  const handleLogoutClick = () => {
    handleLogout();
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <aside className={`sidebar ${!isOpen ? 'collapsed' : ''} ${isMobile && isOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-header">
        <div className="admin-avatar">A</div>
        <h1>Admin CMS</h1>
      </div>

      <nav className="nav-menu">
        <div className="nav-section-title">Content</div>
        {contentTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
          >
            <span className="nav-indicator"></span>
            {tab.label}
          </button>
        ))}
        <button
          onClick={() => handleTabClick('users')}
          className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
        >
          <span className="nav-indicator"></span>
          Users Table
        </button>
      </nav>

      <button onClick={handleLogoutClick} className="logout-btn">
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
