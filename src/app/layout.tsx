import type { Metadata } from 'next';
import './globals.css';
import Footer from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'GlobalNomad',
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="flex min-h-screen flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">{children}</main>
        {modal}
        <Footer />
        <div id="modal-root" />
      </body>
    </html>
  );
}
