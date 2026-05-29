"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Search, 
  TrendingUp,
  Coins,
  Eye
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const mockReferrals = [
  { id: "1", referrer: "seller123", referrerCode: "SEL123", totalReferrals: 5, totalCommission: 125, referrals: [
    { username: "user1", topup: 50000, commission: 12, date: "2024-01-10" },
    { username: "user2", topup: 100000, commission: 25, date: "2024-01-12" },
  ]},
  { id: "2", referrer: "shop456", referrerCode: "SHP456", totalReferrals: 8, totalCommission: 250, referrals: [
    { username: "user3", topup: 250000, commission: 62, date: "2024-01-08" },
  ]},
  { id: "3", referrer: "creator789", referrerCode: "CRT789", totalReferrals: 3, totalCommission: 75, referrals: [] },
  { id: "4", referrer: "power_seller", referrerCode: "PWR001", totalReferrals: 12, totalCommission: 450, referrals: [] },
];

export default function AdminReferralPage() {
  const [referrals] = useState(mockReferrals);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReferral, setSelectedReferral] = useState<typeof mockReferrals[0] | null>(null);

  const filteredReferrals = referrals.filter((ref) =>
    ref.referrer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ref.referrerCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalStats = {
    totalUsers: referrals.length,
    totalReferrals: referrals.reduce((acc, r) => acc + r.totalReferrals, 0),
    totalCommission: referrals.reduce((acc, r) => acc + r.totalCommission, 0),
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          Data Referral
        </h1>
        <p className="text-gray-400 mt-1">Lihat data referral semua user</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total User Referrer", value: totalStats.totalUsers, icon: Users, color: "from-blue-500 to-cyan-500" },
          { label: "Total Referral", value: totalStats.totalReferrals, icon: TrendingUp, color: "from-green-500 to-emerald-500" },
          { label: "Total Komisi Dibayar", value: `${totalStats.totalCommission} Koin`, icon: Coins, color: "from-yellow-500 to-orange-500" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-card">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
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
            placeholder="Cari user atau kode referral..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-dark-card border-white/10"
          />
        </div>
      </motion.div>

      {/* Table */}
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
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">Kode Referral</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">Total Referral</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">Total Komisi</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReferrals.map((ref, index) => (
                    <tr key={ref.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-4 px-4">{index + 1}</td>
                      <td className="py-4 px-4 font-medium">{ref.referrer}</td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-1 rounded bg-neon-blue/20 text-neon-blue font-mono text-sm">
                          {ref.referrerCode}
                        </span>
                      </td>
                      <td className="py-4 px-4">{ref.totalReferrals}</td>
                      <td className="py-4 px-4 text-yellow-400">{ref.totalCommission} Koin</td>
                      <td className="py-4 px-4">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover:bg-blue-500/20 hover:text-blue-400"
                          onClick={() => setSelectedReferral(ref)}
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
      <Dialog open={!!selectedReferral} onOpenChange={() => setSelectedReferral(null)}>
        <DialogContent className="bg-dark-card border-white/10">
          <DialogHeader>
            <DialogTitle>Detail Referral - {selectedReferral?.referrer}</DialogTitle>
          </DialogHeader>
          {selectedReferral && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Kode Referral</p>
                  <p className="font-medium text-neon-blue">{selectedReferral.referrerCode}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Referral</p>
                  <p className="font-medium">{selectedReferral.totalReferrals}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Komisi</p>
                  <p className="font-medium text-yellow-400">{selectedReferral.totalCommission} Koin</p>
                </div>
              </div>

              {selectedReferral.referrals.length > 0 && (
                <div>
                  <p className="text-sm text-gray-400 mb-2">Riwayat Referral Terakhir</p>
                  <div className="space-y-2">
                    {selectedReferral.referrals.map((r, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                        <div>
                          <p className="font-medium">{r.username}</p>
                          <p className="text-xs text-gray-400">{r.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-400">Top Up: Rp {r.topup.toLocaleString()}</p>
                          <p className="text-sm text-yellow-400">+{r.commission} Koin</p>
                        </div>
                      </div>
                    ))}
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
