import clsx from "clsx";
import Image from "next/image";

interface HeaderProps {
  image?: string;
  imageSize?: string;
  children: React.ReactNode;
}

export default function Header({ image, imageSize, children }: HeaderProps) {
  return (
    <div className="flex flex-col justify-center items-center w-full gap-0.5">
      {image && (
        <div className={clsx("relative overflow-hidden", imageSize)}>
          <Image fill src={image} className="object-cover" alt="notice" />
        </div>
      )}
      <h2 className="w-full break-keep text-center text-gray950 text-16-b sm:text-18-b">
        {children}
      </h2>
    </div>
  );
}
