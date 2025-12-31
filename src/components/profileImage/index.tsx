import clsx from 'clsx';
import Image from 'next/image';

export default function ProfileImage({
  size,
  image,
}: {
  size: number;
  image?: string | null;
}) {
  return (
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      className={clsx(
        'relative overflow-hidden rounded-full',
        !image && 'bg-primary100'
      )}
    >
      <Image
        src={image ?? '/icons/defaultProfile.svg'}
        fill
        alt="profile image"
        className="object-cover"
      />
    </div>
  );
}
