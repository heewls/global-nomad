import ActivityForm from '@/components/activityForm';
import { getActivity } from '../../[id]/api';

export default async function EditActivity({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const activity = await getActivity(id);

  return (
    <div className="mx-auto my-6 flex w-full max-w-175 flex-col gap-6 sm:my-10">
      <h1 className="text-18-b py-2.5">내 체험 수정</h1>
      <ActivityForm activity={activity} />
    </div>
  );
}
