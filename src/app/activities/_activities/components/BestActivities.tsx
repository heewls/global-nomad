'use client';

import { useRef } from 'react';
import MainCard from '@/components/mainCard';
import { Activities } from '@/types/activities';
import Prev from '@/assets/icons/prevArrow.svg';
import Next from '@/assets/icons/nextArrow.svg';

export default function BestActivities({ best }: { best: Activities }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { activities } = best;

  const handleScroll = (type: 'prev' | 'next') => {
    if (!scrollRef.current) return;

    const { scrollLeft, clientWidth } = scrollRef.current;
    const distance = type === 'prev' ? -clientWidth : clientWidth;

    scrollRef.current.scrollTo({
      left: scrollLeft + distance,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative flex flex-col gap-6 sm:gap-7.5">
      <h2 className="text-18-b md:text-24-b lg:text-32-b">인기 체험</h2>
      <div className="relative">
        <div
          ref={scrollRef}
          className="scrollbar-hidden -m-5 flex gap-3 overflow-x-auto mask-[linear-gradient(to_right,transparent,black_10px,black_calc(100%-10px),transparent)] p-5 [-webkit-mask-image:linear-gradient(to_right,transparent,black_10px,black_calc(100%-10px),transparent)] md:gap-5 md:overflow-hidden lg:gap-6"
        >
          {activities.map((item) => (
            <div
              key={item.id}
              className="min-w-32.5 shrink-0 sm:min-w-40 md:min-w-[calc((100%-20px)/2)] lg:min-w-[calc((100%-62px)/4)]"
            >
              <MainCard
                href={`/activities/${item.id}`}
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
          <button
            onClick={() => handleScroll('prev')}
            className="absolute top-1/2 -left-4 z-20 flex h-13.5 w-13.5 -translate-y-1/2 items-center justify-center rounded-full bg-white"
          >
            <Prev className="text-black" />
          </button>
          <button
            onClick={() => handleScroll('next')}
            className="absolute top-1/2 -right-4 z-20 flex h-13.5 w-13.5 -translate-y-1/2 items-center justify-center rounded-full bg-white"
          >
            <Next className="text-black" />
          </button>
        </div>
      </div>
    </div>
  );
}
