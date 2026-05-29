'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { supabase } from '@/lib/supabase';
import { generateReferralCode } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formData.password !== formData.confirmPassword) {
        toast.error('Password tidak cocok');
        setLoading(false);
        return;
      }

      // Sign up with Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      if (!authData.user) throw new Error('User creation failed');

      const referralCode = generateReferralCode(authData.user.id);

      // Insert user data
      const { error: insertError } = await supabase.from('users').insert([
        {
          id: authData.user.id,
          email: formData.email,
          username: formData.username,
          phone: formData.phone,
          full_name: formData.fullName,
          total_coin: 0,
          account_status: 'gratis',
          referral_code: referralCode,
          referral_clicks: 0,
          referral_registrations: 0,
        },
      ]);

      if (insertError) throw insertError;

      toast.success('Registrasi berhasil! Silakan login.');
      router.push('/login');
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Terjadi kesalahan saat registrasi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center px-4 py-20">
      <Card className="w-full max-w-md bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl gradient-text text-center">Daftar Sekarang</CardTitle>
          <CardDescription className="text-center">
            Bergabunglah dengan komunitas Nexvora Studio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="fullName" className="mb-2">Nama Lengkap</Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="Masukkan nama lengkap"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="username" className="mb-2">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="Masukkan username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="mb-2">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Masukkan email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone" className="mb-2">Nomor Telepon</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="Masukkan nomor telepon"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="mb-2">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Masukkan password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="mb-2">Konfirmasi Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Konfirmasi password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <Button
              type="submit"
              variant="gradient"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Daftar'}
            </Button>

            <p className="text-center text-gray-400 text-sm">
              Sudah punya akun?{' '}
              <a href="/login" className="text-nexvora-blue hover:text-nexvora-purple">
                Login di sini
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
