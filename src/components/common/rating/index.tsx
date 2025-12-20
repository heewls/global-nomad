'use client';

import { useState } from 'react';
import clsx from 'clsx';
import Star from '@/assets/icons/star.svg';

interface RatingProps {
  starLength: number;
  starSize: string;
  count?: number;
  gap?: number;
  onChange?: (star: number) => void;
  readonly?: boolean;
}

export default function Rating({
  starLength,
  starSize = '16',
  count,
  gap,
  onChange,
  readonly,
}: RatingProps) {
  const [mouseEvent, setMouseEvent] = useState<number>(0);
  const [rating, setRating] = useState<number>(count ?? 0);

  const handleStarClick = (star: number) => {
    if (readonly) return;

    onChange?.(star);
    setRating(star);
  };

  const handleMouseOver = (star: number) => {
    if (readonly) return;
    setMouseEvent(star);
  };

  const handleMouseLeave = () => {
    if (readonly) return;
    setMouseEvent(0);
  };

  return (
    <div className="flex items-center justify-center">
      {Array.from({ length: starLength }).map((_, idx) => {
        const activeRating = mouseEvent > 0 ? mouseEvent : rating;

        return (
          <div
            key={idx}
            className={clsx(
              'inline-block',
              readonly ? 'cursor-default' : 'cursor-pointer'
            )}
            style={idx < starLength - 1 ? { paddingRight: `${gap}px` } : {}}
            onClick={() => handleStarClick(idx + 1)}
            onMouseOver={() => handleMouseOver(idx + 1)}
            onMouseLeave={handleMouseLeave}
          >
            <Star
              width={starSize}
              height={starSize}
              fill={activeRating > idx ? '#FFCB02' : 'var(--color-gray100)'}
            />
          </div>
        );
      })}
    </div>
  );
}
