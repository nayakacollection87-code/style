export interface User {
  id: string;
  email: string;
  username: string;
  phone: string;
  full_name: string;
  total_coin: number;
  account_status: 'gratis' | 'premium';
  created_at: string;
  updated_at: string;
  referral_code: string;
  referral_clicks: number;
  referral_registrations: number;
}

export interface CoinHistory {
  id: string;
  user_id: string;
  amount: number;
  type: 'add' | 'reduce' | 'traffic' | 'topup' | 'referral';
  description: string;
  created_at: string;
}

export interface TrafficOrder {
  id: string;
  user_id: string;
  service: 'shopee' | 'tiktok';
  url: string;
  views_quantity: number;
  coin_cost: number;
  status: 'pending' | 'process' | 'complete';
  created_at: string;
  updated_at: string;
}

export interface TopUp {
  id: string;
  user_id: string;
  coin_amount: number;
  total_price: number;
  status: 'waiting' | 'verified' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface Referral {
  id: string;
  referrer_id: string;
  referred_user_id: string;
  status: 'pending' | 'verified';
  reward_coin: number;
  created_at: string;
}

export interface Material {
  id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
  category: string;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  action: string;
  description: string;
  ip_address: string;
  created_at: string;
}

export interface Admin {
  id: string;
  username: string;
  email: string;
  role: 'super_admin' | 'assistant_admin';
  created_at: string;
}
