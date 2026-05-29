"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Sparkles, ArrowLeft, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuthStore, useDataStore } from "@/lib/store";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, adminLogin } = useAuthStore();
  const { getUserByUsername, getAdminByUsername, addActivityLog } = useDataStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!formData.username || !formData.password) {
      setError("Username dan password harus diisi");
      setIsLoading(false);
      return;
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check admin first
    const admin = getAdminByUsername(formData.username);
    if (admin) {
      // For demo: password is "admin123" for super admin
      if (formData.password === "admin123") {
        addActivityLog({
          id: `log-${Date.now()}`,
          adminId: admin.id,
          action: "login",
          details: `Admin ${admin.username} login`,
          createdAt: new Date(),
        });
        adminLogin(admin);
        router.push("/admin");
        return;
      }
    }

    // Check user
    const user = getUserByUsername(formData.username);
    if (user) {
      // For demo: accept any password for existing users
      addActivityLog({
        id: `log-${Date.now()}`,
        userId: user.id,
        action: "login",
        details: `User ${user.username} login`,
        createdAt: new Date(),
      });
      login(user);
      router.push("/dashboard");
      return;
    }

    setError("Username atau password salah");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4">
      {/* Background */}
      <div className="absolute inset-0 animated-bg" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#A855F7] rounded-full filter blur-[128px] opacity-20" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#00D4FF] rounded-full filter blur-[128px] opacity-20" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </Link>

        <Card className="border-[#A855F7]/20">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#00D4FF] to-[#A855F7] flex items-center justify-center mx-auto mb-4 neon-glow">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl gradient-text">Login</CardTitle>
            <CardDescription>Masuk ke akun Nexvora Studio Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Masukkan username"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm"
                >
                  {error}
                </motion.div>
              )}

              <Button type="submit" variant="glow" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Masuk...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="w-4 h-4" />
                    Login
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Belum punya akun?{" "}
              <Link href="/register" className="text-[#00D4FF] hover:underline">
                Daftar di sini
              </Link>
            </div>

            {/* Demo credentials */}
            <div className="mt-6 p-4 rounded-lg glass-light">
              <p className="text-xs text-muted-foreground mb-2">Demo Admin:</p>
              <p className="text-sm text-foreground">Username: superadmin</p>
              <p className="text-sm text-foreground">Password: admin123</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
