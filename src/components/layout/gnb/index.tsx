'use client';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import Symbol from '@/assets/icons/symbol.svg';
import Text from '@/../public/logo/smText.svg';
import Bell from '@/../public/icons/bell.svg';
import ProfileImage from '@/components/profileImage';
import useUserStore from '@/store/user';
import Dropdown from '@/components/common/dropdown';
import useModalStore from '@/store/modal';
import ConfirmModal from '@/components/modals/confirmModal';

export default function GNB() {
  const { user, isLogin, clearUser } = useUserStore();
  const { open, close } = useModalStore();

  const handleOptionClick = (option: string) => {
    if (option === '마이페이지') redirect('/mypage');
    if (option === '로그아웃') open('logout');
  };

  const handleConfirmModal = () => {
    clearUser();
    close('logout');
  };

  return (
    <nav className="sticky top-0 flex h-20 w-full items-center justify-center bg-white">
      <div className="flex w-full max-w-380 justify-between px-6 md:px-7.5">
        <Link href="/" className="flex w-fit items-center justify-center gap-3">
          <Symbol className="h-7 w-7" />
          <Text className="hidden sm:flex" />
        </Link>
        {!isLogin && (
          <div className="text-14-m text-gray950 flex gap-2.5">
            <Link href="#" className="px-2.5 py-2">
              로그인
            </Link>
            <Link href="#" className="px-2.5 py-2">
              회원가입
            </Link>
          </div>
        )}
        {isLogin && (
          <div className="flex items-center justify-center gap-5">
            <Bell className="cursor-pointer" />
            <div className="bg-gray100 h-3.5 w-px" />
            <div className="flex items-center justify-center gap-2.5">
              <ProfileImage size={30} image={user?.profileImageUrl} />
              <Dropdown
                dropdownButton={
                  <span className="text-14-m text-gray950 cursor-pointer">
                    {user?.nickname ?? 'USER'}
                  </span>
                }
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
