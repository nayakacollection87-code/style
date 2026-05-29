"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Settings, 
  Save,
  Bell,
  Shield,
  Database,
  Globe
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "Nexvora Studio",
    whatsappNumber: "082131974325",
    activationPrice: 25000,
    referralCommission: 10,
    maintenanceMode: false,
    emailNotifications: true,
    autoDeleteLogs: 3,
  });

  const handleSave = () => {
    // Save settings to database
    alert("Pengaturan berhasil disimpan!");
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          Pengaturan
        </h1>
        <p className="text-gray-400 mt-1">Konfigurasi pengaturan platform</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-400" />
                Pengaturan Umum
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Nama Situs</Label>
                <Input
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  className="bg-dark border-white/10"
                />
              </div>
              <div className="space-y-2">
                <Label>Nomor WhatsApp Admin</Label>
                <Input
                  value={settings.whatsappNumber}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  className="bg-dark border-white/10"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Pricing Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-green-400" />
                Pengaturan Harga
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Harga Aktivasi (Rp)</Label>
                <Input
                  type="number"
                  value={settings.activationPrice}
                  onChange={(e) => setSettings({ ...settings, activationPrice: parseInt(e.target.value) })}
                  className="bg-dark border-white/10"
                />
              </div>
              <div className="space-y-2">
                <Label>Komisi Referral (%)</Label>
                <Input
                  type="number"
                  value={settings.referralCommission}
                  onChange={(e) => setSettings({ ...settings, referralCommission: parseInt(e.target.value) })}
                  className="bg-dark border-white/10"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* System Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-400" />
                Pengaturan Sistem
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Mode Maintenance</p>
                  <p className="text-sm text-gray-400">Nonaktifkan akses user sementara</p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
                />
              </div>
              <div className="space-y-2">
                <Label>Auto Delete Log (Hari)</Label>
                <Input
                  type="number"
                  value={settings.autoDeleteLogs}
                  onChange={(e) => setSettings({ ...settings, autoDeleteLogs: parseInt(e.target.value) })}
                  className="bg-dark border-white/10"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-yellow-400" />
                Notifikasi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifikasi</p>
                  <p className="text-sm text-gray-400">Kirim email untuk aktivitas penting</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          onClick={handleSave}
          className="bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90"
        >
          <Save className="w-4 h-4 mr-2" />
          Simpan Pengaturan
        </Button>
      </motion.div>
    </div>
  );
}
