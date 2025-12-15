"use client";

import { useEffect } from "react";
import clsx from "clsx";

export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  useEffect(() => {
    const originalOverflow = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div
      className={clsx(
        "fixed inset-0 z-999 flex items-center justify-center bg-black/50",
        className
      )}
    >
      <div className="bg-white p-7.5 rounded-[30px]">{children}</div>
    </div>
  );
}
