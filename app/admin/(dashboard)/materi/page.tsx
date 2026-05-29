"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Video, 
  Plus, 
  Trash2, 
  Edit,
  Eye,
  Search,
  Upload
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
import { Textarea } from "@/components/ui/input";

const mockMateri = [
  { id: "1", title: "Cara Meningkatkan View Shopee Video", description: "Pelajari strategi ampuh", category: "shopee", videoUrl: "https://youtube.com/embed/xxx", views: 1250, createdAt: "2024-01-10" },
  { id: "2", title: "Optimasi Toko TikTok Shop", description: "Tips dan trik optimasi", category: "tiktok", videoUrl: "https://youtube.com/embed/yyy", views: 980, createdAt: "2024-01-08" },
  { id: "3", title: "Membuat Konten Viral", description: "Rahasia konten viral", category: "content", videoUrl: "https://youtube.com/embed/zzz", views: 2340, createdAt: "2024-01-05" },
];

const categories = [
  { value: "shopee", label: "Shopee" },
  { value: "tiktok", label: "TikTok" },
  { value: "content", label: "Konten" },
  { value: "ai", label: "AI" },
  { value: "marketing", label: "Marketing" },
  { value: "analytics", label: "Analytics" },
];

export default function AdminMateriPage() {
  const [materiList, setMateriList] = useState(mockMateri);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedMateri, setSelectedMateri] = useState<typeof mockMateri[0] | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    videoUrl: "",
  });

  const filteredMateri = materiList.filter((materi) =>
    materi.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    const newMateri = {
      id: Date.now().toString(),
      ...formData,
      views: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setMateriList([newMateri, ...materiList]);
    setShowAddDialog(false);
    setFormData({ title: "", description: "", category: "", videoUrl: "" });
  };

  const handleDelete = () => {
    if (selectedMateri) {
      setMateriList(materiList.filter((m) => m.id !== selectedMateri.id));
      setShowDeleteDialog(false);
      setSelectedMateri(null);
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
            Kelola Materi
          </h1>
          <p className="text-gray-400 mt-1">Upload dan kelola materi pembelajaran</p>
        </div>
        <Button
          className="bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90"
          onClick={() => setShowAddDialog(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah Materi
        </Button>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Cari materi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-dark-card border-white/10"
          />
        </div>
      </motion.div>

      {/* Materi List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {filteredMateri.map((materi) => (
          <Card key={materi.id} className="glass-card hover:border-white/20 transition-all">
            <CardContent className="p-4">
              <div className="aspect-video bg-dark rounded-lg mb-4 flex items-center justify-center">
                <Video className="w-12 h-12 text-gray-600" />
              </div>
              <h3 className="font-semibold text-white mb-2 line-clamp-2">{materi.title}</h3>
              <p className="text-sm text-gray-400 mb-3 line-clamp-2">{materi.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span className="capitalize px-2 py-1 rounded bg-white/10">{materi.category}</span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {materi.views}
                </span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-400 hover:bg-red-500/20"
                  onClick={() => {
                    setSelectedMateri(materi);
                    setShowDeleteDialog(true);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Add Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="bg-dark-card border-white/10">
          <DialogHeader>
            <DialogTitle>Tambah Materi Baru</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Judul Materi</Label>
              <Input
                placeholder="Masukkan judul materi"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-dark border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label>Deskripsi</Label>
              <Input
                placeholder="Masukkan deskripsi singkat"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-dark border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label>Kategori</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="bg-dark border-white/10">
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent className="bg-dark-card border-white/10">
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>URL Video (YouTube Embed)</Label>
              <Input
                placeholder="https://youtube.com/embed/..."
                value={formData.videoUrl}
                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                className="bg-dark border-white/10"
              />
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
              Tambah Materi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="bg-dark-card border-white/10">
          <DialogHeader>
            <DialogTitle className="text-red-400">Hapus Materi</DialogTitle>
          </DialogHeader>
          <p className="text-gray-400">
            Apakah Anda yakin ingin menghapus materi{" "}
            <span className="text-white font-medium">{selectedMateri?.title}</span>?
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
