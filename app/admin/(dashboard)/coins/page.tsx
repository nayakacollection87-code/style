"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Coins, 
  Search, 
  Plus,
  Minus,
  History
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useStore } from "@/lib/store";

const mockUsers = [
  { id: "1", username: "seller123", name: "Ahmad Seller", coins: 150 },
  { id: "2", username: "shop456", name: "Budi Shop", coins: 280 },
  { id: "3", username: "creator789", name: "Citra Creator", coins: 50 },
  { id: "4", username: "power_seller", name: "Eka Power", coins: 500 },
];

const coinHistory = [
  { id: "1", user: "seller123", type: "add", amount: 100, admin: "superadmin", reason: "Top up verified", date: "2024-01-15 14:30" },
  { id: "2", user: "shop456", type: "reduce", amount: 50, admin: "superadmin", reason: "Refund request", date: "2024-01-15 14:25" },
  { id: "3", user: "creator789", type: "add", amount: 25, admin: "superadmin", reason: "Referral commission", date: "2024-01-15 14:20" },
];

export default function AdminCoinsPage() {
  const { adminUser } = useStore();
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);
  const [dialogType, setDialogType] = useState<"add" | "reduce" | null>(null);
  const [coinAmount, setCoinAmount] = useState("");
  const [reason, setReason] = useState("");

  const isSuperAdmin = adminUser?.role === "super_admin";

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCoin = () => {
    if (selectedUser && coinAmount) {
      setUsers(users.map(u => 
        u.id === selectedUser.id 
          ? { ...u, coins: u.coins + parseInt(coinAmount) }
          : u
      ));
      setDialogType(null);
      setCoinAmount("");
      setReason("");
    }
  };

  const handleReduceCoin = () => {
    if (selectedUser && coinAmount) {
      setUsers(users.map(u => 
        u.id === selectedUser.id 
          ? { ...u, coins: Math.max(0, u.coins - parseInt(coinAmount)) }
          : u
      ));
      setDialogType(null);
      setCoinAmount("");
      setReason("");
    }
  };

  if (!isSuperAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="glass-card max-w-md">
          <CardContent className="p-8 text-center">
            <Coins className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Akses Ditolak</h2>
            <p className="text-gray-400">
              Hanya Super Admin yang dapat mengelola koin
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          Kelola Koin
        </h1>
        <p className="text-gray-400 mt-1">Tambah atau kurangi koin user</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-card">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                <Coins className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {users.reduce((acc, u) => acc + u.coins, 0).toLocaleString()}
                </p>
                <p className="text-sm text-gray-400">Total Koin Beredar</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Cari user..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-dark-card border-white/10"
          />
        </div>
      </motion.div>

      {/* User List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Daftar User</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">User</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Koin</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{user.username}</p>
                          <p className="text-sm text-gray-400">{user.name}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-yellow-400 font-semibold">{user.coins}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-green-500 hover:bg-green-600"
                            onClick={() => {
                              setSelectedUser(user);
                              setDialogType("add");
                            }}
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Tambah
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-yellow-400 border-yellow-400 hover:bg-yellow-500/20"
                            onClick={() => {
                              setSelectedUser(user);
                              setDialogType("reduce");
                            }}
                          >
                            <Minus className="w-4 h-4 mr-1" />
                            Kurangi
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="w-5 h-5 text-neon-purple" />
              Riwayat Perubahan Koin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">User</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Tipe</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Jumlah</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Admin</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Alasan</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Waktu</th>
                  </tr>
                </thead>
                <tbody>
                  {coinHistory.map((item) => (
                    <tr key={item.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-4 font-medium">{item.user}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.type === "add" 
                            ? "bg-green-500/20 text-green-400" 
                            : "bg-red-500/20 text-red-400"
                        }`}>
                          {item.type === "add" ? "Tambah" : "Kurangi"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={item.type === "add" ? "text-green-400" : "text-red-400"}>
                          {item.type === "add" ? "+" : "-"}{item.amount}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-400">{item.admin}</td>
                      <td className="py-3 px-4 text-gray-400">{item.reason}</td>
                      <td className="py-3 px-4 text-gray-400 text-sm">{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Add Coin Dialog */}
      <Dialog open={dialogType === "add"} onOpenChange={() => setDialogType(null)}>
        <DialogContent className="bg-dark-card border-white/10">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-green-400" />
              Tambah Koin
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-400">
              Tambah koin untuk <span className="text-white font-medium">{selectedUser?.username}</span>
            </p>
            <p className="text-sm text-gray-500">
              Koin saat ini: <span className="text-yellow-400">{selectedUser?.coins}</span>
            </p>
            <div className="space-y-2">
              <Label>Jumlah Koin</Label>
              <Input
                type="number"
                placeholder="Masukkan jumlah koin"
                value={coinAmount}
                onChange={(e) => setCoinAmount(e.target.value)}
                className="bg-dark border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label>Alasan</Label>
              <Input
                placeholder="Masukkan alasan"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="bg-dark border-white/10"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDialogType(null)}>
              Batal
            </Button>
            <Button 
              className="bg-green-500 hover:bg-green-600"
              onClick={handleAddCoin}
            >
              Tambah Koin
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reduce Coin Dialog */}
      <Dialog open={dialogType === "reduce"} onOpenChange={() => setDialogType(null)}>
        <DialogContent className="bg-dark-card border-white/10">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Minus className="w-5 h-5 text-yellow-400" />
              Kurangi Koin
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-400">
              Kurangi koin dari <span className="text-white font-medium">{selectedUser?.username}</span>
            </p>
            <p className="text-sm text-gray-500">
              Koin saat ini: <span className="text-yellow-400">{selectedUser?.coins}</span>
            </p>
            <div className="space-y-2">
              <Label>Jumlah Koin</Label>
              <Input
                type="number"
                placeholder="Masukkan jumlah koin"
                value={coinAmount}
                onChange={(e) => setCoinAmount(e.target.value)}
                className="bg-dark border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label>Alasan</Label>
              <Input
                placeholder="Masukkan alasan"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="bg-dark border-white/10"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDialogType(null)}>
              Batal
            </Button>
            <Button 
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
              onClick={handleReduceCoin}
            >
              Kurangi Koin
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
