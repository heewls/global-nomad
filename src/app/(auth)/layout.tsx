import '@/app/globals.css';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full justify-center">
      <main className="mx-5.5 mt-16 flex w-full max-w-160 flex-col sm:mt-35">
        {children}
      </main>
    </div>
  );
}
