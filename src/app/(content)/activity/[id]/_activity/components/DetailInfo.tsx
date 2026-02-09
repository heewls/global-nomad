'use client';

import Rating from '@/components/common/rating';
import Dropdown from '@/components/common/dropdown';
import ConfirmModal from '@/components/modals/ConfirmModal';
import useDetail from '../hook/useDetail';
import { ActivityDetail } from '@/types/activities';
import Spot from '@/../public/icons/spot.svg';
import Kebab from '@/../public/icons/kebab.svg';

export default function DetailInfo({ detail }: { detail: ActivityDetail }) {
  const { isOwner, handleSelect, handleActivityDelete } = useDetail({
    activityId: detail.id.toString(),
  });

  return (
    <div className="border-b-gray100 flex w-full justify-between border-b pb-5 md:pb-6 lg:border-none lg:pb-7.5">
      <div className="flex flex-col gap-1 md:gap-2.5 lg:gap-2">
        <span className="text-13-m text-gray700 md:text-14-m">
          {detail.category}
        </span>
        <div className="flex flex-col gap-4">
          <span className="text-18-b md:text-24-b">{detail.title}</span>
          <div className="text-14-m text-gray700 flex flex-col gap-2.5">
            <div className="item-center flex gap-1.5">
              <Rating starLength={1} className="h-4 w-4" readonly />
              <div>
                <span>{detail.rating}</span>
                <span>{`(${detail.reviewCount})`}</span>
              </div>
            </div>
            <div className="flex gap-0.5">
              <Spot />
              <span>{detail.address}</span>
            </div>
          </div>
        </div>
      </div>
      {isOwner(detail.userId) && (
        <Dropdown
          dropdownButton={() => <Kebab className="cursor-pointer" />}
          options={['수정하기', '삭제하기']}
          onSelect={handleSelect}
          listArray="center"
          listType="simple"
          listSize="sm"
          placement="right-6 -top-1.5"
        />
      )}
      <ConfirmModal
        modalId="delete-activity"
        headerText="체험을 삭제하시겠습니까?"
        cancelText="아니오"
        confirmText="네"
        confirmFunction={() => handleActivityDelete(detail.id.toString())}
      />
    </div>
  );
}
