type DropdownSize = 'sm' | 'md';

export interface DropdownProps {
  dropdownButton: (isOpen: boolean) => React.ReactNode;
  options?: string[];
  optionComponent?: React.ReactNode;
  value?: string;
  onSelect: (option: string) => void;
  listArray: 'left' | 'center' | 'right';
  listType: 'simple' | 'active';
  listSize: DropdownSize;
  fullWidth?: boolean;
  placement?: string;
  scrollbarHidden?: boolean;
}

export interface DropdownButtonProps extends Pick<DropdownProps, 'fullWidth'> {
  size: DropdownSize;
  selectedOption: string;
  fullWidth?: boolean;
}

export interface CustomDropdownProps extends Omit<
  DropdownProps,
  'dropdownButton' | 'listSize'
> {
  size: DropdownSize;
}
