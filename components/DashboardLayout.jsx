'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  Users,
  Store,
  User,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Activity,
  ChevronLeft,
  ChevronRight,
  Shield,
  BarChart3,
  UserCircle,
  CreditCard,
  Bell
} from 'lucide-react';

const roles = [
  { id: 'super_admin', name: 'Super Admin', icon: Shield },
  { id: 'merchant_admin', name: 'Merchant Admin', icon: Store },
  { id: 'operator', name: 'Operator/LCO', icon: User },
  { id: 'customer', name: 'Customer', icon: UserCircle }
];

const navigationByRole = {
  super_admin: [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  ],
  merchant_admin: [
    { name: 'Dashboard', href: '/merchant', icon: LayoutDashboard },
  ],
  operator: [
    { name: 'Dashboard', href: '/operator', icon: LayoutDashboard },
  ],
  customer: [
    { name: 'Dashboard', href: '/customer', icon: LayoutDashboard },
  ]
};

export function DashboardLayout({ children, currentRole = 'super_admin' }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const navigation = navigationByRole[currentRole] || [];
  const currentRoleData = roles.find(r => r.id === currentRole);

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Sidebar */}
      <aside
        className={cn(
          'transition-all duration-300 bg-white border-r border-slate-200 shadow-xl',
          sidebarOpen ? 'w-72' : 'w-20'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 bg-gradient-to-r from-blue-600 to-indigo-600">
            {sidebarOpen && (
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-lg font-bold text-white">SubversePay</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white hover:bg-white/20"
            >
              {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </Button>
          </div>

          {/* Role Selector */}
          <div className="p-4">
            {sidebarOpen ? (
              <div className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                <p className="text-xs text-slate-600 mb-2">Current Role</p>
                <div className="flex items-center space-x-2">
                  {currentRoleData?.icon && <currentRoleData.icon className="h-4 w-4 text-blue-600" />}
                  <span className="text-sm font-semibold text-slate-800">{currentRoleData?.name}</span>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                {currentRoleData?.icon && <currentRoleData.icon className="h-6 w-6 text-blue-600" />}
              </div>
            )}
          </div>

          <Separator className="bg-slate-200" />

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-4">
            <div className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? 'default' : 'ghost'}
                      className={cn(
                        'w-full justify-start',
                        sidebarOpen ? 'px-3' : 'px-2',
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                          : 'hover:bg-slate-100'
                      )}
                    >
                      <item.icon className={cn('h-5 w-5', sidebarOpen ? 'mr-3' : 'mx-auto')} />
                      {sidebarOpen && <span>{item.name}</span>}
                    </Button>
                  </Link>
                );
              })}
            </div>

            {sidebarOpen && (
              <div className="mt-6">
                <p className="text-xs font-semibold text-slate-500 px-3 mb-3">SWITCH ROLE</p>
                <div className="space-y-1">
                  {roles.map((role) => {
                    const isCurrentRole = role.id === currentRole;
                    const href = 
                      role.id === 'super_admin' ? '/admin' :
                      role.id === 'merchant_admin' ? '/merchant' :
                      role.id === 'operator' ? '/operator' :
                      '/customer';
                    
                    return (
                      <Link key={role.id} href={href}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            'w-full justify-start text-xs',
                            isCurrentRole && 'bg-blue-50 text-blue-600 font-semibold'
                          )}
                        >
                          <role.icon className="h-4 w-4 mr-2" />
                          {role.name}
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </ScrollArea>

          {/* User Profile */}
          <div className="p-4 border-t border-slate-200">
            {sidebarOpen ? (
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-semibold">
                  A
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Admin User</p>
                  <p className="text-xs text-slate-500">admin@subversepay.com</p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-sm font-semibold">
                  A
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
