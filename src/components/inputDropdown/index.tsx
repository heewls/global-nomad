'use client';

import { useState } from 'react';
import Dropdown from '../common/dropdown';
import Input from '../common/input';
import Arrow from '../arrow';
import { DropdownProps } from '../common/dropdown/type';

interface InputDropdownProps extends Pick<
  DropdownProps,
  'options' | 'defaultValue' | 'onSelect'
> {
  id:string;
  listArray?: DropdownProps['listArray'];
  placeholder: string;
  inputClassName?: string;
}

export default function InputDropdown({
  placeholder,
  options,
  defaultValue,
  listArray = 'left',
  inputClassName,
  onSelect,
}: InputDropdownProps) {
  const [dropdownValue, setDropdownValue] = useState(defaultValue || '');

  return (
    <Dropdown
      dropdownButton={(isOpen) => (
        <Input
          readOnly
          placeholder={placeholder}
          value={dropdownValue}
          rightSlot={<Arrow isOpen={isOpen} />}
          inputClassName={'cursor-pointer'}
          inputBgClassName={inputClassName}
        />
      )}
      defaultValue={defaultValue}
      onSelect={(option) => {
        setDropdownValue(option);
        onSelect(option);
      }}
      options={options}
      listSize="sm"
      listArray={listArray}
      listType="active"
      fullWidth
    />
  );
}
