import Facebook from '@/../public/icons/facebook.svg';
import Instagram from '@/../public/icons/instagram.svg';
import Youtube from '@/../public/icons/youtube.svg';
import Twitter from '@/../public/icons/twitter.svg';

export default function Footer() {
  return (
    <footer className="border-gray100 bottom-0 flex h-29 items-center justify-center border-t px-6 py-7.5 md:h-35 md:px-50">
      <div className="flex w-full flex-col items-center justify-center gap-5 sm:flex-row sm:justify-between">
        <span className="text-gray400 text-13-m hidden sm:inline">
          @GlobalNomad
        </span>
        <div className="text-gray600 text-13-m flex gap-6">
          <span className="cursor-pointer">Privacy</span>
          <span>∙</span>
          <span className="cursor-pointer">Policy</span>
        </div>
        <div className="flex w-full justify-between sm:w-fit sm:justify-center">
          <span className="text-gray400 text-13-m sm:hidden">
            @GlobalNomad - 2025
          </span>
          <div className="flex gap-4">
            <Facebook className="cursor-pointer" />
            <Instagram className="cursor-pointer" />
            <Youtube className="cursor-pointer" />
            <Twitter className="cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
}
