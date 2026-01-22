import Image from 'next/image';
import X from '@/assets/icons/x.svg';

export default function FormImagePreview({
  image,
  deleteImage,
}: {
  image: string;
  deleteImage: () => void;
}) {
  return (
    <div className="relative">
      <div className="border-gray100 relative h-20 w-20 overflow-hidden rounded-lg border sm:h-32 sm:w-32">
        <Image
          fill
          src={image}
          alt="activity images"
          sizes="(max-width: 640px) 80px, 128px"
          className="object-cover"
        />
      </div>
      <button
        type="button"
        onClick={deleteImage}
        className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black sm:h-6.5 sm:w-6.5"
      >
        <X className="h-4 w-4 text-white sm:h-5 sm:w-5" />
      </button>
    </div>
  );
}
