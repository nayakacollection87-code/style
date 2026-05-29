"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  History, 
  Search, 
  Filter,
  User,
  Coins,
  ShoppingCart,
  LogIn,
  Trash2
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockLogs = [
  { id: "1", type: "login", user: "seller123", action: "User login", ip: "192.168.1.1", timestamp: "2024-01-15 14:30:00" },
  { id: "2", type: "coin", user: "admin", action: "Tambah 100 koin ke shop456", ip: "192.168.1.2", timestamp: "2024-01-15 14:25:00" },
  { id: "3", type: "order", user: "creator789", action: "Order trafik Shopee 5000 views", ip: "192.168.1.3", timestamp: "2024-01-15 14:20:00" },
  { id: "4", type: "register", user: "newuser001", action: "User baru mendaftar", ip: "192.168.1.4", timestamp: "2024-01-15 14:15:00" },
  { id: "5", type: "topup", user: "power_seller", action: "Top up 500 koin diverifikasi", ip: "192.168.1.5", timestamp: "2024-01-15 14:10:00" },
  { id: "6", type: "login", user: "admin", action: "Admin login", ip: "192.168.1.6", timestamp: "2024-01-15 14:05:00" },
  { id: "7", type: "delete", user: "admin", action: "Hapus user test123", ip: "192.168.1.7", timestamp: "2024-01-15 14:00:00" },
  { id: "8", type: "order", user: "shop456", action: "Order trafik TikTok 10000 views", ip: "192.168.1.8", timestamp: "2024-01-15 13:55:00" },
];

const getLogIcon = (type: string) => {
  switch (type) {
    case "login":
      return <LogIn className="w-4 h-4" />;
    case "coin":
    case "topup":
      return <Coins className="w-4 h-4" />;
    case "order":
      return <ShoppingCart className="w-4 h-4" />;
    case "register":
      return <User className="w-4 h-4" />;
    case "delete":
      return <Trash2 className="w-4 h-4" />;
    default:
      return <History className="w-4 h-4" />;
  }
};

const getLogColor = (type: string) => {
  switch (type) {
    case "login":
      return "bg-blue-500/20 text-blue-400";
    case "coin":
    case "topup":
      return "bg-yellow-500/20 text-yellow-400";
    case "order":
      return "bg-green-500/20 text-green-400";
    case "register":
      return "bg-purple-500/20 text-purple-400";
    case "delete":
      return "bg-red-500/20 text-red-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
};

export default function AdminLogsPage() {
  const [logs] = useState(mockLogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredLogs = logs.filter((log) => {
    const matchSearch = 
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = typeFilter === "all" || log.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          Log Aktivitas
        </h1>
        <p className="text-gray-400 mt-1">Pantau semua aktivitas user dan admin (auto delete setelah 3 hari)</p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Cari user atau aktivitas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-dark-card border-white/10"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-48 bg-dark-card border-white/10">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Tipe" />
          </SelectTrigger>
          <SelectContent className="bg-dark-card border-white/10">
            <SelectItem value="all">Semua Tipe</SelectItem>
            <SelectItem value="login">Login</SelectItem>
            <SelectItem value="register">Register</SelectItem>
            <SelectItem value="coin">Koin</SelectItem>
            <SelectItem value="topup">Top Up</SelectItem>
            <SelectItem value="order">Order</SelectItem>
            <SelectItem value="delete">Delete</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Log", value: logs.length, color: "from-blue-500 to-cyan-500" },
          { label: "Login Hari Ini", value: logs.filter(l => l.type === "login").length, color: "from-green-500 to-emerald-500" },
          { label: "Order Hari Ini", value: logs.filter(l => l.type === "order").length, color: "from-purple-500 to-pink-500" },
          { label: "User Baru", value: logs.filter(l => l.type === "register").length, color: "from-orange-500 to-red-500" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
          >
            <Card className="glass-card">
              <CardContent className="p-4">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                  <History className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-gray-400">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Logs Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="w-5 h-5 text-red-400" />
              Riwayat Aktivitas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Tipe</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">User</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Aktivitas</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">IP Address</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Waktu</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getLogColor(log.type)}`}>
                          {getLogIcon(log.type)}
                          {log.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium">{log.user}</td>
                      <td className="py-3 px-4 text-gray-300">{log.action}</td>
                      <td className="py-3 px-4 text-gray-400 font-mono text-sm">{log.ip}</td>
                      <td className="py-3 px-4 text-gray-400 text-sm">{log.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
