'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import clsx from 'clsx';
import Symbol from '@/assets/icons/symbol.svg';
import Text from '@/../public/logo/smText.svg';
import Bell from '@/../public/icons/bell.svg';
import ProfileImage from '@/components/profileImage';
import useUserStore from '@/store/user';
import Dropdown from '@/components/common/dropdown';
import useModalStore from '@/store/modal';
import ConfirmModal from '@/components/modals/ConfirmModal';
import { clearTokens } from '@/lib/clientCookie';

export default function GNB() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLogin, clearUser } = useUserStore();
  const { open, close } = useModalStore();

  const isMainPage = pathname === '/';

  const handleOptionClick = (option: string) => {
    if (option === '마이 페이지') router.push('/mypage');
    if (option === '로그아웃') open('logout');
  };

  const handleConfirmModal = () => {
    clearUser();
    clearTokens();
    close('logout');
  };

  return (
    <nav
      className={clsx(
        isMainPage ? 'bg-transparent' : 'bg-white',
        'sticky top-0 z-100 flex h-20 w-full items-center justify-center'
      )}
    >
      <div className="flex w-full max-w-380 justify-between px-6 sm:px-7.5 md:px-10">
        <Link
          href="/"
          className="flex w-fit items-center justify-center gap-3"
        >
          <Symbol className="h-7 w-7" />
          <Text className="hidden sm:flex" />
        </Link>
        {!isLogin && (
          <div className="text-14-m text-gray950 flex gap-2.5">
            <Link href="/login" className="px-2.5 py-2">
              로그인
            </Link>
            <Link href="/signup" className="px-2.5 py-2">
              회원가입
            </Link>
          </div>
        )}
        {isLogin && (
          <div className="flex items-center justify-center gap-5">
            <Bell className="cursor-pointer" />
            <div className="bg-gray100 h-3.5 w-px" />
            <div className="flex items-center justify-center gap-2.5">
              <ProfileImage
                className="h-7.5 w-7.5"
                image={user?.profileImageUrl}
              />
              <Dropdown
                dropdownButton={() => (
                  <span className="text-14-m text-gray950 cursor-pointer">
                    {user?.nickname ?? 'USER'}
                  </span>
                )}
                onSelect={handleOptionClick}
                options={['마이 페이지', '로그아웃']}
                listArray="center"
                listType="simple"
                listSize="sm"
                placement="right-0"
              />
            </div>
          </div>
        )}
      </div>
      <ConfirmModal
        modalId="logout"
        headerText="로그아웃 하시겠습니까?"
        cancelText="아니오"
        confirmText="네"
        confirmFunction={handleConfirmModal}
      />
    </nav>
  );
}
