import Detail from './_activity/components/Detail';
import { getActivity } from './api';

export default async function DetailActivity({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const activity = await getActivity(id);

  return (
    <div>
      <Detail detail={activity} />
    </div>
  );
}
