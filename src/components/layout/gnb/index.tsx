import Link from 'next/link';
import Symbol from '@/../public/logo/smSymbol.svg';
import Text from '@/../public/logo/smText.svg';
import Bell from '@/../public/icons/bell.svg';
import ProfileImage from '@/components/profileImage';

export default function GNB() {
  return (
    <nav className="sticky top-0 flex h-20 w-full items-center justify-center">
      <div className="flex w-full max-w-380 justify-between px-6 md:px-7.5">
        <Link href="/" className="flex w-fit items-center justify-center gap-3">
          <Symbol />
          <Text className="hidden sm:flex" />
        </Link>
        <div className="text-14-m text-gray950 flex gap-2.5">
          <Link href="#" className="px-2.5 py-2">
            로그인
          </Link>
          <Link href="#" className="px-2.5 py-2">
            회원가입
          </Link>
        </div>
        <div className="flex items-center justify-center gap-5">
          <Bell className="cursor-pointer" />
          <div className="bg-gray100 h-3.5 w-px" />
          <div className="flex items-center justify-center gap-2.5">
            <ProfileImage size={30} />
            <span className="text-14-m text-gray950 cursor-pointer">user</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
