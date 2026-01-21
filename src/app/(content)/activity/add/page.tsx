import ActivityForm from '@/components/activityForm';

export default function ActivityAdd() {
  return (
    <div className="mx-auto my-6 flex w-full max-w-175 flex-col gap-6 sm:my-10">
      <h1 className="text-18-b py-2.5">내 체험 등록</h1>
      <ActivityForm />
    </div>
  );
}
