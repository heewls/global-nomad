import { Activity } from './activities';

interface ActivityReservation {
  bannerImageUrl: Activity['bannerImageUrl'];
  title: Activity['title'];
  id: Activity['id'];
}

export type TReservationStatus =
  | 'pending'
  | 'confirmed'
  | 'declined'
  | 'canceled'
  | 'completed';

export interface Reservation {
  id: number;
  teamId: string;
  userId: number;
  activity: ActivityReservation;
  scheduleId: number;
  status: TReservationStatus;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface Reservations {
  cursorId: number;
  totalCount: number;
  reservations: Reservation[];
}

export interface ReservationListParams {
  cursorId: number;
  size: number;
  status: TReservationStatus;
}
