import { ButtonHTMLAttributes, MouseEventHandler } from 'react';
import X from '@/assets/icons/x.svg';

interface CloseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function CloseButton({ onClick, ...props }: CloseButtonProps) {
  return (
    <button className="flex w-full justify-end" onClick={onClick} {...props}>
      <X className="h-6 w-6 text-black cursor-pointer"/>
    </button>
  );
}
