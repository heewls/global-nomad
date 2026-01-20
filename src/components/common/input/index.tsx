import clsx from 'clsx';
import { InputProps } from './type';

export default function Input({
  leftSlot = null,
  rightSlot = null,
  isError,
  border = 'border-gray100',
  inputBgClassName,
  inputClassName,
  ref,
  ...props
}: InputProps) {
  return (
    <div
      className={clsx(
        'flex h-13.5 w-full gap-2.5 rounded-2xl border bg-white px-5 py-4',
        isError ? 'border-red' : border,
        inputBgClassName
      )}
    >
      {leftSlot}

      <input
        ref={ref}
        className={clsx(
          'text-16-m text-gray950 placeholder:text-gray400 placeholder:text-16-m w-full focus:outline-none',
          inputClassName
        )}
        {...props}
      />

      {rightSlot}
    </div>
  );
}
