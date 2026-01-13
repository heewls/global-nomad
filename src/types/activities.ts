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

export interface ActivityDetail extends Activity {
  subImages: SubImages[];
  schedules: Schedules[];
}

export interface ActivityRequest extends Omit<
  Activity,
  'id' | 'userId' | 'rating' | 'reviewCount' | 'createdAt' | 'updatedAt'
> {
  schedules: Omit<Schedules, 'id'>[];
  subImageUrls: string[];
}

interface SubImages {
  id: number;
  imageUrl: string;
}

interface Schedules {
  id?: number;
  date: string;
  startTime: string;
  endTime: string;
}
