import X from "@/../public/icons/x.svg";

export default function CloseButton() {
  return (
    <button className="w-full flex justify-end">
      <X className="cursor-pointer" />
    </button>
  );
}
