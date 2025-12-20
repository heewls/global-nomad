'use client';

import { FormFieldProps } from './type';

export default function FormField({
  label,
  errorMessage,
  render,
}: FormFieldProps) {
  const showError = !!errorMessage;

  return (
    <div className="flex w-full flex-col gap-1.5">
      <div className="flex flex-col gap-2.5">
        <label className="text-16-m text-gray950 flex">{label}</label>
        {render()}
      </div>

      {showError && (
        <span className="text-12-m text-red pl-2 text-left">
          {errorMessage}
        </span>
      )}
    </div>
  );
}
