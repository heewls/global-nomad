import axiosServer from '@/lib/api/axiosServer';
import { Activities, ActivitiesParams } from '@/types/activities';

export async function getActivities(params: Partial<ActivitiesParams>) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, String(value));
    }
  });

  const response = await axiosServer.get<Activities>(`/activities?${query}`);

  return response.data;
}
