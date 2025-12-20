import X from '@/../public/icons/x.svg';

export default function CloseButton() {
  return (
    <button className="flex w-full justify-end">
      <X className="cursor-pointer" />
    </button>
  );
}
