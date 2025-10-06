'use client';

import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatsCard } from '@/components/StatsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Users,
  DollarSign,
  Target,
  TrendingUp,
  RefreshCw,
  Send,
  Zap,
  Pause,
  Play,
  Search,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function OperatorDashboard() {
  const [subscribers, setSubscribers] = useState([]);
  const [collections, setCollections] = useState(null);
  const [settlements, setSettlements] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [subscribersRes, collectionsRes, settlementsRes] = await Promise.all([
        fetch('/api/operator/subscribers'),
        fetch('/api/operator/collections'),
        fetch('/api/operator/settlements')
      ]);

      const [subscribersData, collectionsData, settlementsData] = await Promise.all([
        subscribersRes.json(),
        collectionsRes.json(),
        settlementsRes.json()
      ]);

      setSubscribers(subscribersData.data);
      setCollections(collectionsData.data);
      setSettlements(settlementsData.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = async (action, subscriber) => {
    try {
      const response = await fetch(`/api/operator/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriber_id: subscriber.id, subscriber_name: subscriber.name })
      });
      const result = await response.json();
      alert(result.message);
      fetchDashboardData();
    } catch (error) {
      console.error('Error performing action:', error);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const filteredSubscribers = subscribers.filter(sub => {
    const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          sub.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || sub.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const statusCounts = {
    active: subscribers.filter(s => s.status === 'active').length,
    expired: subscribers.filter(s => s.status === 'expired').length,
    high_risk: subscribers.filter(s => s.risk_level === 'high').length
  };

  if (loading) {
    return (
      <DashboardLayout currentRole="operator">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-slate-600">Loading dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout currentRole="operator">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Operator Dashboard
            </h1>
            <p className="text-slate-600 mt-2">Subscriber management & collections tracking</p>
          </div>
          <Button onClick={fetchDashboardData} className="bg-gradient-to-r from-blue-600 to-indigo-600">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Active Subscribers"
            value={statusCounts.active}
            icon={Users}
            gradient={true}
          />
          <StatsCard
            title="Today's Collections"
            value={formatCurrency(collections?.today?.collected || 0)}
            icon={DollarSign}
            subtitle={`${collections?.today?.collection_rate || 0}% rate`}
          />
          <StatsCard
            title="Pending Collections"
            value={formatCurrency(collections?.today?.pending || 0)}
            icon={Clock}
            subtitle={`Target: ${formatCurrency(collections?.today?.target || 0)}`}
          />
          <StatsCard
            title="High Risk Subscribers"
            value={statusCounts.high_risk}
            icon={AlertCircle}
            subtitle={`Requires attention`}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Subscribers List */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Subscriber Management</CardTitle>
                <CardDescription>Quick actions and status tracking</CardDescription>
                
                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search by name or ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={filterStatus === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilterStatus('all')}
                    >
                      All
                    </Button>
                    <Button
                      variant={filterStatus === 'active' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilterStatus('active')}
                    >
                      Active
                    </Button>
                    <Button
                      variant={filterStatus === 'expired' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilterStatus('expired')}
                    >
                      Expired
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-4">
                    {filteredSubscribers.map((subscriber) => (
                      <Card key={subscriber.id} className="border-l-4" style={{
                        borderLeftColor: 
                          subscriber.status === 'expired' ? '#ef4444' :
                          subscriber.risk_level === 'high' ? '#f59e0b' :
                          '#10b981'
                      }}>
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-semibold text-lg">{subscriber.name}</h4>
                                <Badge variant={subscriber.status === 'active' ? 'success' : 'destructive'}>
                                  {subscriber.status}
                                </Badge>
                                {subscriber.risk_level === 'high' && (
                                  <Badge variant="warning">High Risk</Badge>
                                )}
                              </div>
                              <p className="text-sm text-slate-600">{subscriber.id}</p>
                              <p className="text-sm text-slate-600">{subscriber.phone} • {subscriber.email}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">{subscriber.plan}</p>
                              <p className="text-sm text-slate-600">
                                Expires: {new Date(subscriber.expiry_date).toLocaleDateString()}
                              </p>
                              <p className="text-xs text-slate-500">
                                {subscriber.days_until_expiry > 0 
                                  ? `${subscriber.days_until_expiry} days left`
                                  : `${Math.abs(subscriber.days_until_expiry)} days overdue`
                                }
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                            <div>
                              <p className="text-slate-600">Last Payment</p>
                              <p className="font-medium">{new Date(subscriber.last_payment).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-slate-600">Payment Method</p>
                              <p className="font-medium">{subscriber.payment_method}</p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleQuickAction('send-reminder', subscriber)}
                            >
                              <Send className="h-3 w-3 mr-1" />
                              Send Reminder
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleQuickAction('trigger-retry', subscriber)}
                            >
                              <Zap className="h-3 w-3 mr-1" />
                              Trigger Retry
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleQuickAction('pause-service', subscriber)}
                            >
                              {subscriber.status === 'active' ? (
                                <><Pause className="h-3 w-3 mr-1" /> Pause</>
                              ) : (
                                <><Play className="h-3 w-3 mr-1" /> Resume</>
                              )}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Collections & Settlements */}
          <div className="space-y-6">
            {/* Collections Overview */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Collections Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
                  <p className="text-sm text-slate-600 mb-1">Today</p>
                  <p className="text-3xl font-bold text-green-600">{formatCurrency(collections?.today?.collected || 0)}</p>
                  <p className="text-xs text-slate-600 mt-1">
                    {collections?.today?.collection_rate || 0}% of target
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
                  <p className="text-sm text-slate-600 mb-1">This Week</p>
                  <p className="text-3xl font-bold text-blue-600">{formatCurrency(collections?.week?.collected || 0)}</p>
                  <p className="text-xs text-slate-600 mt-1">
                    {collections?.week?.collection_rate || 0}% of target
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
                  <p className="text-sm text-slate-600 mb-1">This Month</p>
                  <p className="text-3xl font-bold text-purple-600">{formatCurrency(collections?.month?.collected || 0)}</p>
                  <p className="text-xs text-slate-600 mt-1">
                    {collections?.month?.collection_rate || 0}% of target
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Daily Collections Chart */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Weekly Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={collections?.daily_breakdown || []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Bar dataKey="collected" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Settlements */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Settlement Report</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Pending Settlement</span>
                    <Clock className="h-4 w-4 text-orange-500" />
                  </div>
                  <p className="text-2xl font-bold">{formatCurrency(settlements?.pending_settlement || 0)}</p>
                  <p className="text-xs text-slate-600 mt-1">
                    Next: {settlements?.next_settlement_date ? new Date(settlements.next_settlement_date).toLocaleDateString() : 'N/A'}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Commission Earned</span>
                    <DollarSign className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(settlements?.commission_earned || 0)}</p>
                  <p className="text-xs text-slate-600 mt-1">
                    {settlements?.commission_rate || 0}% commission rate
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-3">Recent Settlements</p>
                  <div className="space-y-2">
                    {settlements?.settlement_history?.slice(0, 3).map((settlement, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                        <div>
                          <p className="text-sm font-medium">{new Date(settlement.date).toLocaleDateString()}</p>
                          <p className="text-xs text-slate-600">{formatCurrency(settlement.commission)} commission</p>
                        </div>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                    ))}
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
