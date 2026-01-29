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
                  onClick={() => onEdit(user)}
                  style={{ color: '#8b5cf6', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 500, marginRight: '1rem' }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => onDelete(user._id)}
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
  );
};

export default UsersTable;
