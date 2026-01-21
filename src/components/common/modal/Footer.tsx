export default function Footer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full justify-center gap-2 sm:gap-3">{children}</div>
  );
}
