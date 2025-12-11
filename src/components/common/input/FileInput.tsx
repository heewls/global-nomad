"use client";

import { useRef } from "react";

interface FileInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "children"> {
  children: (props: {
    fileInputRef: React.RefObject<HTMLInputElement | null>;
  }) => React.ReactNode;
}

export default function FileInput({ children, ...rest }: FileInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        {...rest}
      />
      {children({ fileInputRef })}
    </>
  );
}
