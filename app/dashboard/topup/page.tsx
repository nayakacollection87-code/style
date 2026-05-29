"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coins, Package, Clock, CheckCircle, Upload, Copy, Check } from "lucide-react";
import { useStore } from "@/lib/store";

const coinPackages = [
  { id: 1, coins: 50, price: 50000, bonus: 0 },
  { id: 2, coins: 100, price: 100000, bonus: 5 },
  { id: 3, coins: 250, price: 250000, bonus: 15 },
  { id: 4, coins: 500, price: 500000, bonus: 50 },
  { id: 5, coins: 1000, price: 1000000, bonus: 150 },
];

const topupHistory = [
  { id: 1, package: "100 Koin", amount: 100000, status: "verified", date: "2024-01-15" },
  { id: 2, package: "50 Koin", amount: 50000, status: "pending", date: "2024-01-14" },
];

export default function TopUpPage() {
  const { user } = useStore();
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
            Top Up Koin
          </h1>
          <p className="text-gray-400 mt-1">Isi ulang koin untuk menggunakan layanan</p>
        </div>
        <div className="glass-card px-4 py-2 rounded-xl flex items-center gap-2">
          <Coins className="w-5 h-5 text-yellow-400" />
          <span className="font-semibold">{user?.coins || 0} Koin</span>
        </div>
      </motion.div>

      {/* Coin Packages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coinPackages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={`glass-card cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedPackage === pkg.id
                  ? "border-neon-blue shadow-lg shadow-neon-blue/20"
                  : "border-white/10 hover:border-neon-purple/50"
              }`}
              onClick={() => setSelectedPackage(pkg.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center">
                    <Package className="w-6 h-6 text-neon-blue" />
                  </div>
                  {pkg.bonus > 0 && (
                    <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                      +{pkg.bonus} Bonus
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {pkg.coins} Koin
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {pkg.bonus > 0 && `Total: ${pkg.coins + pkg.bonus} Koin`}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold text-neon-blue">
                    {formatPrice(pkg.price)}
                  </span>
                  {selectedPackage === pkg.id && (
                    <CheckCircle className="w-5 h-5 text-neon-blue" />
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Payment Section */}
      <AnimatePresence>
        {selectedPackage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="glass-card border-neon-blue/30">
              <CardHeader>
                <CardTitle className="text-xl">Pembayaran</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-white">Transfer ke:</h4>
                    <div className="glass-card p-4 rounded-xl space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Bank</span>
                        <span className="font-medium">BCA</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">No. Rekening</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">1234567890</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleCopy("1234567890")}
                          >
                            {copied ? (
                              <Check className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Atas Nama</span>
                        <span className="font-medium">Nexvora Studio</span>
                      </div>
                      <div className="flex items-center justify-between border-t border-white/10 pt-3">
                        <span className="text-gray-400">Total Bayar</span>
                        <span className="text-xl font-bold text-neon-blue">
                          {formatPrice(
                            coinPackages.find((p) => p.id === selectedPackage)?.price || 0
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-white">Upload Bukti Transfer</h4>
                    <div className="glass-card p-6 rounded-xl border-2 border-dashed border-white/20 hover:border-neon-blue/50 transition-colors cursor-pointer">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <Upload className="w-10 h-10 text-gray-400" />
                        <p className="text-gray-400 text-sm text-center">
                          Klik atau drag & drop bukti transfer
                        </p>
                        <input type="file" className="hidden" accept="image/*" />
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-neon-blue to-neon-purple hover:opacity-90">
                      Konfirmasi Pembayaran
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* History */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-neon-purple" />
            Riwayat Top Up
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">No</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Paket</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Nominal</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {topupHistory.map((item, index) => (
                  <tr key={item.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{item.package}</td>
                    <td className="py-3 px-4">{formatPrice(item.amount)}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === "verified"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {item.status === "verified" ? "Terverifikasi" : "Pending"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-400">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
