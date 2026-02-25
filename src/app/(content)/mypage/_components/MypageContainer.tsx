'use client';

import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import MypageSideBar from './MypageSideBar';

export default function MypageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isMenuPage = pathname === '/mypage';

  return (
    <div className="mx-auto max-w-245">
      <div className="flex py-9 md:gap-7.5 md:py-10 lg:gap-16">
        <aside
          className={clsx(isMenuPage ? 'block w-full' : 'hidden md:block')}
        >
          <MypageSideBar />
        </aside>
        <div
          className={clsx(isMenuPage ? 'hidden md:block' : 'block', 'flex-1')}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
