import Image from 'next/image';
import Rating from '../common/rating';
import { Activity } from '@/types/activities';

export type ActivityCard = Pick<
  Activity,
  'title' | 'rating' | 'reviewCount' | 'price' | 'bannerImageUrl'
>;

export default function MainCard({
  title,
  rating,
  reviewCount,
  price,
  bannerImageUrl,
}: ActivityCard) {
  return (
    <div className="max-m-39 shadow-card flex w-full cursor-pointer flex-col -space-y-8 sm:-space-y-15">
      <div className="relative aspect-9/10 overflow-hidden rounded-t-[18px] sm:rounded-t-4xl">
        <Image
          src={bannerImageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 155px, (max-width: 768px) 332px, (max-width: 1280px) 262px, 332px"
        />
      </div>
      <div className="shadow-card-content z-10 flex h-fit flex-col gap-2.5 rounded-[18px] bg-white p-4 sm:gap-4.5 sm:rounded-4xl sm:px-7.5 sm:py-5">
        <div className="flex flex-col gap-1">
          <span className="text-14-m sm:text-18-m truncate font-semibold">
            {title}
          </span>
          <div className="flex items-center gap-[3px] sm:gap-[5px]">
            <Rating starLength={1} className="h-3 w-3 sm:h-5 sm:w-5" readonly />
            <div className="text-12-m sm:text-14-m">
              <span>{rating}</span>
              <span className="text-gray400">{`(${reviewCount})`}</span>
            </div>
          </div>
        </div>
        <span className="text-16-b sm:text-18-b flex items-center gap-0.5">
          ₩ {price.toLocaleString()}
          <span className="text-12-m text-gray400 sm:text-16-m">/ 인</span>
        </span>
      </div>
    </div>
  );
}
