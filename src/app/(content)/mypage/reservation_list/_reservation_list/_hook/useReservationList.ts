'use client';

import { useState } from 'react';
import cancelReservationAction from '../../action';
import useModalStore from '@/store/modal';

export default function useReservationList() {
  const [errorMessage, setErrorMessage] = useState('');
  const { open, close } = useModalStore();

  const handleOpenCancelModal = ({
    e,
    reservationId,
  }: {
    e: React.MouseEvent<HTMLElement>;
    reservationId: number;
  }) => {
    e.preventDefault();
    open(`cancel-reservation-${reservationId}`);
  };

  const handleCancelReservation = async (reservationId: number) => {
    const result = await cancelReservationAction(reservationId);

    if (result?.success) {
      close(`cancel-reservation-${reservationId}`);
    } else {
      setErrorMessage(result.error ?? '');
      open(`error-cancel-reservation-${reservationId}`);
    }
  };

  const handleCloseErrorModal = (reservationId: number) => {
    close(`error-cancel-reservation-${reservationId}`);
  };

  return {
    errorMessage,
    handleOpenCancelModal,
    handleCancelReservation,
    handleCloseErrorModal,
  };
}
