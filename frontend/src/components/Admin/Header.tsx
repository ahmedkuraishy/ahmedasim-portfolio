'use client';

import React from 'react';

interface HeaderProps {
  title: string;
  subtitle: string;
  onRefresh: () => void;
  showAddUser?: boolean;
  onAddUser?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, onRefresh, showAddUser, onAddUser }) => {
  return (
    <header className="content-header">
      <div>
        <h2>Edit {title}</h2>
        <p>{subtitle}</p>
      </div>
      <div>
        {showAddUser ? (
          <button className="btn-primary" onClick={onAddUser}>+ Add New User</button>
        ) : (
          <button onClick={onRefresh} className="btn-secondary">⟳ Refresh Data</button>
        )}
      </div>
    </header>
  );
};

export default Header;
