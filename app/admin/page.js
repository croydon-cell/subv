'use client';

import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatsCard } from '@/components/StatsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Users, 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Clock,
  Activity,
  BarChart3,
  PieChart,
  Shield,
  Zap,
  RefreshCw
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  LineChart,
  Line,
  PieChart as RechartsPie,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function SuperAdminDashboard() {
  const [overview, setOverview] = useState(null);
  const [merchants, setMerchants] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [settlements, setSettlements] = useState([]);
  const [systemHealth, setSystemHealth] = useState(null);
  const [merchantAnalytics, setMerchantAnalytics] = useState([]);
  const [verticalAnalytics, setVerticalAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [overviewRes, merchantsRes, alertsRes, settlementsRes, healthRes, merchantAnalyticsRes, verticalAnalyticsRes] = await Promise.all([
        fetch('/api/analytics/overview'),
        fetch('/api/merchants'),
        fetch('/api/alerts?status=active'),
        fetch('/api/settlements'),
        fetch('/api/system-health'),
        fetch('/api/analytics/merchants'),
        fetch('/api/analytics/verticals')
      ]);

      const overviewData = await overviewRes.json();
      const merchantsData = await merchantsRes.json();
      const alertsData = await alertsRes.json();
      const settlementsData = await settlementsRes.json();
      const healthData = await healthRes.json();
      const merchantAnalyticsData = await merchantAnalyticsRes.json();
      const verticalAnalyticsData = await verticalAnalyticsRes.json();

      setOverview(overviewData.data);
      setMerchants(merchantsData.data);
      setAlerts(alertsData.data);
      setSettlements(settlementsData.data);
      setSystemHealth(healthData.data);
      setMerchantAnalytics(merchantAnalyticsData.data);
      setVerticalAnalytics(verticalAnalyticsData.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKycAction = async (merchantId, action) => {
    try {
      const response = await fetch(`/api/merchants/${merchantId}/kyc`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: action })
      });

      const result = await response.json();
      if (result.success) {
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Error updating KYC:', error);
    }
  };

  const handleAlertAction = async (alertId, action) => {
    try {
      const response = await fetch(`/api/alerts/${alertId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: action })
      });

      const result = await response.json();
      if (result.success) {
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Error updating alert:', error);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  if (loading) {
    return (
      <DashboardLayout currentRole="super_admin">
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
    <DashboardLayout currentRole="super_admin">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Super Admin Dashboard
            </h1>
            <p className="text-slate-600 mt-2">Platform oversight and merchant management</p>
          </div>
          <Button onClick={fetchDashboardData} className="bg-gradient-to-r from-blue-600 to-indigo-600">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Merchants"
            value={overview?.total_merchants || 0}
            icon={Users}
            subtitle={`${overview?.active_merchants || 0} active • ${overview?.pending_kyc || 0} pending`}
            gradient={true}
          />
          <StatsCard
            title="Total Subscribers"
            value={formatNumber(overview?.total_subscribers || 0)}
            icon={Users}
            trendValue={overview?.monthly_growth || 0}
          />
          <StatsCard
            title="Total TPV"
            value={formatCurrency(overview?.total_tpv || 0)}
            icon={DollarSign}
            subtitle="Total payment volume"
          />
          <StatsCard
            title="Active Alerts"
            value={overview?.active_alerts || 0}
            icon={AlertTriangle}
            subtitle="Requires attention"
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="merchants">Merchants</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="settlements">Settlements</TabsTrigger>
            <TabsTrigger value="system">System Health</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Vertical Performance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Vertical Performance</CardTitle>
                  <CardDescription>TPV distribution by vertical</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={verticalAnalytics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Legend />
                      <Bar dataKey="tpv" fill="#0088FE" name="Total TPV" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Top Merchants by TPV */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Merchants by TPV</CardTitle>
                  <CardDescription>Revenue leaders</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-4">
                      {merchantAnalytics.slice(0, 5).map((merchant, index) => (
                        <div key={merchant.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium">{merchant.name}</p>
                              <p className="text-xs text-muted-foreground">{merchant.vertical}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{formatCurrency(merchant.tpv)}</p>
                            <p className="text-xs text-muted-foreground">{formatNumber(merchant.active_subscribers)} subs</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Churn Rate Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Churn Rate by Vertical</CardTitle>
                <CardDescription>Lower is better</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={verticalAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="avg_churn" fill="#FF8042" name="Avg Churn Rate (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Merchants Tab */}
          <TabsContent value="merchants" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Merchant Management</CardTitle>
                <CardDescription>Onboarding and KYC approval</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-4">
                    {merchants.map((merchant) => (
                      <Card key={merchant.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between">
                            <div className="space-y-3 flex-1">
                              <div className="flex items-center space-x-3">
                                <h3 className="text-lg font-semibold">{merchant.name}</h3>
                                <Badge variant={merchant.kyc_status === 'approved' ? 'success' : merchant.kyc_status === 'pending' ? 'warning' : 'destructive'}>
                                  {merchant.kyc_status}
                                </Badge>
                                <Badge variant="outline">{merchant.vertical}</Badge>
                              </div>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <p className="text-muted-foreground">Subscribers</p>
                                  <p className="font-medium">{formatNumber(merchant.active_subscribers)}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">TPV</p>
                                  <p className="font-medium">{formatCurrency(merchant.tpv)}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Churn Rate</p>
                                  <p className="font-medium">{merchant.churn_rate}%</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Growth</p>
                                  <p className="font-medium text-green-600">+{merchant.monthly_growth}%</p>
                                </div>
                              </div>

                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <span>{merchant.contact_email}</span>
                                <span>{merchant.contact_phone}</span>
                              </div>
                            </div>

                            {merchant.kyc_status === 'pending' && (
                              <div className="flex space-x-2 ml-4">
                                <Button 
                                  size="sm" 
                                  onClick={() => handleKycAction(merchant.id, 'approved')}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="destructive"
                                  onClick={() => handleKycAction(merchant.id, 'rejected')}
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Merchant Health Scores */}
              <Card>
                <CardHeader>
                  <CardTitle>Merchant Health Scores</CardTitle>
                  <CardDescription>Based on churn, growth, and TPV</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-4">
                      {merchantAnalytics.map((merchant) => (
                        <div key={merchant.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{merchant.name}</span>
                            <span className="text-sm font-bold">{merchant.health_score.toFixed(0)}/100</span>
                          </div>
                          <Progress value={merchant.health_score} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* ARPU by Vertical */}
              <Card>
                <CardHeader>
                  <CardTitle>Average ARPU by Vertical</CardTitle>
                  <CardDescription>Revenue per user</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={verticalAnalytics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="subscribers" fill="#0088FE" name="Total Subscribers" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Growth Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Growth Trends</CardTitle>
                <CardDescription>Subscriber growth by vertical</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={verticalAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="avg_growth" stroke="#00C49F" name="Avg Growth (%)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk & Fraud Alerts</CardTitle>
                <CardDescription>Active alerts requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-4">
                    {alerts.map((alert) => (
                      <Alert key={alert.id} variant={alert.severity === 'high' ? 'destructive' : 'default'}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <AlertTriangle className="h-4 w-4" />
                              <AlertTitle className="mb-0">
                                {alert.type.toUpperCase()} - {alert.merchant_name}
                              </AlertTitle>
                              <Badge variant={alert.severity === 'high' ? 'destructive' : alert.severity === 'medium' ? 'warning' : 'secondary'}>
                                {alert.severity}
                              </Badge>
                            </div>
                            <AlertDescription>{alert.message}</AlertDescription>
                            <p className="text-xs text-muted-foreground mt-2">
                              {new Date(alert.created_at).toLocaleString()}
                            </p>
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleAlertAction(alert.id, 'resolved')}
                          >
                            Resolve
                          </Button>
                        </div>
                      </Alert>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settlements Tab */}
          <TabsContent value="settlements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Settlement Oversight</CardTitle>
                <CardDescription>Merchant payouts and settlement tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {settlements.map((settlement) => (
                    <Card key={settlement.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center space-x-3">
                              <h4 className="font-semibold">{settlement.merchant_name}</h4>
                              <Badge variant={settlement.status === 'completed' ? 'success' : settlement.status === 'processing' ? 'warning' : 'secondary'}>
                                {settlement.status}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">Amount</p>
                                <p className="font-medium text-lg">{formatCurrency(settlement.amount)}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Transactions</p>
                                <p className="font-medium">{formatNumber(settlement.transaction_count)}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Payout Date</p>
                                <p className="font-medium">{new Date(settlement.payout_date).toLocaleDateString()}</p>
                              </div>
                            </div>
                          </div>
                          {settlement.status === 'completed' && (
                            <CheckCircle className="h-6 w-6 text-green-600" />
                          )}
                          {settlement.status === 'processing' && (
                            <Clock className="h-6 w-6 text-orange-500 animate-pulse" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Health Tab */}
          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>API Uptime</CardTitle>
                  <CardDescription>System availability</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold">{systemHealth?.api_uptime}%</span>
                      <Activity className="h-8 w-8 text-green-600" />
                    </div>
                    <Progress value={systemHealth?.api_uptime} className="h-3" />
                    <p className="text-sm text-muted-foreground">Last 30 days</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Integration Status</CardTitle>
                  <CardDescription>Third-party services</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4" />
                        <span className="font-medium">Razorpay</span>
                      </div>
                      <Badge variant="success">{systemHealth?.razorpay_status}</Badge>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4" />
                        <span className="font-medium">Supabase</span>
                      </div>
                      <Badge variant="success">{systemHealth?.supabase_status}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Today's statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Avg Response Time</span>
                        <span className="text-sm font-medium">{systemHealth?.avg_response_time}ms</span>
                      </div>
                      <Progress value={Math.min((systemHealth?.avg_response_time / 500) * 100, 100)} className="h-2" />
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Total Requests</p>
                        <p className="text-2xl font-bold">{formatNumber(systemHealth?.total_requests_today)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Failed Requests</p>
                        <p className="text-2xl font-bold">{systemHealth?.failed_requests_today}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Last Updated</CardTitle>
                  <CardDescription>System health check</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm font-medium">
                        {new Date(systemHealth?.last_updated).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
