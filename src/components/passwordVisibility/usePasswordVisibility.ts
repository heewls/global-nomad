'use client';

import { useState, useCallback } from 'react';

export default function usePasswordVisibility() {
  const [visibleFields, setVisibleFields] = useState<Record<string, boolean>>(
    {}
  );

  const toggleVisibility = useCallback((id: string) => {
    setVisibleFields((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const isVisible = useCallback(
    (id: string) => !!visibleFields[id],
    [visibleFields]
  );

  return { isVisible, toggleVisibility };
}
