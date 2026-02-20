import type { Metadata } from 'next';
import QueryProvider from '@/lib/querys/QueryProvider';
import './globals.css';

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
      <body className="h-screen overflow-hidden bg-white">
        <QueryProvider>{children}</QueryProvider>
        {modal}
        <div id="modal-root" />
      </body>
    </html>
  );
}
