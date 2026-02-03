import AllActivities from './_activities/components/AllActivities';
import { getActivities } from './_activities/api';
import { ActivitiesParams, CategoryType, SortType } from '@/types/activities';
import BestActivities from './_activities/components/BestActivities';
import SearchActivities from './_activities/components/search/SearchActivities';
import HeroBanner from './_activities/components/HeroBanner';

export default async function Activities({
  searchParams,
}: {
  searchParams: Promise<ActivitiesParams>;
}) {
  const params = await searchParams;

  const activitiesParams = {
    category: (params.category as CategoryType) || undefined,
    keyword: (params.keyword as string) || undefined,
    sort: (params.sort as SortType) || 'latest',
    page: Number(params.page) || 1,
  };

  const initialActivities = await getActivities({
    method: 'offset',
    size: 8,
    ...activitiesParams,
  });

  const bestActivities = await getActivities({
    method: 'offset',
    sort: 'most_reviewed',
    size: 12,
  });

  const keyword = params.keyword;
  const isSearching = !!keyword && keyword !== '';

  return (
    <div className="flex flex-col gap-10 py-10 sm:gap-15 md:py-20">
      <div className="flex flex-col gap-4 md:gap-7.5 lg:gap-12.5">
        <HeroBanner hero={bestActivities.activities[0]} />
        <SearchActivities />
      </div>
      <div className="flex flex-col gap-10 md:gap-20">
        {!isSearching && <BestActivities best={bestActivities} />}
        <AllActivities isSearching={isSearching} all={initialActivities} />
      </div>
    </div>
  );
}
