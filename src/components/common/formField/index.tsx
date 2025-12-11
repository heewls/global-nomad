"use client";

import { FormFieldProps } from "./type";

export default function FormField({
  label,
  errorMessage,
  render,
}: FormFieldProps) {
  const showError = !!errorMessage;

  return (
    <div className="flex w-full flex-col gap-1.5">
      <div className="flex flex-col gap-2.5">
        <label className="flex text-16-m text-gray950">{label}</label>
        {render()}
      </div>

      {showError && (
        <span className="pl-2 text-12-m text-red text-left">
          {errorMessage}
        </span>
      )}
    </div>
  );
}
