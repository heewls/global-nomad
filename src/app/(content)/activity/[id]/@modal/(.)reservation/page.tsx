import ReservationForm from '../../_activity/components/ReservationForm';
import { getActivity } from '../../api';

export default async function ReservationModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const activity = await getActivity(id);

  return <ReservationForm detail={activity} />;
}
