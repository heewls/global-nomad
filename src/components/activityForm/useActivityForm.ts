import { useState } from 'react';
import { useRouter } from 'next/navigation';
import z from 'zod';
import axios from 'axios';
import useZodForm from '@/hook/useZodForm';
import axiosClient from '@/lib/api/axiosClient';
import { ActivityRequest } from '@/types/activities';
import useModalStore from '@/store/modal';

interface ScheduleSlot {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

const initialSlot: ScheduleSlot = {
  id: Date.now(),
  date: '',
  startTime: '',
  endTime: '',
};

interface ActivitiesImageResponse {
  activityImageUrl: string;
}

export default function useActivityForm(activityData?: ActivityRequest) {
  const [scheduleSlots, setScheduleSlots] = useState<ScheduleSlot[]>([
    initialSlot,
  ]);
  const [imageLoadingType, setImageLoadingType] = useState<
    'banner' | 'sub' | null
  >(null);
  const [isFormLoading, setIsFormLoading] = useState(false);

  const { open, close } = useModalStore();
  const router = useRouter();

  const handleAddSlot = () => {
    const newSlot: ScheduleSlot = {
      id: Date.now(),
      date: '',
      startTime: '',
      endTime: '',
    };
    setScheduleSlots((prev) => [...prev, newSlot]);
  };

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
    schedules: activityData?.schedules ?? [
      { date: '', startTime: '', endTime: '' },
    ],
    bannerImageUrl: activityData?.bannerImageUrl ?? '',
    subImageUrls: activityData?.subImageUrls ?? [],
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
          form.setValue('subImageUrls', [...prevImages, newImage]);
        } else {
          form.setValue('bannerImageUrl', newImage);
        }
        setImageLoadingType(null);
      })
      .finally(() => setImageLoadingType(null));
  };

  const handleBannerImageDelete = () => {
    form.setValue('bannerImageUrl', '');
  };

  const handleSubImagesDelete = (idx: number) => {
    const sub = form.getValues('subImageUrls') || [];
    const updateSub = sub.filter((_, index) => index !== idx);

    form.setValue('subImageUrls', updateSub);
  };

  let activitiesId: string;

  const handleFormSubmit = (form: ActivityRequest) => {
    if (isFormLoading) return;

    setIsFormLoading(true);

    axiosClient
      .post('/activities', {
        form,
      })
      .then((response) => {
        setIsFormLoading(false);
        open('success-write');
        activitiesId = response.data.id;
      })
      .catch((error) => {
        if (!axios.isAxiosError(error)) return;
        console.log(error);
      })
      .finally(() => setIsFormLoading(false));
  };

  const successConfirm = () => {
    close('success-write');
    console.log(activitiesId);
    // router.push(`/activities/${activitiesId}`);
  };

  const bannerImage = form.watch('bannerImageUrl');
  const subImages = form.watch('subImageUrls');

  return {
    form,
    scheduleSlots,
    bannerImage,
    subImages,
    imageLoadingType,
    handleAddSlot,
    handleImageChange,
    handleBannerImageDelete,
    handleSubImagesDelete,
    handleFormSubmit,
    successConfirm,
  };
}
