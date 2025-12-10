import clsx from "clsx";
import { InputProps } from "./type";

export default function Input({
  leftSlot = null,
  rightSlot = null,
  isError,
  border = "border-gray100",
  inputBgClassName,
  inputClassName,
  ...props
}: InputProps) {
  return (
    <div
      className={clsx(
        "bg-white flex h-13.5 w-full gap-2.5 rounded-2xl border px-5 py-4",
        isError ? "border-red" : border,
        inputBgClassName
      )}
    >
      {leftSlot}

      <input
        className={clsx(
          "w-full text-16-m text-gray950 placeholder:text-gray400 placeholder:text-16-m focus:outline-none",
          inputClassName
        )}
        {...props}
      />

      {rightSlot}
    </div>
  );
}
