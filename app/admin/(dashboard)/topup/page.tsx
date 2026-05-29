"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Package, 
  Search, 
  Filter,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  Image as ImageIcon
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

const mockTopups = [
  { id: "1", user: "seller123", package: "100 Koin", amount: 100000, status: "pending", proof: "/proof1.jpg", date: "2024-01-15" },
  { id: "2", user: "shop456", package: "250 Koin", amount: 250000, status: "verified", proof: "/proof2.jpg", date: "2024-01-14" },
  { id: "3", user: "creator789", package: "50 Koin", amount: 50000, status: "pending", proof: "/proof3.jpg", date: "2024-01-14" },
  { id: "4", user: "newuser001", package: "500 Koin", amount: 500000, status: "rejected", proof: "/proof4.jpg", date: "2024-01-13" },
  { id: "5", user: "power_seller", package: "1000 Koin", amount: 1000000, status: "verified", proof: "/proof5.jpg", date: "2024-01-12" },
];

export default function AdminTopupPage() {
  const [topups, setTopups] = useState(mockTopups);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTopup, setSelectedTopup] = useState<typeof mockTopups[0] | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const filteredTopups = topups.filter((topup) => {
    const matchSearch = topup.user.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === "all" || topup.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleUpdateStatus = (topupId: string, newStatus: string) => {
    setTopups(topups.map(t => 
      t.id === topupId ? { ...t, status: newStatus } : t
    ));
    setShowDialog(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
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
      case "verified":
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Verified
          </span>
        );
      case "rejected":
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400 flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  const stats = {
    total: topups.length,
    pending: topups.filter(t => t.status === "pending").length,
    verified: topups.filter(t => t.status === "verified").length,
    rejected: topups.filter(t => t.status === "rejected").length,
    totalAmount: topups.filter(t => t.status === "verified").reduce((acc, t) => acc + t.amount, 0),
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          Verifikasi Top Up
        </h1>
        <p className="text-gray-400 mt-1">Verifikasi pembayaran top up koin</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Total Request", value: stats.total, color: "from-blue-500 to-cyan-500" },
          { label: "Pending", value: stats.pending, color: "from-yellow-500 to-orange-500" },
          { label: "Verified", value: stats.verified, color: "from-green-500 to-emerald-500" },
          { label: "Rejected", value: stats.rejected, color: "from-red-500 to-rose-500" },
          { label: "Total Verified", value: formatPrice(stats.totalAmount), color: "from-purple-500 to-pink-500", isPrice: true },
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
                  <Package className="w-5 h-5 text-white" />
                </div>
                <p className={`font-bold text-white ${stat.isPrice ? 'text-lg' : 'text-2xl'}`}>{stat.value}</p>
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
            placeholder="Cari user..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-dark-card border-white/10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40 bg-dark-card border-white/10">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-dark-card border-white/10">
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Topup Table */}
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
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">Paket</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">Nominal</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">Status</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">Tanggal</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTopups.map((topup, index) => (
                    <tr key={topup.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-4 px-4">{index + 1}</td>
                      <td className="py-4 px-4 font-medium">{topup.user}</td>
                      <td className="py-4 px-4">{topup.package}</td>
                      <td className="py-4 px-4 text-yellow-400">{formatPrice(topup.amount)}</td>
                      <td className="py-4 px-4">{getStatusBadge(topup.status)}</td>
                      <td className="py-4 px-4 text-gray-400">{topup.date}</td>
                      <td className="py-4 px-4">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover:bg-blue-500/20 hover:text-blue-400"
                          onClick={() => {
                            setSelectedTopup(topup);
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

      {/* Detail Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-dark-card border-white/10 max-w-lg">
          <DialogHeader>
            <DialogTitle>Detail Top Up</DialogTitle>
          </DialogHeader>
          {selectedTopup && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">User</p>
                  <p className="font-medium">{selectedTopup.user}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Paket</p>
                  <p className="font-medium">{selectedTopup.package}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Nominal</p>
                  <p className="font-medium text-yellow-400">{formatPrice(selectedTopup.amount)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Tanggal</p>
                  <p className="font-medium">{selectedTopup.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Status</p>
                  {getStatusBadge(selectedTopup.status)}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-2">Bukti Transfer</p>
                <div className="aspect-video bg-dark rounded-lg flex items-center justify-center border border-white/10">
                  <ImageIcon className="w-12 h-12 text-gray-600" />
                </div>
              </div>

              {selectedTopup.status === "pending" && (
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-gray-400 mb-3">Verifikasi Pembayaran</p>
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-green-500 hover:bg-green-600"
                      onClick={() => handleUpdateStatus(selectedTopup.id, "verified")}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Verifikasi
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 text-red-400 border-red-400 hover:bg-red-500/20"
                      onClick={() => handleUpdateStatus(selectedTopup.id, "rejected")}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Tolak
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
