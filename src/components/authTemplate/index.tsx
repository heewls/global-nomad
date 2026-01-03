import Link from 'next/link';
import Button from '../common/button';
import Symbol from '@/assets/icons/symbol.svg';
import Text from '@/../public/logo/lgText.svg';
import Kakao from '@/../public/icons/kakao.svg';

const AUTH_CONTENT = {
  login: {
    title: '로그인',
    linkText: '회원이 아니신가요?',
    href: '/signup',
  },
  signup: {
    title: '회원가입',
    linkText: '회원이신가요?',
    href: '/login',
  },
};

export default function AuthTemplate({
  children,
  auth,
}: {
  children: React.ReactNode;
  auth: 'signup' | 'login';
}) {
  const content = AUTH_CONTENT[auth];
  const isLogin = auth === 'login';

  return (
    <div className="flex flex-col items-center justify-center gap-10 sm:gap-15">
      <Link
        href="/"
        className="flex flex-col items-center justify-center gap-6"
      >
        <Symbol width={144} height={144} />
        <Text className="hidden sm:flex" />
      </Link>
      <div className="flex w-full flex-col items-center gap-5 sm:gap-7.5">
        {children}
        <div className="flex w-full items-center gap-3.5">
          <div className="bg-gray100 h-px flex-1" />
          <span className="text-16-m shrink-0 text-[#79747e]">
            {isLogin ? 'or' : 'SNS 계정으로 회원가입하기'}
          </span>
          <div className="bg-gray100 h-px flex-1" />
        </div>
        <Button
          variant="outline"
          height="54"
          rounded="16"
          fontSize="16-m"
          className="w-full"
        >
          <Kakao className="mr-1" />
          카카오 {content.title}
        </Button>
        <span className="text-gray400 text-16-m flex gap-1">
          {content.linkText}
          <Link href={content.href} className="underline">
            {isLogin ? '회원가입하기' : '로그인하기'}
          </Link>
        </span>
      </div>
    </div>
  );
}
