import '@/app/globals.css';
import Footer from '@/components/layout/footer';
import GNB from '@/components/layout/gnb';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full flex-col bg-[linear-gradient(to_bottom,#BBDDFF_0%,#F7FBFF_27%,#FFFFFF_100%)]">
      <GNB />
      <main className="flex-1 overflow-y-auto">
        <div className="flex min-h-full flex-col items-center">
          <section className="w-full max-w-300 flex-1 px-6 sm:px-7.5 md:px-10">
            {children}
          </section>
          <Footer />
        </div>
      </main>
    </div>
  );
}
