'use clients';

import { ActivitiesParams } from '@/types/activities';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function useActivities() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const page = searchParams.get('page') || 1;
  const sort = searchParams.get('sort') || 'latest';
  const keyword = searchParams.get('keyword') || '';
  const category = searchParams.get('category') || '';

  const updateParams = (newParams: Partial<ActivitiesParams>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.set(key, String(value));
      } else {
        params.delete(key);
      }
    });

    if ('keyword' in newParams || 'category' in newParams)
      params.delete('page');

    if (params.get('page') === '1') params.delete('page');

    router.push(`${pathname}?${params.toString()}`);
  };

  return {
    page,
    sort,
    keyword,
    category,
    updateParams,
  };
}
