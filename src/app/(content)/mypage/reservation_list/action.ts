'use server';

import { updateTag } from 'next/cache';
import axiosServer from '@/lib/api/axiosServer';

export default async function cancelReservationAction(id: number) {
  try {
    await axiosServer.patch(`/my-reservations/${id}`, {
      status: 'canceled',
    });
    updateTag('reservation-list');

    return { success: true };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: '예약 취소에 실패했습니다.',
    };
  }
}
