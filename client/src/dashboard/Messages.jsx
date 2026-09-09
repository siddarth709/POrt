import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Mail, Trash2, CheckCircle2 } from 'lucide-react';

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get('/messages');
      setMessages(res.data);
    } catch (err) {
      console.error('Failed to load messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const markRead = async (id) => {
    await api.patch(`/messages/${id}/read`);
    load();
  };

  const remove = async (id) => {
    if (!confirm('Delete this message?')) return;
    await api.delete(`/messages/${id}`);
    load();
  };

  if (loading) return <p className="font-mono text-xs text-slate-400 py-6">FETCHING DISPATCHES…</p>;
  if (messages.length === 0) return <p className="font-mono text-xs text-slate-500 py-6">No messages received yet.</p>;

  return (
    <div className="flex flex-col gap-4 max-w-2xl">
      {messages.map((m) => (
        <div
          key={m._id}
          className={`glass-panel rounded-2xl p-6 border transition-all ${
            !m.read ? 'border-cyan-400/40 bg-white/[0.04]' : 'border-white/[0.06] bg-white/[0.02]'
          }`}
        >
          <div className="flex justify-between items-start mb-3 pb-3 border-b border-white/[0.06]">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-sm font-semibold text-white">{m.name}</span>
                {!m.read && (
                  <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 uppercase tracking-widest border border-cyan-400/30">
                    NEW
                  </span>
                )}
              </div>
              <a href={`mailto:${m.email}`} className="font-mono text-xs text-cyan-400 hover:underline">
                {m.email}
              </a>
            </div>
            <span className="font-mono text-[10px] text-slate-500">
              {new Date(m.createdAt).toLocaleString()}
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line font-light">
            {m.message}
          </p>

          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/[0.04]">
            {!m.read && (
              <button
                onClick={() => markRead(m._id)}
                className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <CheckCircle2 size={13} />
                <span>Mark read</span>
              </button>
            )}
            <button
              onClick={() => remove(m._id)}
              className="inline-flex items-center gap-1.5 font-mono text-xs text-rose-400 hover:text-rose-300 transition-colors ml-auto"
            >
              <Trash2 size={13} />
              <span>Delete</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
