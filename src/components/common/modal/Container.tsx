'use client';

import { useEffect } from 'react';
import clsx from 'clsx';

export default function Container({
  children,
  containerClassName,
  placement,
}: {
  children: React.ReactNode;
  containerClassName?: string;
  placement?: string;
}) {
  useEffect(() => {
    const originalOverflow = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div
      className={clsx(
        'fixed inset-0 z-999 flex justify-center bg-black/50',
        placement ? placement : 'items-center'
      )}
    >
      <div
        className={clsx(
          'flex flex-col items-center justify-center rounded-[30px] bg-white',
          containerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
