// src/store/slices/types.ts

export interface Hotel {
  id?: number;
  name?: string;
  [key: string]: any;
}

export interface RoomType {
  id: number;
  name?: string;
  [key: string]: any;
}

export interface image {
  id: number;
  original_url: string;
}

export interface CartItem {
  id: number;
  images: image[];
  checkin_date: string;
  checkout_date: string;
  adults: number;
  ages: string[];
  children: number;
  price_per_night: number;
  room_type: RoomType;
  hotel: Hotel;
  quantity?: number;
}

export interface CartState {
  cart: CartItem[];
  loading: boolean;
  error: string | null;
}
