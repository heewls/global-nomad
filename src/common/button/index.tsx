import clsx from "clsx";

type ButtonVariant = keyof typeof buttonVariant;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: ButtonVariant;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const buttonVariant = {
  primary: "bg-primary500 text-white",
  outline: "bg-white border-1 border-gray200 text-gray600",
  disabled: "bg-gray20 text-gray50",
};

export default function Button({
  children,
  variant = "primary",
  disabled = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "flex items-center justify-center whitespace-nowrap w-30",
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
