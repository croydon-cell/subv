'use client';

import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatsCard } from '@/components/StatsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  AlertTriangle,
  RefreshCw,
  Trophy,
  MessageSquare,
  Target,
  Zap
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  RadialBarChart,
  RadialBar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

export default function MerchantDashboard() {
  const [collections, setCollections] = useState(null);
  const [retryAnalytics, setRetryAnalytics] = useState(null);
  const [churnPredictions, setChurnPredictions] = useState([]);
  const [lcoPerformance, setLcoPerformance] = useState([]);
  const [reminders, setReminders] = useState(null);
  const [revenueForecast, setRevenueForecast] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    // Demo data
    setTimeout(() => {
      setCollections({
        total_collected: 2450000,
        collection_rate: 87.5,
        total_due: 2800000,
        recovery_rate: 65.2,
        total_recovered: 450000,
        total_failed: 350000,
        today_collections: 125000,
        monthly_trend: [
          { month: 'Jul', collected: 2200000, failed: 280000, recovered: 180000 },
          { month: 'Aug', collected: 2350000, failed: 320000, recovered: 220000 },
          { month: 'Sep', collected: 2180000, failed: 380000, recovered: 280000 },
          { month: 'Oct', collected: 2450000, failed: 350000, recovered: 450000 }
        ]
      });
      setRetryAnalytics({
        success_rate: 68.5,
        total_retries: 1250,
        successful_retries: 856,
        avg_retry_time: 2.5,
        failure_reasons: [
          { reason: 'Insufficient Balance', count: 450, percentage: 36, recovery_rate: 72 },
          { reason: 'Card Expired', count: 280, percentage: 22, recovery_rate: 45 },
          { reason: 'Technical Error', count: 320, percentage: 26, recovery_rate: 85 },
          { reason: 'User Cancelled', count: 200, percentage: 16, recovery_rate: 25 }
        ],
        retry_timing: [
          { hour: '9 AM', success_rate: 75 },
          { hour: '12 PM', success_rate: 82 },
          { hour: '3 PM', success_rate: 68 },
          { hour: '6 PM', success_rate: 71 },
          { hour: '9 PM', success_rate: 65 }
        ]
      });
      setChurnPredictions([
        { id: 1, subscriber_name: 'Amit Sharma', subscriber_id: 'SUB-001', plan_amount: 599, risk_score: 85, risk_level: 'high', predicted_churn_date: '2024-11-20', factors: ['Payment Failures', 'Service Complaints', 'Usage Drop'], recommended_action: 'Offer 20% discount and priority support' },
        { id: 2, subscriber_name: 'Priya Patel', subscriber_id: 'SUB-002', plan_amount: 799, risk_score: 72, risk_level: 'medium', predicted_churn_date: '2024-12-05', factors: ['Late Payments', 'Competitor Activity'], recommended_action: 'Send retention offer with upgraded features' }
      ]);
      setLcoPerformance([
        { id: 1, name: 'Rajesh Kumar', area: 'Sector 15, Noida', rank: 1, total_subscribers: 850, collection_rate: 94.5, avg_collection_time: 2.1, monthly_revenue: 425000, churn_rate: 4.2 },
        { id: 2, name: 'Suresh Gupta', area: 'Lajpat Nagar, Delhi', rank: 2, total_subscribers: 720, collection_rate: 91.2, avg_collection_time: 2.8, monthly_revenue: 380000, churn_rate: 6.1 },
        { id: 3, name: 'Vikram Singh', area: 'Bandra West, Mumbai', rank: 3, total_subscribers: 950, collection_rate: 89.8, avg_collection_time: 3.2, monthly_revenue: 520000, churn_rate: 7.8 }
      ]);
      setReminders({
        by_channel: [
          { channel: 'SMS', sent: 2500, conversions: 425, rate: 17, cost_per_conversion: 12 },
          { channel: 'WhatsApp', sent: 1800, conversions: 540, rate: 30, cost_per_conversion: 8 },
          { channel: 'Email', sent: 3200, conversions: 384, rate: 12, cost_per_conversion: 15 },
          { channel: 'Voice Call', sent: 850, conversions: 340, rate: 40, cost_per_conversion: 25 }
        ],
        by_timing: [
          { time: '9 AM', rate: 22 },
          { time: '12 PM', rate: 28 },
          { time: '3 PM', rate: 18 },
          { time: '6 PM', rate: 35 },
          { time: '9 PM', rate: 25 }
        ]
      });
      setRevenueForecast({
        current_month_actual: 2450000,
        current_month_forecast: 2650000,
        next_month_forecast: 2850000,
        forecast_confidence: 87,
        monthly_forecast: [
          { month: 'Jul', actual: 2200000, forecast: 2180000 },
          { month: 'Aug', actual: 2350000, forecast: 2320000 },
          { month: 'Sep', actual: 2180000, forecast: 2250000 },
          { month: 'Oct', actual: 2450000, forecast: 2400000 },
          { month: 'Nov', actual: null, forecast: 2650000 },
          { month: 'Dec', actual: null, forecast: 2850000 }
        ],
        factors: [
          { factor: 'Seasonal Growth', impact: '+12%', confidence: 85 },
          { factor: 'New Subscribers', impact: '+8%', confidence: 92 },
          { factor: 'Churn Rate', impact: '-5%', confidence: 78 },
          { factor: 'Price Changes', impact: '+3%', confidence: 65 }
        ]
      });
      setLoading(false);
    }, 1000);
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
      <DashboardLayout currentRole="merchant_admin">
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
    <DashboardLayout currentRole="merchant_admin">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Merchant Dashboard
            </h1>
            <p className="text-slate-600 mt-2">Collections, AI Insights & Performance Analytics</p>
          </div>
          <Button onClick={fetchDashboardData} className="bg-gradient-to-r from-blue-600 to-indigo-600">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Collected"
            value={formatCurrency(collections?.total_collected || 0)}
            icon={DollarSign}
            trendValue={15.3}
            gradient={true}
          />
          <StatsCard
            title="Collection Rate"
            value={`${collections?.collection_rate || 0}%`}
            icon={Target}
            subtitle={`${formatCurrency(collections?.total_due || 0)} due`}
          />
          <StatsCard
            title="Recovery Rate"
            value={`${collections?.recovery_rate || 0}%`}
            icon={Zap}
            subtitle={`${formatCurrency(collections?.total_recovered || 0)} recovered`}
          />
          <StatsCard
            title="AI Retry Success"
            value={`${retryAnalytics?.success_rate || 0}%`}
            icon={TrendingUp}
            subtitle={`${formatNumber(retryAnalytics?.successful_retries || 0)} successful`}
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="collections" className="space-y-6">
          <TabsList className="bg-white border shadow-sm">
            <TabsTrigger value="collections">Collections</TabsTrigger>
            <TabsTrigger value="retry">AI Retry Analytics</TabsTrigger>
            <TabsTrigger value="churn">Churn Predictions</TabsTrigger>
            <TabsTrigger value="lco">LCO Performance</TabsTrigger>
            <TabsTrigger value="reminders">Reminders</TabsTrigger>
            <TabsTrigger value="forecast">Revenue Forecast</TabsTrigger>
          </TabsList>

          {/* Collections Tab */}
          <TabsContent value="collections" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Trend */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Collections Trend</CardTitle>
                  <CardDescription>Monthly performance overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart data={collections?.monthly_trend || []}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="collected"
                        fill="url(#colorCollected)"
                        stroke="#3b82f6"
                        name="Collected"
                      />
                      <Bar dataKey="failed" fill="#ef4444" name="Failed" />
                      <Line type="monotone" dataKey="recovered" stroke="#10b981" strokeWidth={3} name="Recovered" />
                      <defs>
                        <linearGradient id="colorCollected" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Collection Breakdown */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Collection Breakdown</CardTitle>
                  <CardDescription>Current status distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Collected</span>
                        <span className="text-sm text-slate-600">{formatCurrency(collections?.total_collected || 0)}</span>
                      </div>
                      <Progress value={collections?.collection_rate || 0} className="h-3" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Failed</span>
                        <span className="text-sm text-slate-600">{formatCurrency(collections?.total_failed || 0)}</span>
                      </div>
                      <Progress value={15} className="h-3 bg-red-100" indicatorClassName="bg-red-500" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Recovered</span>
                        <span className="text-sm text-slate-600">{formatCurrency(collections?.total_recovered || 0)}</span>
                      </div>
                      <Progress value={collections?.recovery_rate || 0} className="h-3 bg-green-100" indicatorClassName="bg-green-500" />
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Today's Collections</span>
                        <span className="text-lg font-bold text-blue-600">{formatCurrency(collections?.today_collections || 0)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Retry Analytics Tab */}
          <TabsContent value="retry" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Failure Reasons */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Failure Reasons & Recovery</CardTitle>
                  <CardDescription>AI-powered failure analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[350px]">
                    <div className="space-y-4">
                      {retryAnalytics?.failure_reasons?.map((reason, index) => (
                        <div key={index} className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm">{reason.reason}</span>
                            <Badge variant={reason.recovery_rate > 50 ? 'success' : 'destructive'}>
                              {reason.recovery_rate}% recovery
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                            <span>{formatNumber(reason.count)} failures</span>
                            <span>{reason.percentage}% of total</span>
                          </div>
                          <Progress value={reason.recovery_rate} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Retry Timing */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Best Retry Timing</CardTitle>
                  <CardDescription>Success rate by time of day</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={retryAnalytics?.retry_timing || []}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="success_rate" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Success Rate %" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Retry Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center p-6 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                    <p className="text-sm text-slate-600 mb-2">Total Retries</p>
                    <p className="text-3xl font-bold text-blue-600">{formatNumber(retryAnalytics?.total_retries || 0)}</p>
                  </div>
                  <div className="text-center p-6 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50">
                    <p className="text-sm text-slate-600 mb-2">Successful</p>
                    <p className="text-3xl font-bold text-green-600">{formatNumber(retryAnalytics?.successful_retries || 0)}</p>
                  </div>
                  <div className="text-center p-6 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50">
                    <p className="text-sm text-slate-600 mb-2">Success Rate</p>
                    <p className="text-3xl font-bold text-purple-600">{retryAnalytics?.success_rate || 0}%</p>
                  </div>
                  <div className="text-center p-6 rounded-lg bg-gradient-to-br from-orange-50 to-amber-50">
                    <p className="text-sm text-slate-600 mb-2">Avg Retry Time</p>
                    <p className="text-3xl font-bold text-orange-600">{retryAnalytics?.avg_retry_time || 0}h</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Churn Predictions Tab */}
          <TabsContent value="churn" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>AI Churn Predictions</CardTitle>
                <CardDescription>Subscribers at risk of churning</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-4">
                    {churnPredictions.map((prediction) => (
                      <Card key={prediction.id} className="border-l-4" style={{
                        borderLeftColor: prediction.risk_level === 'high' ? '#ef4444' : prediction.risk_level === 'medium' ? '#f59e0b' : '#10b981'
                      }}>
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="font-semibold text-lg">{prediction.subscriber_name}</h4>
                              <p className="text-sm text-slate-600">{prediction.subscriber_id} • {formatCurrency(prediction.plan_amount)}/month</p>
                            </div>
                            <div className="text-right">
                              <Badge variant={
                                prediction.risk_level === 'high' ? 'destructive' :
                                prediction.risk_level === 'medium' ? 'warning' : 'success'
                              }>
                                {prediction.risk_score} Risk Score
                              </Badge>
                              {prediction.predicted_churn_date && (
                                <p className="text-xs text-slate-500 mt-1">
                                  Predicted: {new Date(prediction.predicted_churn_date).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <p className="text-xs font-medium text-slate-600 mb-2">Risk Factors:</p>
                            <div className="flex flex-wrap gap-2">
                              {prediction.factors.map((factor, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {factor}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                            <p className="text-xs font-medium text-blue-900 mb-1">Recommended Action:</p>
                            <p className="text-sm text-blue-700">{prediction.recommended_action}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* LCO Performance Tab */}
          <TabsContent value="lco" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                  LCO Performance Leaderboard
                </CardTitle>
                <CardDescription>Ranked by collection rate and revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lcoPerformance.map((lco) => (
                    <Card key={lco.id} className={`transition-all duration-300 hover:shadow-xl ${
                      lco.rank === 1 ? 'border-2 border-yellow-400 bg-gradient-to-r from-yellow-50 to-amber-50' : ''
                    }`}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-lg ${
                              lco.rank === 1 ? 'bg-yellow-400 text-white' :
                              lco.rank === 2 ? 'bg-slate-300 text-white' :
                              lco.rank === 3 ? 'bg-amber-600 text-white' :
                              'bg-slate-200 text-slate-600'
                            }`}>
                              #{lco.rank}
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg">{lco.name}</h4>
                              <p className="text-sm text-slate-600">{lco.area}</p>
                            </div>
                          </div>
                          {lco.rank === 1 && <Trophy className="h-8 w-8 text-yellow-500" />}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                          <div>
                            <p className="text-xs text-slate-600">Subscribers</p>
                            <p className="text-lg font-semibold">{formatNumber(lco.total_subscribers)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-600">Collection Rate</p>
                            <p className="text-lg font-semibold text-green-600">{lco.collection_rate}%</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-600">Avg Time</p>
                            <p className="text-lg font-semibold">{lco.avg_collection_time} days</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-600">Revenue</p>
                            <p className="text-lg font-semibold">{formatCurrency(lco.monthly_revenue)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-600">Churn Rate</p>
                            <p className={`text-lg font-semibold ${lco.churn_rate > 10 ? 'text-red-600' : 'text-green-600'}`}>
                              {lco.churn_rate}%
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reminders Tab */}
          <TabsContent value="reminders" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* By Channel */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Reminder Effectiveness by Channel</CardTitle>
                  <CardDescription>Conversion rates across channels</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={reminders?.by_channel || []}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="channel" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="rate" fill="#8b5cf6" radius={[8, 8, 0, 0]} name="Conversion Rate %" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* By Timing */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Best Reminder Timing</CardTitle>
                  <CardDescription>Success rate by time of day</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={reminders?.by_timing || []}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="rate"
                        fill="url(#colorRate)"
                        stroke="#3b82f6"
                        name="Success Rate %"
                      />
                      <defs>
                        <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Channel Details */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Channel Performance Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reminders?.by_channel?.map((channel, index) => (
                    <div key={index} className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{channel.channel}</h4>
                          <p className="text-sm text-slate-600">
                            {formatNumber(channel.sent)} sent • {formatNumber(channel.conversions)} conversions
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600">{channel.rate}%</p>
                          <p className="text-xs text-slate-600">\u20b9{channel.cost_per_conversion}/conversion</p>
                        </div>
                      </div>
                      <Progress value={channel.rate} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Revenue Forecast Tab */}
          <TabsContent value="forecast" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <StatsCard
                title="Current Month (Actual)"
                value={formatCurrency(revenueForecast?.current_month_actual || 0)}
                icon={DollarSign}
              />
              <StatsCard
                title="Current Month (Forecast)"
                value={formatCurrency(revenueForecast?.current_month_forecast || 0)}
                icon={Target}
              />
              <StatsCard
                title="Next Month Forecast"
                value={formatCurrency(revenueForecast?.next_month_forecast || 0)}
                icon={TrendingUp}
                subtitle={`${revenueForecast?.forecast_confidence || 0}% confidence`}
              />
            </div>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Revenue Forecast Trend</CardTitle>
                <CardDescription>Historical vs Predicted</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={revenueForecast?.monthly_forecast || []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="actual"
                      fill="url(#colorActual)"
                      stroke="#3b82f6"
                      name="Actual Revenue"
                    />
                    <Line
                      type="monotone"
                      dataKey="forecast"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      strokeDasharray="5 5"
                      name="Forecasted Revenue"
                    />
                    <defs>
                      <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Forecast Factors</CardTitle>
                <CardDescription>Key drivers affecting revenue prediction</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {revenueForecast?.factors?.map((factor, index) => (
                    <div key={index} className="p-4 rounded-lg bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{factor.factor}</span>
                        <Badge variant={factor.impact.startsWith('+') ? 'success' : 'destructive'}>
                          {factor.impact}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Confidence</span>
                        <span className="text-sm font-medium">{factor.confidence}%</span>
                      </div>
                      <Progress value={factor.confidence} className="h-2 mt-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
