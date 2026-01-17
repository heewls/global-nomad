'use client';

import Dropdown from '../common/dropdown';
import Input from '../common/input';
import Arrow from '../arrow';
import { DropdownProps } from '../common/dropdown/type';

interface InputDropdownProps extends Pick<
  DropdownProps,
  'options' | 'value' | 'onSelect' | 'scrollbarHidden'
> {
  id: string;
  listArray?: DropdownProps['listArray'];
  placeholder: string;
  inputClassName?: string;
}

export default function InputDropdown({
  placeholder,
  options,
  value,
  listArray = 'left',
  inputClassName,
  onSelect,
  scrollbarHidden,
}: InputDropdownProps) {
  return (
    <Dropdown
      dropdownButton={(isOpen) => (
        <Input
          readOnly
          placeholder={placeholder}
          value={value}
          rightSlot={<Arrow isOpen={isOpen} />}
          inputClassName={'cursor-pointer'}
          inputBgClassName={inputClassName}
        />
      )}
      value={value}
      onSelect={onSelect}
      options={options}
      listSize="sm"
      listArray={listArray}
      listType="active"
      fullWidth
      scrollbarHidden={scrollbarHidden}
    />
  );
}
