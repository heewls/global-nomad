'use server';

import { updateTag } from 'next/cache';
import { AxiosError } from 'axios';
import axiosServer from '@/lib/api/axiosServer';

export default async function deleteMyExperience(id: number) {
  try {
    await axiosServer.delete(`/my-activities/${id}`);
    updateTag('my-experiences');

    return { success: true };
  } catch (error) {
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      const errorMessage = error.response?.data?.message;

      if (status === 400) {
        return {
          success: false,
          error: errorMessage,
        };
      }
    }

    console.error(error);
    return {
      success: false,
      error: '체험 삭제에 실패했습니다.',
    };
  }
}
