'use client';

import MainCard from '@/components/mainCard';
import Category from './Category';
import Filter from './Filter';
import { Activities } from '@/types/activities';
import Pagination from '@/components/pagination';
import useActivities from '../useActivities';

const PAGE_SIZE = 8;

export default function AllActivities({ all }: { all: Activities }) {
  const { activities, totalCount } = all;
  const { page: currentPage, updateParams } = useActivities();

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="flex flex-col gap-6 sm:gap-7.5">
      <div className="flex flex-col gap-2.5 md:gap-4 lg:gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-18-b md:text-24-b lg:text-32-b">모든 체험</h2>
          <div className="lg:hidden">
            <Filter />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Category />
          <div className="hidden lg:flex">
            <Filter />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
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
      <Pagination
        currentPage={Number(currentPage)}
        totalPages={totalPages}
        onPageChange={(page) => updateParams({ page: page })}
      />
    </div>
  );
}
