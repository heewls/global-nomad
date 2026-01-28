'use client';

import clsx from 'clsx';
import CATEGORY_OPTIONS from '@/contents/category';
import useActivities from '../useActivities';
import Culture from '@/assets/icons/culture.svg';
import Food from '@/assets/icons/food.svg';
import Sports from '@/assets/icons/sports.svg';
import Tour from '@/assets/icons/tour.svg';
import Sightseeing from '@/assets/icons/sightseeing.svg';
import WellBing from '@/assets/icons/wellBing.svg';

const CATEGORY_MAP = {
  '문화 · 예술': <Culture className="h-4 w-4 sm:h-6 sm:w-6" />,
  식음료: <Food className="h-4 w-4 sm:h-6 sm:w-6" />,
  스포츠: <Sports className="h-4 w-4 sm:h-6 sm:w-6" />,
  투어: <Tour className="h-4 w-4 sm:h-6 sm:w-6" />,
  관광: <Sightseeing className="h-4 w-4 sm:h-6 sm:w-6" />,
  웰빙: <WellBing className="h-4 w-4 sm:h-6 sm:w-6" />,
} as const;

export default function Category() {
  const { category: currentCategory, updateParams } = useActivities();

  return (
    <div className="scrollbar-hidden flex gap-2 overflow-x-scroll">
      {CATEGORY_OPTIONS.map((name) => (
        <button
          key={name}
          onClick={() => updateParams({ category: name })}
          className={clsx(
            currentCategory === name
              ? 'text-14-b bg-black text-white'
              : 'text-14-m border border-[#d8d8d8] bg-white',
            'flex shrink-0 items-center gap-1 rounded-full px-3.5 py-2.5'
          )}
        >
          {CATEGORY_MAP[name as keyof typeof CATEGORY_MAP]}
          <span>{name}</span>
        </button>
      ))}
    </div>
  );
}
