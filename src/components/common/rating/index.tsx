"use client";

import { useState } from "react";
import clsx from "clsx";
import Star from "@/assets/icons/star.svg";

interface RatingProps {
  starLength: number;
  starSize: string;
  count?: number;
  onChange?: (star: number) => void;
  readonly?: boolean;
}

export default function Rating({
  starLength,
  starSize = "16",
  count,
  onChange,
  readonly,
}: RatingProps) {
  const [hover, setHover] = useState<number>(0);
  const [rating, setRating] = useState<number>(count ?? 0);

  const handleStarClick = (star: number) => {
    if (readonly) return;

    onChange?.(star);
    setRating(star);
  };

  const handleMouseOver = (star: number) => {
    if (readonly) return;
    setHover(star);
  };

  const handleMouseLeave = () => {
    if (readonly) return;
    setHover(0);
  };

  const activeRating = hover > 0 ? hover : rating;

  return (
    <div className="flex justify-center items-center">
      {Array.from({ length: starLength }).map((_, idx) => (
        <Star
          className={clsx(readonly ?? "cursor-pointer")}
          key={idx}
          width={starSize}
          height={starSize}
          fill={activeRating > idx ? "#FFCB02" : "var(--color-gray100)"}
          onClick={() => handleStarClick(idx + 1)}
          onMouseOver={() => handleMouseOver(idx + 1)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
}
