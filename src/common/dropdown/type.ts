export interface DropdownProps {
  dropdownButton: React.ReactNode;
  options: string[];
  defaultValue?: string;
  onSelect: (option: string) => void;
  listArray: "left" | "center" | "right";
  listType: "simple" | "active";
  listSize: "sm" | "md";
  fullWidth?: boolean;
  placement?: string;
}
