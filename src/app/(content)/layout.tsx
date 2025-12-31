import '@/app/globals.css';
import Footer from '@/components/layout/footer';
import GNB from '@/components/layout/gnb';

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full flex-col">
      <GNB />
      <main className="flex-1 overflow-y-auto">
        <div className="flex min-h-full flex-col items-center">
          <section className="mx-6 w-full max-w-300 flex-1 sm:mx-7.5">
            {children}
          </section>
          <Footer />
        </div>
      </main>
    </div>
  );
}
