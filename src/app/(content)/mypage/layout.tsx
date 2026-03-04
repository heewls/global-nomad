import MypageContainer from './_components/MypageContainer';

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MypageContainer>{children}</MypageContainer>;
}
