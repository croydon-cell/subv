'use client';

import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  CreditCard,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Bell,
  Zap,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  Info
} from 'lucide-react';

export default function CustomerDashboard() {
  const [profile, setProfile] = useState(null);
  const [payments, setPayments] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [autoPayEnabled, setAutoPayEnabled] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    // Demo data for showcase
    const demoProfile = {
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91 98765 43210',
      subscriber_id: 'SUB-2024-001234',
      status: 'active',
      amount_due: 599,
      days_remaining: 5,
      next_billing_date: '2024-11-15',
      expiry_date: '2024-11-10',
      auto_pay_enabled: true,
      plan: {
        name: 'Premium Cable + Internet',
        amount: 599,
        features: ['150+ HD Channels', '100 Mbps Internet', '24/7 Support', 'Free Installation']
      }
    };

    const demoPayments = [
      {
        id: 1,
        amount: 599,
        status: 'success',
        description: 'Monthly subscription - October 2024',
        date: '2024-10-15',
        method: 'UPI AutoPay',
        transaction_id: 'TXN240001234567'
      },
      {
        id: 2,
        amount: 599,
        status: 'failed',
        description: 'Monthly subscription - September 2024',
        date: '2024-09-15',
        method: 'UPI',
        failure_reason: 'Insufficient balance',
        retry_status: 'Retried successfully after 2 hours'
      },
      {
        id: 3,
        amount: 599,
        status: 'success',
        description: 'Monthly subscription - August 2024',
        date: '2024-08-15',
        method: 'Credit Card',
        transaction_id: 'TXN240001234566'
      }
    ];

    const demoReminders = [
      {
        id: 1,
        status: 'sent',
        channel: 'SMS',
        message: 'Your subscription expires in 5 days. Renew now to avoid service interruption.',
        date: '2024-11-05'
      },
      {
        id: 2,
        status: 'pending',
        channel: 'WhatsApp',
        message: 'Payment due reminder - ₹599 due on Nov 10th',
        date: '2024-11-03'
      }
    ];

    setTimeout(() => {
      setProfile(demoProfile);
      setPayments(demoPayments);
      setReminders(demoReminders);
      setAutoPayEnabled(demoProfile.auto_pay_enabled);
      setLoading(false);
    }, 1000);
  };

  const handleToggleAutoPay = async () => {
    try {
      const response = await fetch('/api/customer/toggle-autopay', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: !autoPayEnabled })
      });
      const result = await response.json();
      if (result.success) {
        setAutoPayEnabled(!autoPayEnabled);
        alert(result.message);
      }
    } catch (error) {
      console.error('Error toggling AutoPay:', error);
    }
  };

  const handleMakePayment = async () => {
    try {
      const response = await fetch('/api/customer/make-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: profile.amount_due })
      });
      const result = await response.json();
      if (result.success) {
        alert('Payment initiated! Redirecting to payment gateway...');
        // In production, redirect to Razorpay payment page
        console.log('Payment Link:', result.data.payment_link);
      }
    } catch (error) {
      console.error('Error making payment:', error);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <DashboardLayout currentRole="customer">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-slate-600">Loading your dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const daysRemaining = profile?.days_remaining || 0;
  const isExpiringSoon = daysRemaining <= 7 && daysRemaining > 0;
  const isExpired = daysRemaining < 0;

  return (
    <DashboardLayout currentRole="customer">
      <div className="p-8 space-y-8 max-w-6xl mx-auto">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Welcome back, {profile?.name}!
          </h1>
          <p className="text-slate-600 mt-2">Manage your subscription and payments</p>
        </div>

        {/* Alert for expiry */}
        {(isExpiringSoon || isExpired) && (
          <Alert variant={isExpired ? 'destructive' : 'warning'}>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {isExpired 
                ? `Your subscription expired ${Math.abs(daysRemaining)} days ago. Renew now to continue enjoying your service.`
                : `Your subscription expires in ${daysRemaining} days. Renew now to avoid service interruption.`
              }
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Plan Details Card */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-white/80 text-sm mb-1">Current Plan</p>
                    <h2 className="text-3xl font-bold">{profile?.plan?.name}</h2>
                    <p className="text-white/80 mt-1">{profile?.subscriber_id}</p>
                  </div>
                  <Badge className="bg-white text-blue-600 font-semibold">
                    {profile?.status === 'active' ? 'ACTIVE' : 'EXPIRED'}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-white/80 text-sm mb-1">Monthly Amount</p>
                    <p className="text-2xl font-bold">{formatCurrency(profile?.plan?.amount || 0)}</p>
                  </div>
                  <div>
                    <p className="text-white/80 text-sm mb-1">Next Billing</p>
                    <p className="text-lg font-semibold">
                      {profile?.next_billing_date ? new Date(profile.next_billing_date).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm">
                  <p className="text-white/80 text-sm mb-2">Plan Features</p>
                  <div className="grid grid-cols-2 gap-2">
                    {profile?.plan?.features?.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Payment Card */}
            {profile?.amount_due > 0 && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
                    Payment Due
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-blue-600">{formatCurrency(profile.amount_due)}</p>
                      <p className="text-sm text-slate-600 mt-1">
                        Due by {profile?.expiry_date ? new Date(profile.expiry_date).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-blue-600 to-indigo-600"
                      onClick={handleMakePayment}
                    >
                      <CreditCard className="h-5 w-5 mr-2" />
                      Pay Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Payment History */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>Your recent transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {payments.map((payment) => (
                    <Card key={payment.id} className="border-l-4" style={{
                      borderLeftColor: payment.status === 'success' ? '#10b981' : '#ef4444'
                    }}>
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <p className="font-semibold">{formatCurrency(payment.amount)}</p>
                              <Badge variant={payment.status === 'success' ? 'success' : 'destructive'}>
                                {payment.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-600">{payment.description}</p>
                            <p className="text-xs text-slate-500 mt-1">
                              {new Date(payment.date).toLocaleDateString()} • {payment.method}
                            </p>
                            {payment.transaction_id && (
                              <p className="text-xs text-slate-400 mt-1">TXN: {payment.transaction_id}</p>
                            )}
                            {payment.failure_reason && (
                              <p className="text-xs text-red-600 mt-1">Reason: {payment.failure_reason}</p>
                            )}
                            {payment.retry_status && (
                              <p className="text-xs text-green-600 mt-1">{payment.retry_status}</p>
                            )}
                          </div>
                          {payment.status === 'success' ? (
                            <CheckCircle className="h-6 w-6 text-green-600" />
                          ) : (
                            <XCircle className="h-6 w-6 text-red-600" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AutoPay Card */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                  AutoPay
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-medium">{autoPayEnabled ? 'Enabled' : 'Disabled'}</p>
                    <p className="text-sm text-slate-600">
                      {autoPayEnabled ? 'Automatic payments active' : 'Enable for hassle-free payments'}
                    </p>
                  </div>
                  <Switch
                    checked={autoPayEnabled}
                    onCheckedChange={handleToggleAutoPay}
                  />
                </div>
                <Separator className="my-4" />
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Never miss a payment</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>AI-powered retry on failures</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Secure UPI mandate</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reminders */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Bell className="h-5 w-5 mr-2 text-blue-600" />
                  Smart Reminders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reminders.map((reminder) => (
                    <div key={reminder.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="flex items-start space-x-2 mb-1">
                        <Badge variant={
                          reminder.status === 'sent' ? 'secondary' :
                          reminder.status === 'pending' ? 'warning' : 'default'
                        } className="text-xs">
                          {reminder.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {reminder.channel}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-700 mt-2">{reminder.message}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {new Date(reminder.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Account Info */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="text-slate-600">Name</p>
                  <p className="font-medium">{profile?.name}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-slate-600">Email</p>
                  <p className="font-medium">{profile?.email}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-slate-600">Phone</p>
                  <p className="font-medium">{profile?.phone}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-slate-600">Subscriber ID</p>
                  <p className="font-medium font-mono text-xs">{profile?.subscriber_id}</p>
                </div>
              </CardContent>
            </Card>

            {/* Help Card */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm mb-1">Need Help?</p>
                    <p className="text-xs text-slate-600 mb-3">
                      Contact our support team for any queries or issues with your subscription.
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      Contact Support
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
