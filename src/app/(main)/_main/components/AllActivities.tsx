import MainCard from '@/components/mainCard';
import { Activities } from '@/types/activities';

export default async function AllActivities({ items }: { items: Activities }) {
  const { activities, totalCount } = items;

  return (
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
  );
}
