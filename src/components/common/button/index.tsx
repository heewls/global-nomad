import clsx from 'clsx';

type ButtonVariant = keyof typeof buttonVariant;
type ButtonHeight = keyof typeof buttonHeight;
type ButtonRounded = keyof typeof buttonRounded;
type ButtonFontSize = keyof typeof buttonFontSize;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: ButtonVariant;
  height: ButtonHeight;
  rounded: ButtonRounded;
  fontSize: ButtonFontSize;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const buttonVariant = {
  primary: 'bg-primary500 text-white',
  outline: 'bg-white border-1 border-gray200 text-gray600',
  disabled: 'bg-gray200 text-gray50',
};

const buttonHeight = {
  '29': 'h-[29px]',
  '40': 'h-10',
  '40-48': 'h-10 md:h-12',
  '50': 'h-12.5',
  '54': 'h-13.5',
};

const buttonRounded = {
  '8': 'rounded-lg',
  '12': 'rounded-xl',
  '12-14': 'rounded-xl md:rounded-[14px]',
  '14': 'rounded-[14px]',
  '16': 'rounded-2xl',
};

const buttonFontSize = {
  '14-m': 'text-14-m',
  '14-b': 'text-14-b',
  '14-16-b': 'text-14-b md:text-16-b',
  '16-b': 'text-16-b',
};

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
        'flex w-30 items-center justify-center whitespace-nowrap',
        buttonHeight[height],
        buttonRounded[rounded],
        buttonFontSize[fontSize],
        disabled ? buttonVariant.disabled : buttonVariant[variant],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
