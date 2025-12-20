import { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  isError?: boolean;
  border?: string;
  inputBgClassName?: string;
  inputClassName?: string;
}
