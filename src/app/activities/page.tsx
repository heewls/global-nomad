import AllActivities from './_activities/components/AllActivities';
import { getActivities } from './_activities/api';
import { ActivitiesParams, CategoryType, SortType } from '@/types/activities';

export default async function Main({
  searchParams,
}: {
  searchParams: ActivitiesParams;
}) {
  const params = {
    category: (searchParams.category as CategoryType) || undefined,
    keyword: (searchParams.keyword as string) || undefined,
    sort: (searchParams.sort as SortType) || 'latest',
    page: Number(searchParams.page) || 1,
  };

  const initialActivities = await getActivities({
    method: 'offset',
    size: 8,
    ...params,
  });

  return (
    <div>
      <AllActivities items={initialActivities} />
    </div>
  );
}
