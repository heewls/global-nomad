'use client';

import clsx from 'clsx';
import { TextareaProps } from './type';

export default function Textarea({
  maxHeight = 'h-50',
  className,
  ...props
}: TextareaProps) {
  return (
    <div
      className={clsx(
        'border-gray100 flex h-fit w-full items-start rounded-2xl border bg-white px-5 py-4'
      )}
    >
      <textarea
        className={clsx(
          'text-16-body-m text-gray950 placeholder:text-gray400 placeholder:text-16-m textarea-custom-scrollbar flex w-full resize-none items-center justify-center focus:outline-none',
          maxHeight,
          className
        )}
        {...props}
      />
    </div>
  );
}
