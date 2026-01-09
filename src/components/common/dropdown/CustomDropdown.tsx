'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { DropdownButtonProps, CustomDropdownProps } from './type';
import Dropdown from '.';
import { useOutSideClickAutoClose } from '@/hook/useOutSideClickAutoClose';
import Arrow from '@/components/arrow';

const dropdownButtonSize = {
  sm: 'h-10 w-fit px-3.5',
  md: 'h-14 w-30 px-5',
};

function DropdownButton({
  size,
  selectedOption,
  fullWidth,
}: DropdownButtonProps) {
  const { ref, isOpen, setIsOpen } = useOutSideClickAutoClose(false);

  return (
    <div
      ref={ref}
      onClick={() => setIsOpen((prev) => !prev)}
      className={clsx(
        'border-gray100 text-16-m text-gray950 flex items-center justify-center rounded-2xl border bg-white px-5 py-4',
        dropdownButtonSize[size],
        fullWidth && 'w-full'
      )}
    >
      <div className="flex w-full items-center justify-between">
        <span>{selectedOption}</span>
        <Arrow isOpen={isOpen} />
      </div>
    </div>
  );
}

export default function CustomDropdown({
  onSelect,
  options,
  defaultValue,
  size,
  listArray,
  listType,
  placement,
  fullWidth,
}: CustomDropdownProps) {
  const [selectedOption, setSelectedOption] = useState(
    defaultValue ?? options[0]
  );

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onSelect?.(option);
  };

  return (
    <>
      <Dropdown
        dropdownButton={() => (
          <DropdownButton
            size={size}
            selectedOption={selectedOption}
            fullWidth={fullWidth}
          />
        )}
        onSelect={handleOptionClick}
        listSize={size}
        listArray={listArray}
        listType={listType}
        options={options}
        placement={placement}
        fullWidth={fullWidth}
      />
    </>
  );
}
