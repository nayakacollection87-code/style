"use client";

import { motion } from "framer-motion";
import { 
  Coins, 
  ShieldCheck, 
  History, 
  CreditCard,
  TrendingUp,
  Zap,
  BookOpen
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuthStore, useDataStore } from "@/lib/store";
import { formatNumber } from "@/lib/utils";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { getUserKoinHistory } = useDataStore();
  
  const koinHistory = user ? getUserKoinHistory(user.id).slice(-5).reverse() : [];

  return (
    <div className="p-4 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
            Selamat datang, <span className="gradient-text">{user?.name || "User"}</span>
          </h1>
          <p className="text-muted-foreground">
            Kelola bisnis digital Anda dengan Nexvora Studio
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-[#00D4FF]/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#00D4FF]/20 to-[#00D4FF]/10 flex items-center justify-center">
                    <Coins className="w-6 h-6 text-[#00D4FF]" />
                  </div>
                  <span className="text-xs text-muted-foreground">Total Koin</span>
                </div>
                <h3 className="text-3xl font-bold gradient-text">{formatNumber(user?.koin || 0)}</h3>
                <p className="text-sm text-muted-foreground mt-1">Saldo tersedia</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-[#A855F7]/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#A855F7]/20 to-[#A855F7]/10 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-[#A855F7]" />
                  </div>
                  <span className="text-xs text-muted-foreground">Status</span>
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {user?.isActive ? (
                    <span className="text-green-400">Aktif</span>
                  ) : (
                    <span className="text-yellow-400">Belum Aktif</span>
                  )}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">Status akun</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-[#EC4899]/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#EC4899]/20 to-[#EC4899]/10 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-[#EC4899]" />
                  </div>
                  <span className="text-xs text-muted-foreground">Dibeli</span>
                </div>
                <h3 className="text-3xl font-bold text-foreground">{formatNumber(user?.totalKoinBought || 0)}</h3>
                <p className="text-sm text-muted-foreground mt-1">Total koin dibeli</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-[#10B981]/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#10B981]/20 to-[#10B981]/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-[#10B981]" />
                  </div>
                  <span className="text-xs text-muted-foreground">Referral</span>
                </div>
                <h3 className="text-xl font-bold text-[#10B981]">{user?.referralCode || "-"}</h3>
                <p className="text-sm text-muted-foreground mt-1">Kode referral</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Activation Card */}
        {!user?.isActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <Card className="border-yellow-500/30 bg-yellow-500/5">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Aktivasi Akun Anda</h3>
                      <p className="text-sm text-muted-foreground">
                        Lakukan pembayaran aktivasi Rp25.000 untuk mengaktifkan semua fitur
                      </p>
                    </div>
                  </div>
                  <Link href="/dashboard/topup">
                    <Button variant="glow">Aktivasi Sekarang</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Koin History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <History className="w-5 h-5 text-[#00D4FF]" />
                  History Koin
                </CardTitle>
                <Link href="/dashboard/topup">
                  <Button variant="ghost" size="sm">Lihat Semua</Button>
                </Link>
              </CardHeader>
              <CardContent>
                {koinHistory.length > 0 ? (
                  <div className="space-y-4">
                    {koinHistory.map((history) => (
                      <div
                        key={history.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                      >
                        <div>
                          <p className="font-medium text-foreground capitalize">{history.type}</p>
                          <p className="text-sm text-muted-foreground">{history.description}</p>
                        </div>
                        <span
                          className={`font-semibold ${
                            history.amount > 0 ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {history.amount > 0 ? "+" : ""}{history.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <History className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                    <p className="text-muted-foreground">Belum ada history koin</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Guide Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#A855F7]" />
                  Cara Menggunakan Nexvora Studio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl glass-light">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#A855F7] flex items-center justify-center text-white text-sm font-bold">
                        1
                      </div>
                      <h4 className="font-medium text-foreground">Aktivasi Akun</h4>
                    </div>
                    <p className="text-sm text-muted-foreground ml-11">
                      Lakukan pembayaran aktivasi Rp25.000 untuk membuka semua fitur.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl glass-light">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#A855F7] flex items-center justify-center text-white text-sm font-bold">
                        2
                      </div>
                      <h4 className="font-medium text-foreground">Top Up Koin</h4>
                    </div>
                    <p className="text-sm text-muted-foreground ml-11">
                      Isi saldo koin untuk menggunakan layanan di platform.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl glass-light">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#A855F7] flex items-center justify-center text-white text-sm font-bold">
                        3
                      </div>
                      <h4 className="font-medium text-foreground">Gunakan Layanan</h4>
                    </div>
                    <p className="text-sm text-muted-foreground ml-11">
                      Pilih layanan yang Anda butuhkan: Trafik, AI Creator, atau Reset Master.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl glass-light">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#A855F7] flex items-center justify-center text-white text-sm font-bold">
                        4
                      </div>
                      <h4 className="font-medium text-foreground">Ajak Teman</h4>
                    </div>
                    <p className="text-sm text-muted-foreground ml-11">
                      Bagikan kode referral Anda dan dapatkan bonus 10% dari setiap topup referral.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
