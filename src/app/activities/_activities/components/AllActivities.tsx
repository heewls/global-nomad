import MainCard from '@/components/mainCard';
import Category from './Category';
import { Activities } from '@/types/activities';

export default function AllActivities({ items }: { items: Activities }) {
  const { activities, totalCount } = items;

  return (
    <div className="flex flex-col gap-6 sm:gap-7.5">
      <div className="flex flex-col gap-2.5 sm:gap-4 md:gap-5">
        <h2 className='text-18-b'>모든 체험</h2>
        <Category />
      </div>
      <div className="grid grid-cols-4 gap-6">
        {activities.map((item) => (
          <MainCard
            key={item.id}
            href={`/activities/${item.id}`}
            title={item.title}
            rating={item.rating}
            reviewCount={item.reviewCount}
            price={item.price}
            bannerImageUrl={item.bannerImageUrl}
          />
        ))}
      </div>
    </div>
  );
}
