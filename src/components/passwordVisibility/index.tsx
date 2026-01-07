import Visible from '@/../public/icons/visible.svg';
import Hidden from '@/../public/icons/hidden.svg';

interface PasswordVisibilityProps {
  isVisible: boolean;
  onToggle: (isVisible: boolean) => void;
}

export default function PasswordVisibility({
  isVisible,
  onToggle,
}: PasswordVisibilityProps) {
  const Icon = isVisible ? Hidden : Visible;
  return (
    <Icon
      className="h-6 w-6 cursor-pointer"
      onClick={() => onToggle(!isVisible)}
    />
  );
}
