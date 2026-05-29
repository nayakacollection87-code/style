"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  TrendingUp, 
  Search, 
  Filter,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  ExternalLink
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const mockOrders = [
  { id: "1", user: "seller123", platform: "shopee", url: "https://shopee.co.id/video/123", views: 5000, coins: 5, status: "pending", date: "2024-01-15" },
  { id: "2", user: "shop456", platform: "tiktok", url: "https://tiktok.com/@shop456/video/456", views: 10000, coins: 10, status: "proses", date: "2024-01-15" },
  { id: "3", user: "creator789", platform: "shopee", url: "https://shopee.co.id/video/789", views: 3000, coins: 3, status: "complete", date: "2024-01-14" },
  { id: "4", user: "newuser001", platform: "tiktok", url: "https://tiktok.com/@newuser/video/001", views: 8000, coins: 8, status: "proses", date: "2024-01-14" },
  { id: "5", user: "power_seller", platform: "shopee", url: "https://shopee.co.id/video/999", views: 15000, coins: 15, status: "pending", date: "2024-01-13" },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(mockOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<typeof mockOrders[0] | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const filteredOrders = orders.filter((order) => {
    const matchSearch = 
      order.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.url.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === "all" || order.status === statusFilter;
    const matchPlatform = platformFilter === "all" || order.platform === platformFilter;
    return matchSearch && matchStatus && matchPlatform;
  });

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(o => 
      o.id === orderId ? { ...o, status: newStatus } : o
    ));
    setShowDialog(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case "proses":
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Proses
          </span>
        );
      case "complete":
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Complete
          </span>
        );
      default:
        return null;
    }
  };

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    proses: orders.filter(o => o.status === "proses").length,
    complete: orders.filter(o => o.status === "complete").length,
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          Order Trafik
        </h1>
        <p className="text-gray-400 mt-1">Kelola semua order trafik marketplace</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Order", value: stats.total, color: "from-blue-500 to-cyan-500" },
          { label: "Pending", value: stats.pending, color: "from-yellow-500 to-orange-500" },
          { label: "Proses", value: stats.proses, color: "from-purple-500 to-pink-500" },
          { label: "Complete", value: stats.complete, color: "from-green-500 to-emerald-500" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-card">
              <CardContent className="p-4">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-gray-400">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Cari user atau URL..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-dark-card border-white/10"
          />
        </div>
        <Select value={platformFilter} onValueChange={setPlatformFilter}>
          <SelectTrigger className="w-full sm:w-40 bg-dark-card border-white/10">
            <SelectValue placeholder="Platform" />
          </SelectTrigger>
          <SelectContent className="bg-dark-card border-white/10">
            <SelectItem value="all">Semua Platform</SelectItem>
            <SelectItem value="shopee">Shopee</SelectItem>
            <SelectItem value="tiktok">TikTok</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40 bg-dark-card border-white/10">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-dark-card border-white/10">
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="proses">Proses</SelectItem>
            <SelectItem value="complete">Complete</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="glass-card">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">No</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">User</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">Platform</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">URL</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">Views</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">Koin</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">Status</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => (
                    <tr key={order.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-4 px-4">{index + 1}</td>
                      <td className="py-4 px-4 font-medium">{order.user}</td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium uppercase ${
                          order.platform === "shopee" 
                            ? "bg-orange-500/20 text-orange-400" 
                            : "bg-pink-500/20 text-pink-400"
                        }`}>
                          {order.platform}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <a 
                          href={order.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-neon-blue hover:underline flex items-center gap-1 max-w-[200px] truncate"
                        >
                          {order.url}
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      </td>
                      <td className="py-4 px-4">{order.views.toLocaleString()}</td>
                      <td className="py-4 px-4 text-yellow-400">{order.coins}</td>
                      <td className="py-4 px-4">{getStatusBadge(order.status)}</td>
                      <td className="py-4 px-4">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover:bg-blue-500/20 hover:text-blue-400"
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowDialog(true);
                          }}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Detail
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Order Detail Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-dark-card border-white/10">
          <DialogHeader>
            <DialogTitle>Detail Order</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">User</p>
                  <p className="font-medium">{selectedOrder.user}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Platform</p>
                  <p className="font-medium capitalize">{selectedOrder.platform}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Views</p>
                  <p className="font-medium">{selectedOrder.views.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Koin Terpakai</p>
                  <p className="font-medium text-yellow-400">{selectedOrder.coins}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Status</p>
                  {getStatusBadge(selectedOrder.status)}
                </div>
                <div>
                  <p className="text-sm text-gray-400">Tanggal</p>
                  <p className="font-medium">{selectedOrder.date}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">URL</p>
                <a 
                  href={selectedOrder.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-neon-blue hover:underline break-all"
                >
                  {selectedOrder.url}
                </a>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-sm text-gray-400 mb-3">Update Status</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={selectedOrder.status === "pending" ? "default" : "outline"}
                    className={selectedOrder.status === "pending" ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                    onClick={() => handleUpdateStatus(selectedOrder.id, "pending")}
                  >
                    Pending
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedOrder.status === "proses" ? "default" : "outline"}
                    className={selectedOrder.status === "proses" ? "bg-blue-500 hover:bg-blue-600" : ""}
                    onClick={() => handleUpdateStatus(selectedOrder.id, "proses")}
                  >
                    Proses
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedOrder.status === "complete" ? "default" : "outline"}
                    className={selectedOrder.status === "complete" ? "bg-green-500 hover:bg-green-600" : ""}
                    onClick={() => handleUpdateStatus(selectedOrder.id, "complete")}
                  >
                    Complete
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
