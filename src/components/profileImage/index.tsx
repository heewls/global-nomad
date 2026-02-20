import clsx from 'clsx';
import Image from 'next/image';

export default function ProfileImage({
  className,
  image,
}: {
  className: string;
  image?: string | null;
}) {
  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-full',
        !image && 'bg-primary100',
        className
      )}
    >
      <Image
        fill
        src={image ?? '/icons/defaultProfile.svg'}
        alt="profile image"
        className="object-cover"
      />
    </div>
  );
}
