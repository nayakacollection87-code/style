"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  UserCog, 
  Plus, 
  Trash2, 
  Shield,
  User,
  Search
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
import { useStore } from "@/lib/store";

const mockAdmins = [
  { id: "1", username: "superadmin", role: "super_admin", createdAt: "2024-01-01" },
  { id: "2", username: "assistant1", role: "assistant_admin", createdAt: "2024-01-05" },
  { id: "3", username: "assistant2", role: "assistant_admin", createdAt: "2024-01-10" },
];

export default function ManageAdminPage() {
  const { adminUser } = useStore();
  const [admins, setAdmins] = useState(mockAdmins);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<typeof mockAdmins[0] | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "assistant_admin",
  });

  const isSuperAdmin = adminUser?.role === "super_admin";

  if (!isSuperAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="glass-card max-w-md">
          <CardContent className="p-8 text-center">
            <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Akses Ditolak</h2>
            <p className="text-gray-400">
              Hanya Super Admin yang dapat mengakses halaman ini
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleAdd = () => {
    const newAdmin = {
      id: Date.now().toString(),
      username: formData.username,
      role: formData.role,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setAdmins([...admins, newAdmin]);
    setShowAddDialog(false);
    setFormData({ username: "", password: "", role: "assistant_admin" });
  };

  const handleDelete = () => {
    if (selectedAdmin && selectedAdmin.role !== "super_admin") {
      setAdmins(admins.filter((a) => a.id !== selectedAdmin.id));
      setShowDeleteDialog(false);
      setSelectedAdmin(null);
    }
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
            Kelola Admin
          </h1>
          <p className="text-gray-400 mt-1">Kelola akun admin dan assistant</p>
        </div>
        <Button
          className="bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90"
          onClick={() => setShowAddDialog(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah Admin
        </Button>
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
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                <UserCog className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{admins.length}</p>
                <p className="text-sm text-gray-400">Total Admin</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {admins.filter((a) => a.role === "super_admin").length}
                </p>
                <p className="text-sm text-gray-400">Super Admin</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-card">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {admins.filter((a) => a.role === "assistant_admin").length}
                </p>
                <p className="text-sm text-gray-400">Assistant Admin</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Admin List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Daftar Admin</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">No</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Username</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Role</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Dibuat</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin, index) => (
                    <tr key={admin.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4 font-medium">{admin.username}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            admin.role === "super_admin"
                              ? "bg-purple-500/20 text-purple-400"
                              : "bg-blue-500/20 text-blue-400"
                          }`}
                        >
                          {admin.role === "super_admin" ? "Super Admin" : "Assistant"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-400">{admin.createdAt}</td>
                      <td className="py-3 px-4">
                        {admin.role !== "super_admin" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-400 hover:bg-red-500/20"
                            onClick={() => {
                              setSelectedAdmin(admin);
                              setShowDeleteDialog(true);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Add Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="bg-dark-card border-white/10">
          <DialogHeader>
            <DialogTitle>Tambah Admin Baru</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Username</Label>
              <Input
                placeholder="Masukkan username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="bg-dark border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Masukkan password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-dark border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger className="bg-dark border-white/10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-dark-card border-white/10">
                  <SelectItem value="assistant_admin">Assistant Admin</SelectItem>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowAddDialog(false)}>
              Batal
            </Button>
            <Button
              className="bg-gradient-to-r from-red-500 to-orange-500"
              onClick={handleAdd}
            >
              Tambah Admin
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="bg-dark-card border-white/10">
          <DialogHeader>
            <DialogTitle className="text-red-400">Hapus Admin</DialogTitle>
          </DialogHeader>
          <p className="text-gray-400">
            Apakah Anda yakin ingin menghapus admin{" "}
            <span className="text-white font-medium">{selectedAdmin?.username}</span>?
          </p>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowDeleteDialog(false)}>
              Batal
            </Button>
            <Button className="bg-red-500 hover:bg-red-600" onClick={handleDelete}>
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
