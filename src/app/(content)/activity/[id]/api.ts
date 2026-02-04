import axiosClient from '@/lib/api/axiosClient';

export async function deleteActivity(id: string) {
  await axiosClient.delete(`/my-activities/${id}`);
}
