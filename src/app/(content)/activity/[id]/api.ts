import axiosServer from '@/lib/api/axiosServer';
import { ActivityDetail } from '@/types/activities';

export async function getActivity(id: string): Promise<ActivityDetail> {
  const response = await axiosServer.get(`/activities/${id}`);

  return response.data;
}
