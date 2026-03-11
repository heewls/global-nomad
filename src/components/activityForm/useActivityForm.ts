import { useState } from 'react';
import { useRouter } from 'next/navigation';
import z from 'zod';
import axios from 'axios';
import useZodForm from '@/hook/useZodForm';
import axiosClient from '@/lib/api/axiosClient';
import { ActivityRequest, ActivityDetail } from '@/types/activities';
import useModalStore from '@/store/modal';

interface ActivitiesImageResponse {
  activityImageUrl: string;
}

export default function useActivityForm(activityData?: ActivityDetail) {
  const [imageLoadingType, setImageLoadingType] = useState<
    'banner' | 'sub' | null
  >(null);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [activityId, setActivityId] = useState<number | null>(null);

  const { open, close } = useModalStore();
  const router = useRouter();

  const isEditMode = !!activityData;

  const activitySchema = z.object({
    title: z.string().min(1),
    category: z.string().min(1),
    description: z.string().min(1),
    price: z.number().min(0),
    address: z.string().min(1),
    schedules: z
      .array(
        z.object({
          date: z.string().min(1),
          startTime: z.string().min(1),
          endTime: z.string().min(1),
        })
      )
      .min(1),
    bannerImageUrl: z.string().min(1).url(),
    subImageUrls: z.array(z.string().url()).max(4).optional().default([]),
  });

  const defaultValues = {
    title: activityData?.title ?? '',
    category: activityData?.category ?? '',
    description: activityData?.description ?? '',
    price: activityData?.price ?? 0,
    address: activityData?.address ?? '',
    schedules: activityData?.schedules ?? [],
    bannerImageUrl: activityData?.bannerImageUrl ?? '',
    subImageUrls: activityData?.subImages?.map((img) => img.imageUrl) ?? [],
  };

  const form = useZodForm({
    validationSchema: activitySchema,
    defaultValues,
  });

  const handleImageChange = ({
    e,
    image,
  }: {
    e: React.ChangeEvent<HTMLInputElement>;
    image: 'bannerImageUrl' | 'subImageUrls';
  }) => {
    if (imageLoadingType) return;

    setImageLoadingType(image === 'bannerImageUrl' ? 'banner' : 'sub');

    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    axiosClient
      .post<ActivitiesImageResponse>('/activities/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        const newImage = response.data.activityImageUrl;

        if (image === 'subImageUrls') {
          const prevImages = form.getValues('subImageUrls') || [];
          form.setValue('subImageUrls', [...prevImages, newImage], {
            shouldValidate: true,
          });
        } else {
          form.setValue('bannerImageUrl', newImage, { shouldValidate: true });
        }
        setImageLoadingType(null);
      })
      .finally(() => setImageLoadingType(null));
  };

  const handleBannerImageDelete = () => {
    form.setValue('bannerImageUrl', '', { shouldValidate: true });
  };

  const handleSubImagesDelete = (idx: number) => {
    const sub = form.getValues('subImageUrls') || [];
    const updateSub = sub.filter((_, index) => index !== idx);

    form.setValue('subImageUrls', updateSub, { shouldValidate: true });
  };

  const handleFormSubmit = (form: ActivityRequest) => {
    if (isFormLoading) return;

    setIsFormLoading(true);

    const method = isEditMode ? 'patch' : 'post';
    const url = isEditMode
      ? `/my-activities/${activityData.id}`
      : '/activities';

    axiosClient[method](url, {
      ...form,
    })
      .then((response) => {
        setIsFormLoading(false);
        open('success-write');
        setActivityId(response.data.id);
      })
      .catch((error) => {
        if (!axios.isAxiosError(error)) return;
        open('error-write');
        console.error(error);
      })
      .finally(() => setIsFormLoading(false));
  };

  const successConfirm = () => {
    close('success-write');
    router.push(`/activity/${activityId}`);
  };

  const closeErrorModal = () => {
    close('error-write');
  };

  const bannerImage = form.watch('bannerImageUrl');
  const subImages = form.watch('subImageUrls');
  const buttonChildren = isEditMode ? '수정하기' : '등록하기';
  const successModalText = isEditMode
    ? '체험 수정이 완료되었습니다.'
    : '체험 등록이 완료되었습니다.';
  const errorModalText = isEditMode
    ? '체험 수정이 실패했습니다.'
    : '체험 등록이 실패했습니다.';

  return {
    form,
    isLoading: isFormLoading,
    bannerImage,
    subImages,
    imageLoadingType,
    buttonChildren,
    successModalText,
    errorModalText,
    handleImageChange,
    handleBannerImageDelete,
    handleSubImagesDelete,
    handleFormSubmit,
    successConfirm,
    closeErrorModal,
  };
}
