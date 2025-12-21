import { ButtonHTMLAttributes, MouseEventHandler } from 'react';
import X from '@/../public/icons/x.svg';

interface CloseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function CloseButton({ onClick, ...props }: CloseButtonProps) {
  return (
    <button className="flex w-full justify-end" onClick={onClick} {...props}>
      <X className="cursor-pointer" />
    </button>
  );
}
