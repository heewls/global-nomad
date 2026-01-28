'use client';

import Dropdown from '@/components/common/dropdown';
import Arrow from '@/components/arrow';
import useActivities from '../useActivities';

const FILTER = {
  '가격 낮은 순': 'price_asc',
  '가격 높은 순': 'price_desc',
} as const;

export default function Filter() {
  const { updateParams } = useActivities();

  return (
    <Dropdown
      dropdownButton={(isOpen) => (
        <div className="flex px-3.5 py-2.5 md:px-2 md:py-3">
          <span>가격</span>
          <Arrow isOpen={isOpen} />
        </div>
      )}
      onSelect={(option: string) => {
        updateParams({ sort: FILTER[option as keyof typeof FILTER] });
      }}
      options={['가격 낮은 순', '가격 높은 순']}
      value="가격"
      listSize="sm"
      listArray="center"
      listType="simple"
      placement="right-0"
    />
  );
}
