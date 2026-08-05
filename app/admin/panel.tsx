'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

interface User {
  id: string;
  name: string;
  topic: string;
  level: string;
  created_at: string;
}

export default function AdminPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching users:', error);
    } else {
      setUsers(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this participant?')) return;

    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (error) {
      alert('Failed to delete participant.');
    } else {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Participant Management</h2>
        <button
          onClick={fetchUsers}
          className="px-3 py-1.5 bg-[#1C2826] text-white text-xs font-semibold rounded hover:bg-opacity-90 transition-colors"
        >
          Refresh List
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8 text-sm text-[#1C2826]/60">Loading participants...</div>
      ) : users.length === 0 ? (
        <div className="text-center py-8 text-sm text-[#1C2826]/60">No participants signed up yet.</div>
      ) : (
        <div className="overflow-x-auto border border-[#1C2826]/10 rounded-lg bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#1C2826]/5 text-xs uppercase font-semibold border-b border-[#1C2826]/10">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Topic</th>
                <th className="px-4 py-3">Level</th>
                <th className="px-4 py-3">Signed Up At</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C2826]/10">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-black/5 transition-colors">
                  <td className="px-4 py-3 font-medium">{user.name}</td>
                  <td className="px-4 py-3">{user.topic}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 text-xs rounded bg-[#1C2826]/10 font-mono">
                      {user.level}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#1C2826]/60">
                    {new Date(user.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-xs text-red-600 hover:underline font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
