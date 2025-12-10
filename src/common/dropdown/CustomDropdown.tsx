"use client";

import { useState } from "react";
import clsx from "clsx";
import { DropdownButtonProps, CustomDropdownProps } from "./type";
import Dropdown from ".";
import Arrow from "../arrow";
import { useOutSideClickAutoClose } from "@/hook/useOutSideClickAutoClose";

const dropdownButtonSize = {
  sm: "h-10 w-fit px-3.5",
  md: "h-14 w-30 px-5",
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
        "flex items-center justify-center px-5 py-4 bg-white border border-gray100 rounded-2xl text-16-m text-gray950",
        dropdownButtonSize[size],
        fullWidth && "w-full"
      )}
    >
      <div className="flex w-full justify-between items-center">
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

  const handleClickOption = (option: string) => {
    setSelectedOption(option);
    onSelect?.(option);
  };

  return (
    <>
      <Dropdown
        dropdownButton={
          <DropdownButton
            size={size}
            selectedOption={selectedOption}
            fullWidth={fullWidth}
          />
        }
        onSelect={handleClickOption}
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
