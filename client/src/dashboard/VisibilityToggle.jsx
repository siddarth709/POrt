import React, { useState } from 'react';
import api from '../api/axios';

export default function VisibilityToggle({ section, visible, onChanged }) {
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    setLoading(true);
    try {
      const res = await api.patch(`/content/${section}/visibility`, { visible: !visible });
      onChanged(res.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
        visible ? 'border-accent2/40 text-accent2 bg-accent2/10' : 'border-white/10 text-muted bg-white/5'
      }`}
    >
      {visible ? 'Visible on site' : 'Hidden from site'}
    </button>
  );
}
