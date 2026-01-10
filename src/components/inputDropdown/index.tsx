'use client';

import { useState } from 'react';
import Dropdown from '../common/dropdown';
import Input from '../common/input';
import Arrow from '../arrow';

interface InputDropdownProps {
  placeholder: string;
  options: string[];
  defaultValue: string;
  inputClassName?: string;
  onSelect: (option: string) => void;
}

export default function InputDropdown({
  placeholder,
  options,
  defaultValue,
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
      listArray="left"
      listType="active"
      fullWidth
    />
  );
}
