"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Coins, 
  TrendingUp, 
  ShoppingCart,
  UserPlus,
  DollarSign,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

const stats = [
  {
    title: "Total User",
    value: "1,234",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "User Aktif",
    value: "892",
    change: "+8%",
    trend: "up",
    icon: UserPlus,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Total Koin Terjual",
    value: "45,678",
    change: "+23%",
    trend: "up",
    icon: Coins,
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "Pendapatan",
    value: "Rp 12.5M",
    change: "+18%",
    trend: "up",
    icon: DollarSign,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Order Trafik",
    value: "567",
    change: "+5%",
    trend: "up",
    icon: TrendingUp,
    color: "from-red-500 to-rose-500",
  },
  {
    title: "Order Pending",
    value: "23",
    change: "-15%",
    trend: "down",
    icon: ShoppingCart,
    color: "from-indigo-500 to-violet-500",
  },
];

const recentActivities = [
  { id: 1, type: "user", message: "User baru 'seller123' mendaftar", time: "2 menit lalu" },
  { id: 2, type: "coin", message: "Top up 100 koin oleh 'shop456' diverifikasi", time: "5 menit lalu" },
  { id: 3, type: "order", message: "Order trafik Shopee #1234 selesai", time: "10 menit lalu" },
  { id: 4, type: "user", message: "User 'creator789' melakukan aktivasi", time: "15 menit lalu" },
  { id: 5, type: "coin", message: "Top up 500 koin oleh 'newuser' menunggu verifikasi", time: "20 menit lalu" },
];

const recentOrders = [
  { id: 1, user: "seller123", type: "Shopee", views: 5000, status: "pending" },
  { id: 2, user: "shop456", type: "TikTok", views: 10000, status: "proses" },
  { id: 3, user: "creator789", type: "Shopee", views: 3000, status: "complete" },
  { id: 4, user: "newuser", type: "TikTok", views: 8000, status: "proses" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <p className="text-gray-400 mt-1">Selamat datang di panel administrasi Nexvora Studio</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-card hover:border-white/20 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="w-4 h-4 text-green-400" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-400" />
                      )}
                      <span className={stat.trend === "up" ? "text-green-400" : "text-red-400"}>
                        {stat.change}
                      </span>
                      <span className="text-gray-500 text-sm">dari bulan lalu</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-card h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-red-400" />
                Aktivitas Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === "user" ? "bg-blue-400" :
                      activity.type === "coin" ? "bg-yellow-400" : "bg-green-400"
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm text-white">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-card h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-orange-400" />
                Order Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 text-gray-400 font-medium text-sm">User</th>
                      <th className="text-left py-2 text-gray-400 font-medium text-sm">Platform</th>
                      <th className="text-left py-2 text-gray-400 font-medium text-sm">Views</th>
                      <th className="text-left py-2 text-gray-400 font-medium text-sm">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="py-3 text-sm">{order.user}</td>
                        <td className="py-3 text-sm">{order.type}</td>
                        <td className="py-3 text-sm">{order.views.toLocaleString()}</td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              order.status === "complete"
                                ? "bg-green-500/20 text-green-400"
                                : order.status === "proses"
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
