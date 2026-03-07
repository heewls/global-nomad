'use client';

import { useState } from 'react';
import deleteMyExperience from '../action';
import useModalStore from '@/store/modal';

export default function useExperience() {
  const [errorMessage, setErrorMessage] = useState('');
  const { open, close } = useModalStore();

  const handleOpenDeleteModal = ({
    e,
    id,
  }: {
    e: React.MouseEvent<HTMLElement>;
    id: number;
  }) => {
    e.preventDefault();
    open(`delete-experience-${id}`);
  };

  const handleCloseErrorModal = (id: number) => {
    close(`error-delete-experience-${id}`);
  };

  const handleDeleteMyExperience = async (id: number) => {
    const result = await deleteMyExperience(id);

    if (result.success) {
      close(`delete-experience-${id}`);
    } else {
      setErrorMessage(result.error ?? '');
      open(`error-delete-experience-${id}`);
    }
  };

  return {
    errorMessage,
    handleOpenDeleteModal,
    handleCloseErrorModal,
    handleDeleteMyExperience,
  };
}
