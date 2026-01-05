export default function BouncingDots({
  size = 8,
  backgroundColor = 'bg-gray50',
}: {
  size?: number;
  backgroundColor?: string;
}) {
  return (
    <div className="flex gap-2">
      <div
        className={`${backgroundColor} animate-bounce rounded-full delay-75`}
        style={{ width: size, height: size }}
      />
      <div
        className={`${backgroundColor} animate-[bounce_1s_infinite_200ms] rounded-full delay-100`}
        style={{ width: size, height: size }}
      />
      <div
        className={`${backgroundColor} animate-[bounce_1s_infinite_400ms] rounded-full delay-150`}
        style={{ width: size, height: size }}
      />
    </div>
  );
}
