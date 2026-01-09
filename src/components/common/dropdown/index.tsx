import { useState } from 'react';
import clsx from 'clsx';
import { useOutSideClickAutoClose } from '@/hook/useOutSideClickAutoClose';
import { DropdownProps } from './type';

const dropdownListSize = {
  sm: 'h-12 w-24',
  md: 'h-12 w-30',
};

const dropdownListType = {
  simple: 'text-gray950',
  active: 'text-gray900 rounded-xl px-5',
};

const dropdownListArray = {
  left: 'justify-start px-5',
  center: 'justify-center',
  right: 'justify-end px-5',
};

export default function Dropdown({
  dropdownButton,
  options,
  defaultValue,
  onSelect,
  listArray,
  listType,
  listSize,
  fullWidth,
  placement,
}: DropdownProps) {
  const [selectedOption, setSelectedOption] = useState<string>(
    defaultValue ?? options[0]
  );
  const { ref, isOpen, setIsOpen } = useOutSideClickAutoClose(false);

  const handleOptionClick = (option: string) => {
    if (listType === 'active') setSelectedOption(option);
    setIsOpen(false);
    onSelect?.(option);
  };

  return (
    <div ref={ref} className={clsx('relative', fullWidth && 'w-full')}>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer"
      >
        {dropdownButton?.(isOpen)}
      </div>
      {isOpen && (
        <div
          className={clsx(
            'border-gray100 absolute z-100 mt-2 cursor-pointer border bg-white',
            listType === 'active' ? 'rounded-2xl p-3' : 'rounded-lg',
            fullWidth && 'w-full',
            placement
          )}
        >
          <ul
            className={clsx(
              'text-16-m flex max-h-60 flex-col overflow-y-auto',
              listType === 'active' && 'gap-1'
            )}
          >
            {options.map((option, idx) => {
              const isSelected =
                listType === 'active' && option === selectedOption;
              return (
                <li
                  key={idx}
                  onClick={() => handleOptionClick(option)}
                  className={clsx(
                    'flex items-center',
                    dropdownListSize[listSize],
                    dropdownListArray[listArray],
                    dropdownListType[listType],
                    isSelected && 'bg-primary100',
                    fullWidth && 'w-full'
                  )}
                >
                  {option}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
