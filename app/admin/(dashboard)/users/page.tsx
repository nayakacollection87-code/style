"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Search, 
  Plus,
  Minus,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Filter,
  MoreHorizontal,
  Coins,
  History
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useStore } from "@/lib/store";

const mockUsers = [
  { id: "1", username: "seller123", name: "Ahmad Seller", email: "ahmad@mail.com", phone: "081234567890", coins: 150, status: "active", referralCode: "SEL123", joinDate: "2024-01-01" },
  { id: "2", username: "shop456", name: "Budi Shop", email: "budi@mail.com", phone: "081234567891", coins: 280, status: "active", referralCode: "SHP456", joinDate: "2024-01-03" },
  { id: "3", username: "creator789", name: "Citra Creator", email: "citra@mail.com", phone: "081234567892", coins: 50, status: "pending", referralCode: "CRT789", joinDate: "2024-01-05" },
  { id: "4", username: "newuser001", name: "Dedi User", email: "dedi@mail.com", phone: "081234567893", coins: 0, status: "pending", referralCode: "NEW001", joinDate: "2024-01-07" },
  { id: "5", username: "power_seller", name: "Eka Power", email: "eka@mail.com", phone: "081234567894", coins: 500, status: "active", referralCode: "PWR001", joinDate: "2024-01-10" },
];

export default function AdminUsersPage() {
  const { adminUser } = useStore();
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);
  const [dialogType, setDialogType] = useState<"view" | "add_coin" | "reduce_coin" | "delete" | null>(null);
  const [coinAmount, setCoinAmount] = useState("");

  const isSuperAdmin = adminUser?.role === "super_admin";

  const filteredUsers = users.filter((user) => {
    const matchSearch = 
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === "all" || user.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleAddCoin = () => {
    if (selectedUser && coinAmount) {
      setUsers(users.map(u => 
        u.id === selectedUser.id 
          ? { ...u, coins: u.coins + parseInt(coinAmount) }
          : u
      ));
      setDialogType(null);
      setCoinAmount("");
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
    }
  };

  const handleDelete = () => {
    if (selectedUser) {
      setUsers(users.filter(u => u.id !== selectedUser.id));
      setDialogType(null);
    }
  };

  const handleActivate = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, status: "active" } : u
    ));
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Kelola User
          </h1>
          <p className="text-gray-400 mt-1">Kelola semua pengguna platform</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Total:</span>
          <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 font-medium">
            {users.length} User
          </span>
        </div>
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
            placeholder="Cari username, nama, atau email..."
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
            <SelectItem value="all">Semua</SelectItem>
            <SelectItem value="active">Aktif</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="glass-card">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">User</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">Kontak</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">Koin</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">Status</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">Referral</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-white">{user.username}</p>
                          <p className="text-sm text-gray-400">{user.name}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-sm text-white">{user.email}</p>
                          <p className="text-sm text-gray-400">{user.phone}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium text-yellow-400">{user.coins}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.status === "active"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {user.status === "active" ? "Aktif" : "Pending"}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-400">{user.referralCode}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="hover:bg-blue-500/20 hover:text-blue-400"
                            onClick={() => {
                              setSelectedUser(user);
                              setDialogType("view");
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {isSuperAdmin && (
                            <>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="hover:bg-green-500/20 hover:text-green-400"
                                onClick={() => {
                                  setSelectedUser(user);
                                  setDialogType("add_coin");
                                }}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="hover:bg-yellow-500/20 hover:text-yellow-400"
                                onClick={() => {
                                  setSelectedUser(user);
                                  setDialogType("reduce_coin");
                                }}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              {user.status === "pending" && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="hover:bg-green-500/20 hover:text-green-400"
                                  onClick={() => handleActivate(user.id)}
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                className="hover:bg-red-500/20 hover:text-red-400"
                                onClick={() => {
                                  setSelectedUser(user);
                                  setDialogType("delete");
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </>
                          )}
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

      {/* View User Dialog */}
      <Dialog open={dialogType === "view"} onOpenChange={() => setDialogType(null)}>
        <DialogContent className="bg-dark-card border-white/10">
          <DialogHeader>
            <DialogTitle>Detail User</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Username</p>
                  <p className="font-medium">{selectedUser.username}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Nama</p>
                  <p className="font-medium">{selectedUser.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="font-medium">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Telepon</p>
                  <p className="font-medium">{selectedUser.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Koin</p>
                  <p className="font-medium text-yellow-400">{selectedUser.coins}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Status</p>
                  <p className="font-medium capitalize">{selectedUser.status}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Kode Referral</p>
                  <p className="font-medium">{selectedUser.referralCode}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Tanggal Daftar</p>
                  <p className="font-medium">{selectedUser.joinDate}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Coin Dialog */}
      <Dialog open={dialogType === "add_coin"} onOpenChange={() => setDialogType(null)}>
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
      <Dialog open={dialogType === "reduce_coin"} onOpenChange={() => setDialogType(null)}>
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

      {/* Delete User Dialog */}
      <Dialog open={dialogType === "delete"} onOpenChange={() => setDialogType(null)}>
        <DialogContent className="bg-dark-card border-white/10">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-400">
              <Trash2 className="w-5 h-5" />
              Hapus User
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-400">
              Apakah Anda yakin ingin menghapus user{" "}
              <span className="text-white font-medium">{selectedUser?.username}</span>?
            </p>
            <p className="text-sm text-red-400">
              Tindakan ini tidak dapat dibatalkan.
            </p>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDialogType(null)}>
              Batal
            </Button>
            <Button 
              className="bg-red-500 hover:bg-red-600"
              onClick={handleDelete}
            >
              Hapus User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
