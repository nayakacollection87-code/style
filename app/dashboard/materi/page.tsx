"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Play, 
  Search, 
  BookOpen, 
  Clock, 
  Eye,
  Filter
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
} from "@/components/ui/dialog";

const materiList = [
  {
    id: 1,
    title: "Cara Meningkatkan View Shopee Video",
    description: "Pelajari strategi ampuh untuk meningkatkan view video di Shopee",
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=225&fit=crop",
    duration: "15:32",
    views: 1250,
    category: "shopee",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 2,
    title: "Optimasi Toko TikTok Shop",
    description: "Tips dan trik untuk mengoptimalkan toko TikTok Shop Anda",
    thumbnail: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=400&h=225&fit=crop",
    duration: "20:15",
    views: 980,
    category: "tiktok",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 3,
    title: "Membuat Konten Viral",
    description: "Rahasia membuat konten yang viral di marketplace",
    thumbnail: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=400&h=225&fit=crop",
    duration: "12:45",
    views: 2340,
    category: "content",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 4,
    title: "AI Creator untuk Pemula",
    description: "Panduan lengkap menggunakan fitur AI Creator",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop",
    duration: "25:00",
    views: 1567,
    category: "ai",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 5,
    title: "Strategi Referral Marketing",
    description: "Maksimalkan penghasilan dengan sistem referral",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop",
    duration: "18:20",
    views: 890,
    category: "marketing",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 6,
    title: "Analisis Trend Produk",
    description: "Cara membaca dan memanfaatkan data trend produk",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop",
    duration: "22:10",
    views: 1123,
    category: "analytics",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

const categories = [
  { value: "all", label: "Semua Kategori" },
  { value: "shopee", label: "Shopee" },
  { value: "tiktok", label: "TikTok" },
  { value: "content", label: "Konten" },
  { value: "ai", label: "AI" },
  { value: "marketing", label: "Marketing" },
  { value: "analytics", label: "Analytics" },
];

export default function MateriPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState<typeof materiList[0] | null>(null);

  const filteredMateri = materiList.filter((materi) => {
    const matchSearch = materi.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      materi.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = selectedCategory === "all" || materi.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
          Materi Gratis
        </h1>
        <p className="text-gray-400 mt-1">Akses materi pembelajaran untuk mengembangkan bisnis Anda</p>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Cari materi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-dark-card border-white/10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48 bg-dark-card border-white/10">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Kategori" />
          </SelectTrigger>
          <SelectContent className="bg-dark-card border-white/10">
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <Card className="glass-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-neon-blue/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-neon-blue" />
            </div>
            <div>
              <p className="text-2xl font-bold">{materiList.length}</p>
              <p className="text-xs text-gray-400">Total Materi</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-neon-purple/20 flex items-center justify-center">
              <Eye className="w-5 h-5 text-neon-purple" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {materiList.reduce((acc, m) => acc + m.views, 0).toLocaleString()}
              </p>
              <p className="text-xs text-gray-400">Total Views</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">2h 15m</p>
              <p className="text-xs text-gray-400">Total Durasi</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <Play className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{categories.length - 1}</p>
              <p className="text-xs text-gray-400">Kategori</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMateri.map((materi, index) => (
          <motion.div
            key={materi.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card className="glass-card overflow-hidden group cursor-pointer hover:border-neon-blue/50 transition-all duration-300">
              <div className="relative">
                <img
                  src={materi.thumbnail}
                  alt={materi.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    size="lg"
                    className="bg-neon-blue/90 hover:bg-neon-blue rounded-full w-14 h-14"
                    onClick={() => setSelectedVideo(materi)}
                  >
                    <Play className="w-6 h-6 fill-white" />
                  </Button>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/70 text-white text-xs">
                  {materi.duration}
                </div>
                <div className="absolute top-2 left-2 px-2 py-1 rounded bg-neon-purple/80 text-white text-xs capitalize">
                  {materi.category}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-neon-blue transition-colors">
                  {materi.title}
                </h3>
                <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                  {materi.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {materi.views.toLocaleString()} views
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {materi.duration}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredMateri.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">
            Tidak ada materi ditemukan
          </h3>
          <p className="text-gray-500">
            Coba ubah filter atau kata kunci pencarian
          </p>
        </motion.div>
      )}

      {/* Video Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl bg-dark-card border-white/10">
          <DialogHeader>
            <DialogTitle>{selectedVideo?.title}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video">
            <iframe
              src={selectedVideo?.videoUrl}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="text-gray-400">{selectedVideo?.description}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
