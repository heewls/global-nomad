import { useRouter } from 'next/navigation';
import useModalStore from '@/store/modal';
import useUserStore from '@/store/user';
import axiosClient from '@/lib/api/axiosClient';

export default function useDetail({ activityId }: { activityId?: string }) {
  const router = useRouter();
  const { open } = useModalStore();

  const userId = useUserStore((state) => state.user?.id);
  const isOwner = (id: number) => {
    return id === Number(userId);
  };

  const handleSelect = (option: string) => {
    if (option === '수정하기') router.push(`/activity/${activityId}/edit `);
    if (option === '삭제하기') open('delete-activity');
  };

  const deleteActivity = async (id: string) => {
    await axiosClient.delete(`/my-activities/${id}`);
  };

  const handleActivityDelete = async (id: string) => {
    await deleteActivity(id);
    router.push('/activities');
  };

  return {
    isOwner,
    handleSelect,
    handleActivityDelete,
  };
}
