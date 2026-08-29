import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import api from '../api/axios';

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const refresh = useCallback(async () => {
    setError(false);
    setLoading(true);
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout
      const res = await api.get('/content', { signal: controller.signal });
      clearTimeout(timeout);
      setContent(res.data);
    } catch (err) {
      console.error('Failed to load portfolio content:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    // Refresh whenever the tab regains focus - covers the case where the
    // owner edits the dashboard in another tab and comes back to preview.
    const onFocus = () => refresh();
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [refresh]);

  return (
    <ContentContext.Provider value={{ content, loading, error, refresh }}>
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = () => useContext(ContentContext);
