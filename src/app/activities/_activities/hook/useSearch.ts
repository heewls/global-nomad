import { useState } from 'react';
import useActivities from '../hook/useActivities';

export default function useSearch() {
  const { keyword, updateParams } = useActivities();

  const [localKeyword, setLocalKeyword] = useState(keyword || '');
  const [prevKeyword, setPrevKeyword] = useState(keyword);

  if (keyword !== prevKeyword) {
    setPrevKeyword(keyword);
    setLocalKeyword(keyword || '');
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalKeyword(e.target.value);
  };

  const handleSearchSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    updateParams({ keyword: localKeyword });
  };

  return {
    localKeyword,
    handleSearchChange,
    handleSearchSubmit,
  };
}
