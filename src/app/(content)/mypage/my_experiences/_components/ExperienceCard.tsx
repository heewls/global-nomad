'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/button';
import Rating from '@/components/common/rating';
import AlertModal from '@/components/modals/AlertModal';
import ConfirmModal from '@/components/modals/ConfirmModal';
import useExperience from '../_hook/useExperience';
import { Experience } from '@/types/experience';

export default function ExperienceCard({
  experience,
}: {
  experience: Experience;
}) {
  return (
    <div className="shadow-2 flex h-44.5 w-full justify-between gap-5.5 rounded-3xl bg-white p-6 lg:h-50.5 lg:rounded-[30px] lg:p-7.5">
      <div className="flex h-fit w-full flex-col gap-3 lg:gap-5">
        <div className="flex h-fit w-full flex-col gap-2.5 lg:gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-14-m sm:text-18-m font-semibold">
              {experience.title}
            </span>
            <div className="flex items-center gap-[3px] sm:gap-[5px]">
              <Rating
                starLength={1}
                className="h-3 w-3 sm:h-5 sm:w-5"
                readonly
              />
              <div className="text-12-m sm:text-14-m">
                <span>{experience.rating}</span>
                <span className="text-gray400">{`(${experience.reviewCount})`}</span>
              </div>
            </div>
          </div>
          <div className="text-16-b sm:text-18-b flex items-center gap-0.5">
            <span>₩ {experience.price.toLocaleString()}</span>
            <span className="text-12-m text-gray400 sm:text-16-m shrink-0">
              / 인
            </span>
          </div>
        </div>
        <ExperienceButtons id={experience.id} />
      </div>
      <Link
        href={`/activity/${experience.id}`}
        className="relative h-20.5 w-20.5 shrink-0 overflow-hidden rounded-[20px] lg:h-35.5 lg:w-35.5"
      >
        <Image
          fill
          src={experience.bannerImageUrl}
          alt="experience image"
          className="object-cover"
          sizes="(min-width: 1024px) 142px, 82px"
        />
      </Link>
    </div>
  );
}

function ExperienceButtons({ id }: { id: number }) {
  const {
    errorMessage,
    handleOpenDeleteModal,
    handleCloseErrorModal,
    handleDeleteMyExperience,
  } = useExperience();

  const router = useRouter();
  
  const successDeleteModalId = `delete-experience-${id}`;
  const errorDeleteModalId = `error-delete-experience-${id}`;

  return (
    <div className="flex w-fit gap-3">
      <Button
        variant="outline"
        height="29"
        rounded="8"
        fontSize="14-m"
        className="w-17.5 flex-1"
        onClick={() => router.push(`/activity/edit/${id}`)}
      >
        수정하기
      </Button>
      <Button
        variant="outline"
        height="29"
        rounded="8"
        fontSize="14-m"
        className="bg-gray50! w-17.5 flex-1 border-none"
        onClick={(e) => handleOpenDeleteModal({ e, id })}
      >
        삭제하기
      </Button>
      <ConfirmModal
        modalId={successDeleteModalId}
        headerText="체험을 삭제하시겠습니까?"
        cancelText="아니오"
        confirmText="삭제하기"
        confirmFunction={() => handleDeleteMyExperience(id)}
      />
      <AlertModal
        modalId={errorDeleteModalId}
        headerText={errorMessage}
        confirmText="확인"
        confirmFunction={() => handleCloseErrorModal(id)}
      />
    </div>
  );
}
