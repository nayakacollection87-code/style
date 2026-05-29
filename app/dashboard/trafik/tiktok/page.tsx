"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Video, 
  Eye, 
  Coins, 
  AlertCircle,
  Loader2,
  History,
  Link as LinkIcon
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuthStore, useDataStore } from "@/lib/store";
import { formatNumber, validateUrl, calculateKoin } from "@/lib/utils";

export default function TiktokServicePage() {
  const { user } = useAuthStore();
  const { 
    addTrafikOrder, 
    addKoinHistory, 
    getUserTrafikOrders, 
    hasPendingOrder,
    updateUserData 
  } = useDataStore();
  const { updateUser } = useAuthStore();

  const [url, setUrl] = useState("");
  const [views, setViews] = useState("");
  const [securityCheck, setSecurityCheck] = useState(false);
  const [sebarTrafik, setSebarTrafik] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const userOrders = user ? getUserTrafikOrders(user.id).filter(o => o.platform === "tiktok") : [];
  const isPending = user ? hasPendingOrder(user.id, "tiktok") : false;
  const koinNeeded = calculateKoin(parseInt(views) || 0);

  const handleViewsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setViews(value);
    setError("");
  };

  const handleSubmit = async () => {
    setError("");

    if (!user) return;

    if (!url || !views) {
      setError("URL dan jumlah view harus diisi");
      return;
    }

    if (!validateUrl(url, "tiktok")) {
      setError("URL tidak valid. Masukkan URL video TikTok yang benar");
      return;
    }

    const viewCount = parseInt(views);
    if (viewCount < 1000 || viewCount % 1000 !== 0) {
      setError("Jumlah view harus kelipatan 1000");
      return;
    }

    if (koinNeeded > (user.koin || 0)) {
      setError(`Koin tidak cukup. Anda butuh ${koinNeeded} koin`);
      return;
    }

    if (!securityCheck) {
      setError("Harap centang checklist keamanan");
      return;
    }

    if (isPending) {
      setError("Anda masih memiliki order yang pending. Tunggu sampai selesai.");
      return;
    }

    setIsLoading(true);

    if (sebarTrafik) {
      setShowPopup(true);
      await new Promise((resolve) => setTimeout(resolve, 10000));
      setShowPopup(false);
    }

    // Create order
    const order = {
      id: `order-${Date.now()}`,
      userId: user.id,
      platform: "tiktok" as const,
      url,
      totalView: viewCount,
      totalKoin: koinNeeded,
      status: "pending" as const,
      createdAt: new Date(),
    };

    addTrafikOrder(order);

    // Deduct koin
    const newKoin = (user.koin || 0) - koinNeeded;
    updateUserData(user.id, { koin: newKoin });
    updateUser({ koin: newKoin });

    addKoinHistory({
      id: `history-${Date.now()}`,
      userId: user.id,
      type: "usage",
      amount: -koinNeeded,
      description: `Order TikTok ${viewCount} views`,
      createdAt: new Date(),
    });

    setUrl("");
    setViews("");
    setSecurityCheck(false);
    setSebarTrafik(false);
    setIsLoading(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <span className="px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs">Pending</span>;
      case "proses":
        return <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs">Proses</span>;
      case "complete":
        return <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">Complete</span>;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 lg:p-8">
      {/* Popup for Sebar Trafik */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-green-500/20 border border-green-500/50 rounded-2xl p-8 max-w-md w-full text-center"
            >
              <div className="w-16 h-16 rounded-full bg-green-500/30 flex items-center justify-center mx-auto mb-4">
                <Loader2 className="w-8 h-8 text-green-400 animate-spin" />
              </div>
              <h3 className="text-xl font-bold text-green-400 mb-2">Menyiapkan Distribusi</h3>
              <p className="text-green-300/80">
                Menyiapkan distribusi trafik ke seluruh wilayah Indonesia.
              </p>
              <div className="mt-4 h-2 rounded-full bg-green-500/20 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 10, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-pink-500/20 to-pink-500/10 flex items-center justify-center">
              <Video className="w-5 h-5 text-pink-500" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">TikTok Service</h1>
          </div>
          <p className="text-muted-foreground">
            Tingkatkan view video TikTok Anda dengan layanan trafik kami
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Order Form */}
          <Card>
            <CardHeader>
              <CardTitle>Buat Order Baru</CardTitle>
              <CardDescription>Masukkan detail video yang ingin diboosting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="url">URL Video TikTok</Label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="url"
                    placeholder="https://tiktok.com/..."
                    value={url}
                    onChange={(e) => { setUrl(e.target.value); setError(""); }}
                    className="pl-10"
                    disabled={isLoading || isPending}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="views">Jumlah View (kelipatan 1000)</Label>
                <div className="relative">
                  <Eye className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="views"
                    placeholder="Contoh: 5000"
                    value={views}
                    onChange={handleViewsChange}
                    className="pl-10"
                    disabled={isLoading || isPending}
                  />
                </div>
              </div>

              {/* Koin Calculator */}
              <div className="p-4 rounded-xl glass-light">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-[#00D4FF]" />
                    <span className="text-muted-foreground">Koin dibutuhkan:</span>
                  </div>
                  <span className="text-xl font-bold gradient-text">{formatNumber(koinNeeded)}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">1000 view = 1 koin</p>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="security"
                    checked={securityCheck}
                    onCheckedChange={(checked) => setSecurityCheck(checked as boolean)}
                    disabled={isLoading || isPending}
                  />
                  <Label htmlFor="security" className="text-sm cursor-pointer">
                    Checklist Keamanan - Saya menyetujui syarat dan ketentuan
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="sebar"
                    checked={sebarTrafik}
                    onCheckedChange={(checked) => setSebarTrafik(checked as boolean)}
                    disabled={isLoading || isPending}
                  />
                  <Label htmlFor="sebar" className="text-sm cursor-pointer">
                    Sebar Trafik - Distribusi ke seluruh wilayah Indonesia
                  </Label>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </motion.div>
              )}

              {isPending && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  Anda memiliki order pending. Tunggu sampai selesai untuk membuat order baru.
                </div>
              )}

              <Button
                variant="glow"
                className="w-full"
                size="lg"
                onClick={handleSubmit}
                disabled={isLoading || isPending}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Memproses...
                  </span>
                ) : (
                  "Booster Trafik"
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Order History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5 text-[#00D4FF]" />
                History Trafik
              </CardTitle>
            </CardHeader>
            <CardContent>
              {userOrders.length > 0 ? (
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                  {userOrders.reverse().map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 rounded-xl glass-light"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs text-muted-foreground">#{index + 1}</span>
                            {getStatusBadge(order.status)}
                          </div>
                          <p className="text-sm text-foreground truncate mb-1">{order.url}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {formatNumber(order.totalView)} views
                            </span>
                            <span className="flex items-center gap-1">
                              <Coins className="w-3 h-3" />
                              {order.totalKoin} koin
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <History className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-muted-foreground">Belum ada history order</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
