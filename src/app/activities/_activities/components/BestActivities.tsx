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

    const container = scrollRef.current;

    const firstActivity = container.firstElementChild as HTMLElement;
    if (!firstActivity) return;

    const activityWidth = firstActivity.offsetWidth;
    const gap =
      window.innerWidth >= 1024 ? 24 : window.innerWidth >= 768 ? 20 : 12;

    const preview = window.innerWidth >= 1024 ? 4 : 2;
    const distance = (activityWidth + gap) * preview;

    container.scrollTo({
      left: container.scrollLeft + (type === 'prev' ? -distance : distance),
      behavior: 'smooth',
    });
  };

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
            className="absolute top-1/2 -left-4 z-20 flex h-13.5 w-13.5 -translate-y-1/2 items-center justify-center rounded-full bg-white/70"
          >
            <Prev className="text-black" />
          </button>
          <button
            onClick={() => handleScroll('next')}
            className="absolute top-1/2 -right-4 z-20 flex h-13.5 w-13.5 -translate-y-1/2 items-center justify-center rounded-full bg-white/70"
          >
            <Next className="text-black" />
          </button>
        </div>
      </div>
    </div>
  );
}
