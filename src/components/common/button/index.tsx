import clsx from 'clsx';
import ButtonProps from './type';
import * as B from './style';

export default function Button({
  children,
  variant = 'primary',
  height = '40',
  rounded = '14',
  fontSize = '16-b',
  disabled = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'flex w-30 shrink-0 items-center justify-center whitespace-nowrap',
        B.buttonHeight[height],
        B.buttonRounded[rounded],
        B.buttonFontSize[fontSize],
        disabled ? B.buttonVariant.disabled : B.buttonVariant[variant],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
