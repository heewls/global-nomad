'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from './common/button';

const DESCRIPTION = {
  'reservation-list': '아직 예약한 체험이 없어요',
  'my-experiences': '아직 등록한 체험이 없어요',
  'reservation-status': '아직 등록한 체험이 없어요',
};

type PageDescription = keyof typeof DESCRIPTION;

export default function NoneItem({
  page,
  lookAround = false,
}: {
  page: PageDescription;
  lookAround?: boolean;
}) {
  const router = useRouter();
  return (
    <div className="flex w-full flex-col items-center gap-7.5 pt-3 md:pt-7.5">
      <div className="flex flex-col items-center">
        <Image
          src="/icons/noneItem.svg"
          alt="none item"
          width={182}
          height={182}
        />
        <span className="text-18-m text-gray600">{DESCRIPTION[page]}</span>
      </div>
      {lookAround && (
        <Button
          variant="primary"
          height="50"
          rounded="16"
          fontSize="16-b"
          className="w-45.5"
          onClick={() => router.push('/activities')}
        >
          둘러보기
        </Button>
      )}
    </div>
  );
}
