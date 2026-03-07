'use client';

import MainCard from '@/components/mainCard';
import { Activities } from '@/types/activities';
import Prev from '@/assets/icons/prevArrow.svg';
import Next from '@/assets/icons/nextArrow.svg';
import useBestActivities from '../hook/useBestActivities';

export default function BestActivities({ best }: { best: Activities }) {
  const { activities } = best;
  const { scrollRef, handleScroll, isFirstPage, isLastPage } =
    useBestActivities();

  return (
    <div className="smd:gap-7.5 relative flex flex-col gap-6">
      <h2 className="text-18-b md:text-24-b lg:text-32-b">인기 체험</h2>
      <div className="relative">
        <div
          ref={scrollRef}
          className="scrollbar-hidden -m-5 flex gap-3 overflow-x-auto mask-[linear-gradient(to_right,transparent,black_20px,black_calc(100%-20px),transparent)] px-5 py-6 [-webkit-mask-image:linear-gradient(to_right,transparent,black_20px,black_calc(100%-20px),transparent)] md:gap-5 md:overflow-hidden lg:gap-6"
        >
          {activities.map((item) => (
            <div
              key={item.id}
              className="w-32.5 shrink-0 sm:min-w-40 md:min-w-[calc((100%-20px)/2)] lg:min-w-[calc((100%-72px)/4)]"
            >
              <MainCard
                href={`/activity/${item.id}`}
                title={item.title}
                rating={item.rating}
                reviewCount={item.reviewCount}
                price={item.price}
                bannerImageUrl={item.bannerImageUrl}
              />
            </div>
          ))}
        </div>

        <div className="hidden md:block">
          {isFirstPage && (
            <button
              onClick={() => handleScroll('prev')}
              className="absolute top-1/2 -left-4 z-20 flex h-13.5 w-13.5 -translate-y-1/2 items-center justify-center rounded-full bg-white/70"
            >
              <Prev className="text-black" />
            </button>
          )}
          {isLastPage && (
            <button
              onClick={() => handleScroll('next')}
              className="absolute top-1/2 -right-4 z-20 flex h-13.5 w-13.5 -translate-y-1/2 items-center justify-center rounded-full bg-white/70"
            >
              <Next className="text-black" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
