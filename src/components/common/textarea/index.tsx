"use client";

import clsx from "clsx";
import { TextareaProps } from "./type";

export default function Textarea({
  maxHeight = "h-50",
  className,
  ...props
}: TextareaProps) {
  return (
    <div
      className={clsx(
        "bg-white flex h-fit w-full items-start rounded-2xl px-5 py-4 border border-gray100"
      )}
    >
      <textarea
        className={clsx(
          "flex w-full resize-none justify-center items-center text-16-body-m text-gray950 placeholder:text-gray400 placeholder:text-16-m focus:outline-none textarea-custom-scrollbar",
          maxHeight,
          className
        )}
        {...props}
      />
    </div>
  );
}
