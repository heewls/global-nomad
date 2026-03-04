import axiosServer from '@/lib/api/axiosServer';
import { ReservationListParams, Reservations } from '@/types/reservation';

export async function getReservationList(params: ReservationListParams) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, String(value));
    }
  });

  const response = await axiosServer.get<Reservations>(
    `/my-reservations?${query}`,
    {
      fetchOptions: {
        next: { tags: ['reservation-list'] },
      },
    }
  );

  return response.data;
}
