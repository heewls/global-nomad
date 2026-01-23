import { ActivitiesParams, CategoryType, SortType } from '@/types/activities';
import AllActivities from './_main/AllActivities';
import { getActivities } from './_main/api';

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
    size: 8,
  };

  const initialActivities = await getActivities({
    method: 'offset',
    ...params,
  });

  return (
    <div>
      <AllActivities items={initialActivities} />
    </div>
  );
}
