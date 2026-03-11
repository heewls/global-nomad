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

  const handleFormSubmit = async (form: ActivityRequest) => {
    if (isFormLoading) return;

    setIsFormLoading(true);

    if (!isEditMode) {
      axiosClient
        .post('/activities', { ...form })
        .then((response) => {
          setIsFormLoading(false);
          setActivityId(response.data.id);
          open('success-write');
        })
        .catch((error) => {
          if (!axios.isAxiosError(error)) return;
          console.error(error);

          open('error-write');
          setIsFormLoading(false);
        })
        .finally(() => setIsFormLoading(false));
    }

    const subImageIdsToRemove = activityData?.subImages
      .filter((prev) => !form.subImageUrls?.includes(prev.imageUrl))
      .map((prev) => prev.id);

    const subImageUrlsToAdd =
      form.subImageUrls?.filter(
        (url) => !activityData?.subImages.some((prev) => prev.imageUrl === url)
      ) || [];

    const scheduleIdsToRemove = activityData?.schedules
      .filter((prev) => !form.schedules.some((curr) => curr.id === prev.id))
      .map((prev) => prev.id);

    const schedulesToAdd = form.schedules
      .filter((curr) => !curr.id)
      .map(({ date, startTime, endTime }) => ({ date, startTime, endTime }));

    const patch = {
      title: form.title,
      category: form.category,
      description: form.description,
      price: form.price,
      address: form.address,
      bannerImageUrl: form.bannerImageUrl,
      subImageIdsToRemove,
      subImageUrlsToAdd,
      scheduleIdsToRemove,
      schedulesToAdd,
    };

    axiosClient
      .patch(`/my-activities/${activityData?.id}`, { ...patch })
      .then(() => {
        setIsFormLoading(false);
        open('success-write');
      })
      .catch((error) => {
        if (!axios.isAxiosError(error)) return;
        console.error(error);

        open('error-write');
        setIsFormLoading(false);
      })
      .finally(() => setIsFormLoading(false));
  };

  const successConfirm = () => {
    close('success-write');
    router.push(`/activity/${isEditMode ? activityData.id : activityId}`);
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
