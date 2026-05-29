"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Link as LinkIcon, 
  Copy, 
  Check, 
  TrendingUp,
  Coins,
  UserPlus,
  Gift
} from "lucide-react";
import { useStore } from "@/lib/store";

const referralStats = {
  totalReferrals: 12,
  activeReferrals: 8,
  pendingReferrals: 4,
  totalEarnings: 250,
};

const referralHistory = [
  { 
    id: 1, 
    username: "user123", 
    status: "active", 
    joinDate: "2024-01-10",
    topupAmount: 100000,
    commission: 25
  },
  { 
    id: 2, 
    username: "seller456", 
    status: "active", 
    joinDate: "2024-01-08",
    topupAmount: 250000,
    commission: 62
  },
  { 
    id: 3, 
    username: "shop789", 
    status: "pending", 
    joinDate: "2024-01-05",
    topupAmount: 0,
    commission: 0
  },
  { 
    id: 4, 
    username: "creator001", 
    status: "active", 
    joinDate: "2024-01-03",
    topupAmount: 500000,
    commission: 125
  },
  { 
    id: 5, 
    username: "newuser", 
    status: "pending", 
    joinDate: "2024-01-01",
    topupAmount: 0,
    commission: 0
  },
];

export default function ReferralPage() {
  const { user } = useStore();
  const [copied, setCopied] = useState(false);
  const referralLink = `https://nexvora.studio/register?ref=${user?.referralCode || "DEMO123"}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
          Referral Program
        </h1>
        <p className="text-gray-400 mt-1">Ajak teman dan dapatkan komisi 10% dari setiap top up</p>
      </motion.div>

      {/* Referral Link Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="glass-card border-neon-blue/30 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10" />
          <CardContent className="p-6 relative">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                    <LinkIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Link Referral Anda</h3>
                    <p className="text-sm text-gray-400">Bagikan link ini untuk mendapatkan komisi</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input
                    value={referralLink}
                    readOnly
                    className="bg-dark-card/50 border-white/10 text-sm"
                  />
                  <Button
                    onClick={handleCopy}
                    className={`shrink-0 ${
                      copied 
                        ? "bg-green-500 hover:bg-green-600" 
                        : "bg-gradient-to-r from-neon-blue to-neon-purple hover:opacity-90"
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Tersalin
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Salin
                      </>
                    )}
                  </Button>
                </div>
              </div>
              <div className="glass-card p-4 rounded-xl text-center">
                <p className="text-sm text-gray-400 mb-1">Kode Referral</p>
                <p className="text-2xl font-bold text-neon-blue">{user?.referralCode || "DEMO123"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { 
            label: "Total Referral", 
            value: referralStats.totalReferrals, 
            icon: Users, 
            color: "from-neon-blue to-blue-600" 
          },
          { 
            label: "Referral Aktif", 
            value: referralStats.activeReferrals, 
            icon: UserPlus, 
            color: "from-green-500 to-emerald-600" 
          },
          { 
            label: "Menunggu Topup", 
            value: referralStats.pendingReferrals, 
            icon: TrendingUp, 
            color: "from-yellow-500 to-orange-600" 
          },
          { 
            label: "Total Komisi", 
            value: `${referralStats.totalEarnings} Koin`, 
            icon: Coins, 
            color: "from-neon-purple to-purple-600" 
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
          >
            <Card className="glass-card">
              <CardContent className="p-4">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-gray-400">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* How it Works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-neon-purple" />
              Cara Kerja Referral
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: 1,
                  title: "Bagikan Link",
                  description: "Bagikan link referral unik Anda ke teman atau komunitas"
                },
                {
                  step: 2,
                  title: "Teman Mendaftar",
                  description: "Teman mendaftar menggunakan link referral Anda"
                },
                {
                  step: 3,
                  title: "Dapatkan Komisi",
                  description: "Dapatkan 10% koin dari setiap top up yang diverifikasi"
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Referral History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-neon-blue" />
              Daftar Referral
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">No</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Username</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Tanggal Daftar</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Total Topup</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Komisi</th>
                  </tr>
                </thead>
                <tbody>
                  {referralHistory.map((item, index) => (
                    <tr key={item.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4 font-medium">{item.username}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.status === "active"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {item.status === "active" ? "Aktif" : "Pending"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-400">{item.joinDate}</td>
                      <td className="py-3 px-4">
                        {item.topupAmount > 0 
                          ? `Rp ${item.topupAmount.toLocaleString()}`
                          : "-"
                        }
                      </td>
                      <td className="py-3 px-4">
                        {item.commission > 0 && (
                          <span className="text-neon-blue font-medium">
                            +{item.commission} Koin
                          </span>
                        )}
                        {item.commission === 0 && "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
