import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import api from '../api/axios';

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const res = await api.get('/content');
    setContent(res.data);
    setLoading(false);
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
    <ContentContext.Provider value={{ content, loading, refresh }}>
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = () => useContext(ContentContext);
