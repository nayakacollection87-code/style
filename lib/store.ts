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
  koin: number;
  totalKoinBought: number;
  isActive: boolean;
  createdAt: Date;
}

export interface Admin {
  id: string;
  username: string;
  name: string;
  email: string;
  role: "super_admin" | "assistant_admin";
  createdAt: Date;
}

export interface TopUpKoin {
  id: string;
  userId: string;
  amount: number;
  koin: number;
  status: "pending" | "verified" | "rejected";
  createdAt: Date;
}

export interface KoinHistory {
  id: string;
  userId: string;
  type: "topup" | "usage" | "referral" | "activation";
  amount: number;
  description: string;
  createdAt: Date;
}

export interface TrafikOrder {
  id: string;
  userId: string;
  platform: "shopee" | "tiktok";
  url: string;
  totalView: number;
  totalKoin: number;
  status: "pending" | "proses" | "complete";
  createdAt: Date;
}

export interface MateriGratis {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  createdAt: Date;
}

export interface ActivityLog {
  id: string;
  userId?: string;
  adminId?: string;
  action: string;
  details: string;
  createdAt: Date;
}

// Auth Store
interface AuthState {
  user: User | null;
  admin: Admin | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (user: User) => void;
  adminLogin: (admin: Admin) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      admin: null,
      isAuthenticated: false,
      isAdmin: false,
      login: (user) => set({ user, isAuthenticated: true, isAdmin: false }),
      adminLogin: (admin) => set({ admin, isAuthenticated: true, isAdmin: true }),
      logout: () => set({ user: null, admin: null, isAuthenticated: false, isAdmin: false }),
      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
    }),
    {
      name: "nexvora-auth",
    }
  )
);

// Data Store
interface DataState {
  users: User[];
  admins: Admin[];
  topups: TopUpKoin[];
  koinHistory: KoinHistory[];
  trafikOrders: TrafikOrder[];
  materiGratis: MateriGratis[];
  activityLogs: ActivityLog[];
  addUser: (user: User) => void;
  updateUserData: (userId: string, updates: Partial<User>) => void;
  deleteUser: (userId: string) => void;
  addAdmin: (admin: Admin) => void;
  deleteAdmin: (adminId: string) => void;
  addTopUp: (topup: TopUpKoin) => void;
  updateTopUp: (topupId: string, status: TopUpKoin["status"]) => void;
  addKoinHistory: (history: KoinHistory) => void;
  addTrafikOrder: (order: TrafikOrder) => void;
  updateTrafikOrder: (orderId: string, status: TrafikOrder["status"]) => void;
  addMateri: (materi: MateriGratis) => void;
  deleteMateri: (materiId: string) => void;
  addActivityLog: (log: ActivityLog) => void;
  cleanOldLogs: () => void;
  getUserByUsername: (username: string) => User | undefined;
  getUserById: (userId: string) => User | undefined;
  getAdminByUsername: (username: string) => Admin | undefined;
  getUserReferrals: (referralCode: string) => User[];
  getUserTrafikOrders: (userId: string) => TrafikOrder[];
  getUserKoinHistory: (userId: string) => KoinHistory[];
  hasPendingOrder: (userId: string, platform: "shopee" | "tiktok") => boolean;
}

export const useDataStore = create<DataState>()(
  persist(
    (set, get) => ({
      users: [],
      admins: [
        {
          id: "admin-1",
          username: "superadmin",
          name: "Super Admin",
          email: "admin@nexvora.com",
          role: "super_admin",
          createdAt: new Date(),
        },
      ],
      topups: [],
      koinHistory: [],
      trafikOrders: [],
      materiGratis: [
        {
          id: "materi-1",
          title: "Cara Meningkatkan Engagement Shopee",
          description: "Tutorial lengkap meningkatkan engagement di marketplace Shopee",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          thumbnail: "/placeholder-video.jpg",
          createdAt: new Date(),
        },
        {
          id: "materi-2",
          title: "Tips Viral TikTok Shop",
          description: "Strategi membuat konten viral untuk TikTok Shop",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          thumbnail: "/placeholder-video.jpg",
          createdAt: new Date(),
        },
      ],
      activityLogs: [],

      addUser: (user) => set((state) => ({ users: [...state.users, user] })),
      
      updateUserData: (userId, updates) =>
        set((state) => ({
          users: state.users.map((u) => (u.id === userId ? { ...u, ...updates } : u)),
        })),
      
      deleteUser: (userId) =>
        set((state) => ({
          users: state.users.filter((u) => u.id !== userId),
        })),
      
      addAdmin: (admin) => set((state) => ({ admins: [...state.admins, admin] })),
      
      deleteAdmin: (adminId) =>
        set((state) => ({
          admins: state.admins.filter((a) => a.id !== adminId),
        })),
      
      addTopUp: (topup) => set((state) => ({ topups: [...state.topups, topup] })),
      
      updateTopUp: (topupId, status) =>
        set((state) => ({
          topups: state.topups.map((t) => (t.id === topupId ? { ...t, status } : t)),
        })),
      
      addKoinHistory: (history) =>
        set((state) => ({ koinHistory: [...state.koinHistory, history] })),
      
      addTrafikOrder: (order) =>
        set((state) => ({ trafikOrders: [...state.trafikOrders, order] })),
      
      updateTrafikOrder: (orderId, status) =>
        set((state) => ({
          trafikOrders: state.trafikOrders.map((o) =>
            o.id === orderId ? { ...o, status } : o
          ),
        })),
      
      addMateri: (materi) =>
        set((state) => ({ materiGratis: [...state.materiGratis, materi] })),
      
      deleteMateri: (materiId) =>
        set((state) => ({
          materiGratis: state.materiGratis.filter((m) => m.id !== materiId),
        })),
      
      addActivityLog: (log) =>
        set((state) => ({ activityLogs: [...state.activityLogs, log] })),
      
      cleanOldLogs: () => {
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
        set((state) => ({
          activityLogs: state.activityLogs.filter(
            (log) => new Date(log.createdAt) > threeDaysAgo
          ),
        }));
      },
      
      getUserByUsername: (username) =>
        get().users.find((u) => u.username.toLowerCase() === username.toLowerCase()),
      
      getUserById: (userId) => get().users.find((u) => u.id === userId),
      
      getAdminByUsername: (username) =>
        get().admins.find((a) => a.username.toLowerCase() === username.toLowerCase()),
      
      getUserReferrals: (referralCode) =>
        get().users.filter((u) => u.referredBy === referralCode),
      
      getUserTrafikOrders: (userId) =>
        get().trafikOrders.filter((o) => o.userId === userId),
      
      getUserKoinHistory: (userId) =>
        get().koinHistory.filter((h) => h.userId === userId),
      
      hasPendingOrder: (userId, platform) =>
        get().trafikOrders.some(
          (o) => o.userId === userId && o.platform === platform && o.status === "pending"
        ),
    }),
    {
      name: "nexvora-data",
    }
  )
);
