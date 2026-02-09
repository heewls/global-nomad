'use client';

import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/common/button';
import DetailInfo from './DetailInfo';
import { ReservationForm } from './ReservationForm';
import useDetail from '../hook/useDetail';
import { ActivityDetail } from '@/types/activities';

export default function Detail({ detail }: { detail: ActivityDetail }) {
  const { isOwner } = useDetail({
    activityId: detail.id.toString(),
  });

  return (
    <div>
      <div className="relative flex items-start gap-10">
        <div className="flex w-full flex-col gap-5 md:gap-7.5 lg:gap-10">
          {detail.subImages.map((sub) => (
            <Image
              key={sub.id}
              src={sub.imageUrl}
              alt="banner image"
              width={200}
              height={200}
            />
          ))}

          <div className="block lg:hidden">
            <DetailInfo detail={detail} />
          </div>

          <div className="border-b-gray100 flex flex-col gap-2 border-b pb-5">
            <h2 className="text-16-b md:text-18-b">체험 설명</h2>
            <p className="text-16-body-m">{detail.description}</p>
          </div>

          <div className="border-b-gray100 flex flex-col gap-2 border-b pb-5">
            <h2 className="text-16-b md:text-18-b">오시는 길</h2>
            <span className="text-14-b text-gray700 font-semibold">
              {detail.address}
            </span>
          </div>
        </div>

        <div className="hidden items-start lg:sticky lg:top-0 lg:block lg:w-102 lg:shrink-0">
          <DetailInfo detail={detail} />
          <ReservationForm detail={detail} isOwner={isOwner(detail.userId)} />
        </div>
      </div>

      {!isOwner && (
        <div className="border-t-gray100 fixed bottom-0 left-0 flex h-31 w-full flex-col gap-3 border-t bg-white px-6 py-4.5 lg:hidden">
          <div className="flex items-center justify-between">
            <span className="text-18-b flex items-center gap-1.5">
              ₩ {detail.price.toLocaleString()}
              <span className="text-gray400 text-16-m">/인</span>
            </span>
            <Link
              href={`/activity/${detail.id}/reservation`}
              className="text-primary500 text-16-b underline"
            >
              날짜 선택하기
            </Link>
          </div>
          <Button
            variant="primary"
            height="50"
            rounded="14"
            fontSize="16-b"
            className="w-full"
          >
            예약하기
          </Button>
        </div>
      )}
    </div>
  );
}
