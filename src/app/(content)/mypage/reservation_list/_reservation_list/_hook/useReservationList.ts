'use client';

import axiosClient from '@/lib/api/axiosClient';
import useModalStore from '@/store/modal';

export default function useReservationList() {
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
    await axiosClient
      .patch(`/my-reservations/${reservationId}`, {
        status: 'canceled',
      })
      .then(() => close(`cancel-reservation-${reservationId}`));
  };

  return {
    handleOpenCancelModal,
    handleCancelReservation,
  };
}
