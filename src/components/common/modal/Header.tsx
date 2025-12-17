interface HeaderProps {
  image?: React.ReactNode;
  children: React.ReactNode;
}

export default function Header({ image, children }: HeaderProps) {
  return (
    <div className="flex flex-col justify-center items-center w-full gap-0.5">
      {image}
      <h2 className="w-full text-center text-gray950 text-16-b sm:text-18-b">
        {children}
      </h2>
    </div>
  );
}
