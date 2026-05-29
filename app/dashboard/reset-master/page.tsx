"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  RefreshCcw, 
  ShoppingBag, 
  Video,
  Radio,
  TrendingUp,
  Eye,
  ExternalLink,
  Filter,
  Search
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  { value: "all", label: "Semua Kategori" },
  { value: "fashion", label: "Fashion" },
  { value: "elektronik", label: "Elektronik" },
  { value: "kecantikan", label: "Kecantikan" },
  { value: "makanan", label: "Makanan & Minuman" },
  { value: "rumah", label: "Rumah Tangga" },
];

const mockProducts = [
  {
    id: 1,
    name: "Skincare Set Viral",
    image: "https://picsum.photos/seed/prod1/200/200",
    trendScore: 98,
    category: "kecantikan",
  },
  {
    id: 2,
    name: "Kaos Oversize Premium",
    image: "https://picsum.photos/seed/prod2/200/200",
    trendScore: 95,
    category: "fashion",
  },
  {
    id: 3,
    name: "TWS Earbuds Pro",
    image: "https://picsum.photos/seed/prod3/200/200",
    trendScore: 92,
    category: "elektronik",
  },
  {
    id: 4,
    name: "Snack Korea Viral",
    image: "https://picsum.photos/seed/prod4/200/200",
    trendScore: 89,
    category: "makanan",
  },
  {
    id: 5,
    name: "Organizer Makeup",
    image: "https://picsum.photos/seed/prod5/200/200",
    trendScore: 87,
    category: "rumah",
  },
  {
    id: 6,
    name: "Hoodie Aesthetic",
    image: "https://picsum.photos/seed/prod6/200/200",
    trendScore: 85,
    category: "fashion",
  },
];

export default function ResetMasterPage() {
  const [activeTab, setActiveTab] = useState("shopee");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filteredProducts = mockProducts.filter((product) => {
    const matchCategory = category === "all" || product.category === category;
    const matchSearch = product.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="p-4 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#EC4899]/20 to-[#F59E0B]/20 flex items-center justify-center">
              <RefreshCcw className="w-5 h-5 text-[#EC4899]" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Reset Master</h1>
          </div>
          <p className="text-muted-foreground">
            Temukan produk trending di marketplace untuk inspirasi bisnis Anda
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 gap-2 h-auto p-2 bg-muted/30">
            <TabsTrigger value="shopee" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00D4FF] data-[state=active]:to-[#A855F7]">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Trend Shopee
            </TabsTrigger>
            <TabsTrigger value="shopee-video" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00D4FF] data-[state=active]:to-[#A855F7]">
              <Video className="w-4 h-4 mr-2" />
              Shopee Video
            </TabsTrigger>
            <TabsTrigger value="live" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00D4FF] data-[state=active]:to-[#A855F7]">
              <Radio className="w-4 h-4 mr-2" />
              Trend Live
            </TabsTrigger>
          </TabsList>

          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari produk..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content */}
          <TabsContent value="shopee" className="mt-0">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="group hover:border-[#00D4FF]/30 transition-all duration-300 overflow-hidden">
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-2 right-2">
                        <span className="px-2 py-1 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#A855F7] text-white text-xs font-medium flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {product.trendScore}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button size="sm" variant="outline" className="text-white border-white hover:bg-white/20">
                          <Eye className="w-4 h-4 mr-1" />
                          Preview
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-foreground text-sm truncate mb-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground capitalize">
                          {product.category}
                        </span>
                        <Button size="icon" variant="ghost" className="w-8 h-8">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shopee-video" className="mt-0">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="group hover:border-[#00D4FF]/30 transition-all duration-300 overflow-hidden">
                    <div className="aspect-[9/16] relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute top-2 right-2">
                        <span className="px-2 py-1 rounded-full bg-red-500 text-white text-xs font-medium flex items-center gap-1">
                          <Video className="w-3 h-3" />
                          Video
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="font-medium text-white text-sm truncate mb-1">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-white/70">
                          <TrendingUp className="w-3 h-3" />
                          <span>{product.trendScore} score</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="live" className="mt-0">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="group hover:border-[#00D4FF]/30 transition-all duration-300 overflow-hidden">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-1 rounded-full bg-red-500 text-white text-xs font-medium flex items-center gap-1 animate-pulse">
                          <Radio className="w-3 h-3" />
                          LIVE
                        </span>
                      </div>
                      <div className="absolute top-2 right-2">
                        <span className="px-2 py-1 rounded-full bg-black/50 text-white text-xs">
                          {Math.floor(Math.random() * 1000) + 100} viewers
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-foreground text-sm truncate mb-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <TrendingUp className="w-3 h-3 text-green-400" />
                        <span>Trend Score: {product.trendScore}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
