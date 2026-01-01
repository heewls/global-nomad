import Visible from '@/../public/icons/visible.svg';
import Hidden from '@/../public/icons/hidden.svg';

interface VisibilityToggleProps {
  isVisible: boolean;
  onToggle: (isVisible: boolean) => void;
}

export default function VisibilityToggle({
  isVisible,
  onToggle,
}: VisibilityToggleProps) {
  const Icon = isVisible ? Visible : Hidden;
  return (
    <Icon
      className="h-6 w-6 cursor-pointer"
      onClick={() => onToggle(!isVisible)}
    />
  );
}
