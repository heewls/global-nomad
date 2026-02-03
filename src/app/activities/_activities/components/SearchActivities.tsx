'use client';

import Input from '@/components/common/input';
import Search from '@/../public/icons/search.svg';
import Button from '@/components/common/button';
import useSearch from '../hook/useSearch';

export default function SearchActivities() {
  const {
    localKeyword: keyword,
    handleSearchChange,
    handleSearchSubmit,
  } = useSearch();

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-4 md:gap-9 md:px-10 md:py-8">
      <h2 className="text-16-b sm:text-32-b">무엇을 체험하고 싶으신가요?</h2>
      <Input
        placeholder="내가 원하는 체험은"
        leftSlot={<Search className="shrink-0" />}
        rightSlot={
          <Button
            variant="primary"
            rounded="12-14"
            onClick={handleSearchSubmit}
            className="text-14-b lg:text-16-b h-10 w-21 md:h-11 md:w-30 lg:h-12"
          >
            검색하기
          </Button>
        }
        value={keyword}
        onChange={handleSearchChange}
        border="border-transparent"
        inputBgClassName="h-13.5 md:h-16 lg:h-17.5 shadow-search-bar"
      />
    </div>
  );
}
