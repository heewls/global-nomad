import Link from 'next/link';
import Image from 'next/image';
import { Activity } from '@/types/activities';

export default function HeroBanner({ hero }: { hero: Activity }) {
  const date = new Date();
  const month = date.getMonth();

  return (
    <Link
      href={`/activities/${hero.id}`}
      className="relative h-45 w-full cursor-pointer overflow-hidden rounded-xl md:h-93.5 md:rounded-[18px] lg:h-125 lg:rounded-3xl"
    >
      <Image
        fill
        src={hero.bannerImageUrl}
        alt="monthly best activity image"
        className="object-cover"
      />
      <div className="absolute inset-0 z-1 h-full w-full bg-linear-to-b from-transparent to-black/50" />
      <div className="absolute bottom-1 z-2 flex w-full -translate-y-1/2 flex-col items-center justify-center text-white md:bottom-10">
        <h2 className="text-18-b md:text-24-b lg:text-32-b">{hero.title}</h2>
        <span className="text-14-m md:text-16-b lg:text-18-b">
          {month}월의 인기 체험 BEST🔥
        </span>
      </div>
    </Link>
  );
}
