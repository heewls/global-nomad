import CATEGORY_OPTIONS from '@/contents/category';

export interface Activity {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Activities {
  activities: Activity[];
  cursorId: number;
  totalCount: number;
}

export interface ActivityDetail extends Activity {
  subImages: SubImages[];
  schedules: Schedules[];
}

export interface ActivityRequest extends Omit<
  Activity,
  'id' | 'userId' | 'rating' | 'reviewCount' | 'createdAt' | 'updatedAt'
> {
  schedules: Omit<Schedules, 'id'>[];
  subImageUrls?: string[];
}

interface SubImages {
  id: number;
  imageUrl: string;
}

interface Schedules {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

export type CategoryType = (typeof CATEGORY_OPTIONS)[number];
export type SortType = 'latest' | 'price_asc' | 'price_desc' | 'most_reviewed';

export interface ActivitiesParams {
  method: string;
  category: CategoryType;
  keyword: string;
  sort: SortType;
  page: number;
  size: number;
}
