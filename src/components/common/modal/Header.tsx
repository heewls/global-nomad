interface HeaderProps {
  image?: React.ReactNode;
  children: React.ReactNode;
}

export default function Header({ image, children }: HeaderProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-0.5">
      {image}
      <h2 className="text-gray950 text-16-b sm:text-18-b w-full text-center">
        {children}
      </h2>
    </div>
  );
}
