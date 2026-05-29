'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const advantages = [
  {
    title: 'Dashboard Modern',
    description: 'Interface yang clean dan user-friendly untuk kemudahan penggunaan',
    icon: '🎨',
  },
  {
    title: 'AI Automation',
    description: 'Otomatisasi pekerjaan Anda dengan teknologi artificial intelligence',
    icon: '⚡',
  },
  {
    title: 'Real Time Monitoring',
    description: 'Pantau performa konten Anda secara real-time dengan akurat',
    icon: '👁️',
  },
  {
    title: 'Mobile Friendly',
    description: 'Akses dashboard dari mana saja dengan perangkat apapun',
    icon: '📲',
  },
  {
    title: 'Fast Processing',
    description: 'Proses cepat dan responsif untuk pengalaman terbaik',
    icon: '🚀',
  },
  {
    title: 'Secure System',
    description: 'Keamanan data tingkat enterprise dengan enkripsi end-to-end',
    icon: '🔒',
  },
  {
    title: 'Referral Rewards',
    description: 'Raih komisi 10% dari setiap referral yang berhasil',
    icon: '💰',
  },
  {
    title: 'Premium Support',
    description: 'Tim support profesional siap membantu 24/7',
    icon: '🎧',
  },
];

const AdvantagesSection = () => {
  return (
    <section id="advantages" className="py-20 bg-nexvora-dark">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Keunggulan Kami</h2>
          <p className="text-xl text-gray-400">Kami memberikan solusi terbaik untuk bisnis digital Anda</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-nexvora-purple transition-all duration-300 h-full">
                <CardHeader>
                  <div className="text-3xl mb-2">{advantage.icon}</div>
                  <CardTitle className="text-white text-base">{advantage.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm">{advantage.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { AdvantagesSection };
