import * as B from './style';

type ButtonVariant = keyof typeof B.buttonVariant;
type ButtonHeight = keyof typeof B.buttonHeight;
type ButtonRounded = keyof typeof B.buttonRounded;
type ButtonFontSize = keyof typeof B.buttonFontSize;

export default interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: ButtonVariant;
  height?: ButtonHeight;
  rounded?: ButtonRounded;
  fontSize?: ButtonFontSize;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}
