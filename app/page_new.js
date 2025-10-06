'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Store, User, UserCircle, TrendingUp, Zap, Target } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  const roles = [
    {
      id: 'super_admin',
      title: 'Super Admin',
      description: 'Platform oversight, merchant management & system health',
      icon: Shield,
      href: '/admin',
      color: 'from-purple-600 to-indigo-600'
    },
    {
      id: 'merchant_admin',
      title: 'Merchant Admin',
      description: 'Collections, AI analytics, churn predictions & LCO performance',
      icon: Store,
      href: '/merchant',
      color: 'from-blue-600 to-cyan-600'
    },
    {
      id: 'operator',
      title: 'Operator/LCO',
      description: 'Subscriber management, collections & settlements',
      icon: User,
      href: '/operator',
      color: 'from-green-600 to-emerald-600'
    },
    {
      id: 'customer',
      title: 'Customer',
      description: 'Plan details, payment history & AutoPay setup',
      icon: UserCircle,
      href: '/customer',
      color: 'from-orange-600 to-red-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-xl">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              SubversePay
            </h1>
          </div>
          <p className="text-xl text-slate-600 mb-2">AI-Driven Payment Recovery Platform</p>
          <p className="text-sm text-slate-500">Turn failed payments into recovered revenue</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <div className="px-4 py-2 rounded-full bg-white border border-blue-200 text-sm font-medium text-blue-700 shadow-sm">
            <Zap className="h-4 w-4 inline mr-1" />
            AI-Powered Retries
          </div>
          <div className="px-4 py-2 rounded-full bg-white border border-green-200 text-sm font-medium text-green-700 shadow-sm">
            <Target className="h-4 w-4 inline mr-1" />
            Smart Churn Prediction
          </div>
          <div className="px-4 py-2 rounded-full bg-white border border-purple-200 text-sm font-medium text-purple-700 shadow-sm">
            <TrendingUp className="h-4 w-4 inline mr-1" />
            Revenue Forecasting
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role) => (
            <Card
              key={role.id}
              className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden"
              onClick={() => router.push(role.href)}
            >
              <CardContent className="p-8">
                <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <role.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{role.title}</h3>
                <p className="text-slate-600 mb-6">{role.description}</p>
                <Button 
                  className={`w-full bg-gradient-to-r ${role.color} text-white shadow-lg`}
                  size="lg"
                >
                  Access Dashboard
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 text-sm text-slate-500">
          <p>Built for MSOs, ISPs, and Gyms • Powered by Supabase & Razorpay</p>
        </div>
      </div>
    </div>
  );
}
