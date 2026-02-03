import { useState } from 'react';
import useActivities from '../../useActivities';

export default function useSearch() {
  const { keyword, updateParams } = useActivities();

  const [localKeyword, setLocalKeyword] = useState(keyword || '');

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
