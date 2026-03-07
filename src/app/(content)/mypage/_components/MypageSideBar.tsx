'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import clsx from 'clsx';
import ProfileImage from '@/components/profileImage';
import useUserStore from '@/store/user';
import Person from '@/assets/icons/person.svg';
import Chat from '@/assets/icons/chat.svg';
import Setting from '@/assets/icons/setting.svg';
import Calendar from '@/assets/icons/calendar.svg';

const MYPAGE_MENU = [
  { label: '내 정보', href: '/mypage/my_profile', icon: Person },
  { label: '예약 내역', href: '/mypage/reservation_list', icon: Chat },
  { label: '내 체험 관리', href: '/mypage/my_experiences', icon: Setting },
  { label: '예약 현황', href: '/mypage/reservation_status', icon: Calendar },
];

export default function MypageSideBar() {
  const { user } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && pathname === '/mypage')
        router.replace('/mypage/my_profile');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [router, pathname]);

  return (
    <div className="border-gray50 h-112.5 w-full shrink-0 rounded-xl border md:h-85.5 md:w-44.5 lg:h-112.5 lg:w-72.5">
      <div className="flex flex-col items-center gap-6 px-3.5 py-6 md:gap-3 lg:gap-6">
        <ProfileImage
          className="h-30 w-30 md:h-17.5 md:w-17.5 lg:h-30 lg:w-30"
          image={user?.profileImageUrl}
        />

        <ul className="flex w-full flex-col items-start gap-3.5 md:gap-3 lg:gap-3.5">
          {MYPAGE_MENU.map((menu) => {
            const Icon = menu.icon;
            const isActive = pathname === menu.href;

            return (
              <li key={menu.label} className="w-full">
                <Link
                  href={menu.href}
                  className={clsx(
                    'text-16-m flex h-13.5 w-full items-center gap-2 px-5 py-3 transition-colors md:rounded-[14px] lg:rounded-2xl',
                    isActive ? 'bg-primary100 text-gray950' : 'text-gray600'
                  )}
                >
                  <Icon
                    className={clsx(
                      'h-6 w-6 md:h-5 md:w-5 lg:h-6 lg:w-6',
                      isActive ? 'text-primary500' : 'text-gray600'
                    )}
                  />
                  {menu.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
