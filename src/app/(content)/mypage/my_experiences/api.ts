import axiosServer from '@/lib/api/axiosServer';
import { Experiences } from '@/types/experience';

export const getExperiences = async () => {
  const response = await axiosServer.get<Experiences>('my-activities', {
    fetchOptions: {
      next: { tags: ['my-experiences'] },
    },
  });

  return response.data;
};
