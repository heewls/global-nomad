'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import clsx from 'clsx';
import useUserStore from '@/store/user';
import Person from '@/assets/icons/person.svg';
import Chat from '@/assets/icons/chat.svg';
import Setting from '@/assets/icons/setting.svg';
import Calendar from '@/assets/icons/calendar.svg';
import Edit from '@/assets/icons/edit.svg';
import FileInput from '@/components/common/input/FileInput';

const DEFAULT_IMAGE = '/icons/defaultProfile.svg';

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
      if (window.innerWidth >= 768) router.replace('/mypage/my_profile');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [router]);

  return (
    <div className="border-gray50 h-112.5 w-full shrink-0 rounded-xl border md:h-85.5 md:w-44.5 lg:h-112.5 lg:w-72.5">
      <div className="flex flex-col items-center gap-6 px-3.5 py-6 md:gap-3 lg:gap-6">
        <FileInput>
          {({ fileInputRef }) => (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative"
            >
              <div className="bg-primary100 relative h-30 w-30 cursor-pointer rounded-full md:h-17.5 md:w-17.5 lg:h-30 lg:w-30">
                <Image
                  fill
                  src={user?.profileImageUrl || DEFAULT_IMAGE}
                  alt="user profile image"
                  className="object-cover"
                  sizes="120px"
                />
              </div>
              <div className="bg-gray300 absolute right-0 bottom-1 flex h-7.5 w-7.5 cursor-pointer items-center justify-center rounded-full md:h-6 md:w-6 lg:h-7.5 lg:w-7.5">
                <Edit className="h-4 w-4 md:h-3 md:w-3 lg:h-4 lg:w-4" />
              </div>
            </div>
          )}
        </FileInput>
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
