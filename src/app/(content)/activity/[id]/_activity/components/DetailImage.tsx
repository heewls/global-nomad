import { Activity, ActivityDetail } from '@/types/activities';
import clsx from 'clsx';
import Image from 'next/image';

interface DetailImageProps {
  bannerImage: Activity['bannerImageUrl'];
  subImages: ActivityDetail['subImages'];
}

export default function DetailImage({
  bannerImage,
  subImages,
}: DetailImageProps) {
  const noneSubImages = subImages.length === 0;

  return (
    <>
      {noneSubImages ? (
        <div className="relative h-100 w-full overflow-hidden rounded-3xl">
          <Image
            fill
            src={bannerImage}
            alt="banner image"
            className="object-cover"
            sizes="100vw"
          />
        </div>
      ) : (
        <div
          className={clsx(
            'grid h-100 w-full gap-1.5 overflow-hidden rounded-3xl md:gap-3',
            subImages.length === 1 && 'grid-cols-1',
            subImages.length === 2 && 'grid-cols-2',
            subImages.length === 3 && 'grid-cols-2 grid-rows-2',
            subImages.length >= 4 && 'grid-cols-2 grid-rows-2'
          )}
        >
          {subImages.slice(0, 4).map((sub, index) => (
            <div
              key={sub.id}
              className={clsx(
                'relative h-full w-full',
                subImages.length === 3 && index === 0 && 'row-span-2'
              )}
            >
              <Image
                fill
                src={sub.imageUrl}
                alt={`activity image ${index}`}
                className="object-cover"
                sizes="100vw"
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
