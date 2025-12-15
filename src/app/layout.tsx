import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GlobalNomad",
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
      <body>{children}</body>
      {modal}
    </html>
  );
}
