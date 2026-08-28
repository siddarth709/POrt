import React, { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const res = await api.get('/messages');
    setMessages(res.data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const markRead = async (id) => {
    await api.patch(`/messages/${id}/read`);
    load();
  };

  const remove = async (id) => {
    await api.delete(`/messages/${id}`);
    load();
  };

  if (loading) return <p className="text-muted text-sm">Loading…</p>;
  if (messages.length === 0) return <p className="text-muted text-sm">No messages yet.</p>;

  return (
    <div className="flex flex-col gap-3 max-w-2xl">
      {messages.map((m) => (
        <div key={m._id} className={`glass rounded-xl p-5 ${!m.read ? 'border-accent/40' : ''}`}>
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-sm font-medium">{m.name}</p>
              <a href={`mailto:${m.email}`} className="text-xs text-accent2">{m.email}</a>
            </div>
            <span className="text-xs text-muted">{new Date(m.createdAt).toLocaleString()}</span>
          </div>
          <p className="text-sm text-muted whitespace-pre-line">{m.message}</p>
          <div className="flex gap-4 mt-3">
            {!m.read && <button onClick={() => markRead(m._id)} className="text-xs text-accent2 hover:underline">Mark read</button>}
            <button onClick={() => remove(m._id)} className="text-xs text-red-400 hover:underline">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
