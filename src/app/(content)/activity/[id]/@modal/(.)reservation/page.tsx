import { ReservationModal } from '../../_activity/components/compound/ReservationCompound';
import { getActivity } from '../../api';

export default async function Reservation({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const activity = await getActivity(id);

  return <ReservationModal detail={activity} />;
}
