'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import clsx from 'clsx';

const STATUS_LIST = [
  { label: '전체', value: 'all' },
  { label: '예약 신청', value: 'pending' },
  { label: '예약 취소', value: 'canceled' },
  { label: '예약 승인', value: 'confirmed' },
  { label: '예약 거절', value: 'declined' },
  { label: '체험 완료', value: 'completed' },
];

export default function ReservationStatus() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get('status') || 'all';

  const updateStatus = (newStatus: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newStatus === 'all') {
      params.delete('status');
    } else {
      params.set('status', newStatus);
    }

    const currentQuery = searchParams.toString();
    const newQueryString = params.toString();
    if (currentQuery === newQueryString) return;

    router.push(`${pathname}?${newQueryString}`, { scroll: false });
  };

  return (
    <div className="scrollbar-hidden flex gap-2 overflow-x-scroll">
      {STATUS_LIST.map((status) => (
        <button
          key={status.value}
          onClick={() => updateStatus(status.value)}
          className={clsx(
            currentStatus === status.value
              ? 'text-6-b bg-black text-white'
              : 'text-6-m border border-[#d8d8d8] bg-white',
            'flex h-10 w-22.5 shrink-0 items-center justify-center rounded-full'
          )}
        >
          {status.label}
        </button>
      ))}
    </div>
  );
}
