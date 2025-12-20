import ArrowDown from '@/assets/icons/fullDownArrow.svg';
import ArrowUp from '@/assets/icons/fullUpArrow.svg';

export default function Arrow({
  isOpen,
  size = '24',
  fillColor = '#1f1f22',
}: {
  isOpen: boolean;
  size?: string;
  fillColor?: string;
}) {
  return isOpen ? (
    <ArrowUp width={size} height={size} fill={fillColor} />
  ) : (
    <ArrowDown width={size} height={size} fill={fillColor} />
  );
}
