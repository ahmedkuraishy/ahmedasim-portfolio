'use client';

import React from 'react';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface UsersTableProps {
  users: User[];
  onDelete: (id: string) => Promise<void>;
  onEdit: (user: User) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, onDelete, onEdit }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
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
                  onClick={() => onEdit(user)}
                  style={{ 
                    color: '#a855f7', 
                    background: 'rgba(168, 85, 247, 0.1)', 
                    border: '1px solid rgba(168, 85, 247, 0.2)', 
                    cursor: 'pointer', 
                    fontWeight: 600, 
                    marginRight: '0.5rem',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.85rem',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(168, 85, 247, 0.2)')}
                  onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(168, 85, 247, 0.1)')}
                >
                  Edit
                </button>
                {user.role !== 'admin' && (
                  <button 
                    onClick={() => onDelete(user._id)}
                    style={{ 
                      color: '#f87171', 
                      background: 'rgba(248, 113, 113, 0.1)', 
                      border: '1px solid rgba(248, 113, 113, 0.2)', 
                      cursor: 'pointer', 
                      fontWeight: 600,
                      padding: '0.4rem 0.8rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.85rem',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(248, 113, 113, 0.2)')}
                    onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(248, 113, 113, 0.1)')}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
