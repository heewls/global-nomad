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
  const [rating, setRating] = useState<number>(count ?? 0);

  const handleStarClick = (star: number) => {
    if (readonly) return;

    onChange?.(star);
    setRating(star);
  };

  return (
    <div className="flex justify-center items-center">
      {Array.from({ length: starLength }).map((_, idx) => (
        <Star
          className={clsx(readonly ?? "cursor-pointer")}
          key={idx}
          width={starSize}
          height={starSize}
          fill={rating > idx ? "#FFCB02" : "var(--color-gray100)"}
          onClick={() => handleStarClick(idx + 1)}
        />
      ))}
    </div>
  );
}
