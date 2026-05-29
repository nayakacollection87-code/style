import { create } from "zustand";
import { persist } from "zustand/middleware";

// Types
export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  referralCode: string;
  referredBy?: string;
  coins: number;
  totalCoinsBought: number;
  isActive: boolean;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  username: string;
  role: "super_admin" | "assistant_admin";
}

export interface TrafikOrder {
  id: string;
  userId: string;
  platform: "shopee" | "tiktok";
  url: string;
  totalView: number;
  totalCoins: number;
  status: "pending" | "proses" | "complete";
  createdAt: string;
}

// Combined Store
interface StoreState {
  // User auth
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  
  // Admin auth
  adminUser: AdminUser | null;
  isAdminAuthenticated: boolean;
  adminLogin: (admin: AdminUser) => void;
  adminLogout: () => void;
  
  // User data
  users: User[];
  addUser: (user: User) => void;
  updateUserData: (userId: string, updates: Partial<User>) => void;
  deleteUser: (userId: string) => void;
  getUserByUsername: (username: string) => User | undefined;
  
  // Trafik orders
  trafikOrders: TrafikOrder[];
  addTrafikOrder: (order: TrafikOrder) => void;
  updateTrafikStatus: (orderId: string, status: TrafikOrder["status"]) => void;
  hasPendingOrder: (userId: string, platform: "shopee" | "tiktok") => boolean;
  getUserOrders: (userId: string) => TrafikOrder[];
}

// Generate referral code
export function generateReferralCode(username: string): string {
  const prefix = username.substring(0, 3).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}${random}`;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // User auth state
      user: null,
      isAuthenticated: false,
      
      login: (user) => set({ user, isAuthenticated: true }),
      
      logout: () => set({ user: null, isAuthenticated: false }),
      
      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
      
      // Admin auth state
      adminUser: null,
      isAdminAuthenticated: false,
      
      adminLogin: (admin) => set({ adminUser: admin, isAdminAuthenticated: true }),
      
      adminLogout: () => set({ adminUser: null, isAdminAuthenticated: false }),
      
      // User data
      users: [
        {
          id: "demo-1",
          username: "demo",
          name: "Demo User",
          email: "demo@nexvora.com",
          phone: "081234567890",
          referralCode: "DEMO123",
          coins: 100,
          totalCoinsBought: 100,
          isActive: true,
          createdAt: new Date().toISOString(),
        },
      ],
      
      addUser: (user) => set((state) => ({ users: [...state.users, user] })),
      
      updateUserData: (userId, updates) =>
        set((state) => ({
          users: state.users.map((u) =>
            u.id === userId ? { ...u, ...updates } : u
          ),
        })),
      
      deleteUser: (userId) =>
        set((state) => ({
          users: state.users.filter((u) => u.id !== userId),
        })),
      
      getUserByUsername: (username) =>
        get().users.find(
          (u) => u.username.toLowerCase() === username.toLowerCase()
        ),
      
      // Trafik orders
      trafikOrders: [
        {
          id: "order-1",
          userId: "demo-1",
          platform: "shopee",
          url: "https://shopee.co.id/video/123",
          totalView: 5000,
          totalCoins: 5,
          status: "complete",
          createdAt: new Date().toISOString(),
        },
      ],
      
      addTrafikOrder: (order) =>
        set((state) => ({ trafikOrders: [...state.trafikOrders, order] })),
      
      updateTrafikStatus: (orderId, status) =>
        set((state) => ({
          trafikOrders: state.trafikOrders.map((o) =>
            o.id === orderId ? { ...o, status } : o
          ),
        })),
      
      hasPendingOrder: (userId, platform) =>
        get().trafikOrders.some(
          (o) =>
            o.userId === userId &&
            o.platform === platform &&
            o.status === "pending"
        ),
      
      getUserOrders: (userId) =>
        get().trafikOrders.filter((o) => o.userId === userId),
    }),
    {
      name: "nexvora-store",
    }
  )
);
