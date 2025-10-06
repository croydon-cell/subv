import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// ============ SUPER ADMIN MOCK DATA ============
const mockMerchants = [
  {
    id: '1',
    name: 'VisionNet Cable',
    vertical: 'Cable/DTH',
    kyc_status: 'approved',
    active_subscribers: 12500,
    tpv: 4250000,
    churn_rate: 8.5,
    monthly_growth: 12.3,
    avg_arpu: 340,
    created_at: '2024-01-15',
    contact_email: 'admin@visionnet.com',
    contact_phone: '+91 9876543210'
  },
  {
    id: '2',
    name: 'FiberLink ISP',
    vertical: 'ISP',
    kyc_status: 'approved',
    active_subscribers: 8900,
    tpv: 5340000,
    churn_rate: 5.2,
    monthly_growth: 18.7,
    avg_arpu: 600,
    created_at: '2024-02-20',
    contact_email: 'ops@fiberlink.com',
    contact_phone: '+91 9876543211'
  },
  {
    id: '3',
    name: 'PowerFit Gyms',
    vertical: 'Gym/Fitness',
    kyc_status: 'approved',
    active_subscribers: 3400,
    tpv: 1360000,
    churn_rate: 15.8,
    monthly_growth: 8.5,
    avg_arpu: 400,
    created_at: '2024-05-10',
    contact_email: 'hello@powerfit.com',
    contact_phone: '+91 9876543212'
  },
  {
    id: '4',
    name: 'MetroWave Cable',
    vertical: 'Cable/DTH',
    kyc_status: 'rejected',
    active_subscribers: 0,
    tpv: 0,
    churn_rate: 0,
    monthly_growth: 0,
    avg_arpu: 0,
    created_at: '2024-05-25',
    contact_email: 'info@metrowave.com',
    contact_phone: '+91 9876543213'
  },
  {
    id: '5',
    name: 'SpeedNet ISP',
    vertical: 'ISP',
    kyc_status: 'approved',
    active_subscribers: 15600,
    tpv: 9360000,
    churn_rate: 6.8,
    monthly_growth: 15.2,
    avg_arpu: 600,
    created_at: '2024-03-05',
    contact_email: 'admin@speednet.com',
    contact_phone: '+91 9876543214'
  }
];

const mockAlerts = [
  {
    id: '1',
    type: 'fraud',
    severity: 'high',
    merchant_id: '1',
    merchant_name: 'VisionNet Cable',
    message: 'Unusual payment pattern detected: 15 failed payments from same IP',
    created_at: new Date().toISOString(),
    status: 'active'
  },
  {
    id: '2',
    type: 'churn',
    severity: 'medium',
    merchant_id: '3',
    merchant_name: 'PowerFit Gyms',
    message: 'Churn rate increased by 23% in last 7 days',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: 'active'
  },
  {
    id: '3',
    type: 'settlement',
    severity: 'low',
    merchant_id: '2',
    merchant_name: 'FiberLink ISP',
    message: 'Settlement delayed by 2 hours due to bank processing',
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    status: 'resolved'
  },
  {
    id: '4',
    type: 'risk',
    severity: 'high',
    merchant_id: '1',
    merchant_name: 'VisionNet Cable',
    message: 'High value transaction (₹2.5L) flagged for manual review',
    created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    status: 'active'
  }
];

const mockSettlements = [
  {
    id: '1',
    merchant_id: '1',
    merchant_name: 'VisionNet Cable',
    amount: 425000,
    status: 'completed',
    payout_date: '2024-06-01',
    transaction_count: 1250,
    created_at: '2024-06-01T10:30:00Z'
  },
  {
    id: '2',
    merchant_id: '2',
    merchant_name: 'FiberLink ISP',
    amount: 534000,
    status: 'processing',
    payout_date: '2024-06-02',
    transaction_count: 890,
    created_at: '2024-06-02T08:15:00Z'
  },
  {
    id: '3',
    merchant_id: '5',
    merchant_name: 'SpeedNet ISP',
    amount: 936000,
    status: 'pending',
    payout_date: '2024-06-03',
    transaction_count: 1560,
    created_at: '2024-06-03T09:00:00Z'
  },
  {
    id: '4',
    merchant_id: '3',
    merchant_name: 'PowerFit Gyms',
    amount: 136000,
    status: 'completed',
    payout_date: '2024-06-01',
    transaction_count: 340,
    created_at: '2024-06-01T11:45:00Z'
  }
];

const mockSystemHealth = {
  api_uptime: 99.98,
  razorpay_status: 'operational',
  supabase_status: 'operational',
  avg_response_time: 145,
  total_requests_today: 45678,
  failed_requests_today: 23,
  last_updated: new Date().toISOString()
};

// ============ MERCHANT ADMIN MOCK DATA ============
const mockCollections = {
  total_due: 2850000,
  total_collected: 2425000,
  total_failed: 425000,
  total_recovered: 168000,
  collection_rate: 85.1,
  recovery_rate: 39.5,
  pending_amount: 425000,
  today_collections: 145000,
  monthly_trend: [
    { month: 'Jan', collected: 1850000, failed: 245000, recovered: 95000 },
    { month: 'Feb', collected: 2100000, failed: 320000, recovered: 125000 },
    { month: 'Mar', collected: 2350000, failed: 285000, recovered: 142000 },
    { month: 'Apr', collected: 2150000, failed: 380000, recovered: 158000 },
    { month: 'May', collected: 2425000, failed: 425000, recovered: 168000 },
    { month: 'Jun', collected: 2650000, failed: 390000, recovered: 175000 }
  ]
};

const mockRetryAnalytics = {
  total_retries: 3420,
  successful_retries: 1352,
  success_rate: 39.5,
  avg_retry_time: 4.2,
  failure_reasons: [
    { reason: 'Insufficient Funds', count: 1845, percentage: 54, recovery_rate: 42 },
    { reason: 'Bank Downtime', count: 685, percentage: 20, recovery_rate: 68 },
    { reason: 'Mandate Revoked', count: 478, percentage: 14, recovery_rate: 12 },
    { reason: 'Technical Error', count: 275, percentage: 8, recovery_rate: 85 },
    { reason: 'Others', count: 137, percentage: 4, recovery_rate: 35 }
  ],
  retry_timing: [
    { hour: '9 AM', success_rate: 45, attempts: 420 },
    { hour: '12 PM', success_rate: 52, attempts: 580 },
    { hour: '3 PM', success_rate: 38, attempts: 360 },
    { hour: '6 PM', success_rate: 48, attempts: 520 },
    { hour: '9 PM', success_rate: 35, attempts: 290 }
  ]
};

const mockChurnPredictions = [
  {
    id: '1',
    subscriber_name: 'Rajesh Kumar',
    subscriber_id: 'SUB-001',
    plan_amount: 599,
    risk_score: 85,
    risk_level: 'high',
    factors: ['3 failed payments', 'No payment in 15 days', 'Declining usage'],
    predicted_churn_date: '2024-06-15',
    recommended_action: 'Send personalized offer + manual call'
  },
  {
    id: '2',
    subscriber_name: 'Priya Sharma',
    subscriber_id: 'SUB-002',
    plan_amount: 399,
    risk_score: 72,
    risk_level: 'high',
    factors: ['2 failed payments', 'Usage dropped 40%'],
    predicted_churn_date: '2024-06-18',
    recommended_action: 'Offer flexible payment plan'
  },
  {
    id: '3',
    subscriber_name: 'Amit Patel',
    subscriber_id: 'SUB-003',
    plan_amount: 299,
    risk_score: 58,
    risk_level: 'medium',
    factors: ['1 failed payment', 'Late payment history'],
    predicted_churn_date: '2024-06-25',
    recommended_action: 'Send reminder with grace period'
  },
  {
    id: '4',
    subscriber_name: 'Sneha Reddy',
    subscriber_id: 'SUB-004',
    plan_amount: 499,
    risk_score: 42,
    risk_level: 'medium',
    factors: ['Occasional late payments'],
    predicted_churn_date: '2024-07-02',
    recommended_action: 'Enable AutoPay with incentive'
  },
  {
    id: '5',
    subscriber_name: 'Vikram Singh',
    subscriber_id: 'SUB-005',
    plan_amount: 349,
    risk_score: 28,
    risk_level: 'low',
    factors: ['Consistent payment history'],
    predicted_churn_date: null,
    recommended_action: 'Maintain current engagement'
  }
];

const mockLcoPerformance = [
  {
    id: '1',
    name: 'Ramesh LCO',
    area: 'Jayanagar',
    total_subscribers: 450,
    active_subscribers: 425,
    collection_rate: 94.4,
    avg_collection_time: 2.1,
    monthly_revenue: 178000,
    churn_rate: 5.5,
    rank: 1
  },
  {
    id: '2',
    name: 'Suresh Cable',
    area: 'Koramangala',
    total_subscribers: 380,
    active_subscribers: 352,
    collection_rate: 92.6,
    avg_collection_time: 2.8,
    monthly_revenue: 145000,
    churn_rate: 7.4,
    rank: 2
  },
  {
    id: '3',
    name: 'Kumar Networks',
    area: 'Indiranagar',
    total_subscribers: 520,
    active_subscribers: 468,
    collection_rate: 90.0,
    avg_collection_time: 3.2,
    monthly_revenue: 195000,
    churn_rate: 10.0,
    rank: 3
  },
  {
    id: '4',
    name: 'Prakash TV',
    area: 'Whitefield',
    total_subscribers: 290,
    active_subscribers: 255,
    collection_rate: 87.9,
    avg_collection_time: 4.1,
    monthly_revenue: 98000,
    churn_rate: 12.1,
    rank: 4
  },
  {
    id: '5',
    name: 'Venkat Cable',
    area: 'Electronic City',
    total_subscribers: 410,
    active_subscribers: 348,
    collection_rate: 84.9,
    avg_collection_time: 4.8,
    monthly_revenue: 142000,
    churn_rate: 15.1,
    rank: 5
  }
];

const mockReminderEffectiveness = {
  total_reminders_sent: 8450,
  total_conversions: 3285,
  overall_effectiveness: 38.9,
  by_channel: [
    { channel: 'SMS', sent: 3500, conversions: 1575, rate: 45.0, cost_per_conversion: 2.5 },
    { channel: 'WhatsApp', sent: 2800, conversions: 1120, rate: 40.0, cost_per_conversion: 3.2 },
    { channel: 'Email', sent: 1450, conversions: 348, rate: 24.0, cost_per_conversion: 1.8 },
    { channel: 'Push Notification', sent: 700, conversions: 242, rate: 34.6, cost_per_conversion: 0.5 }
  ],
  by_timing: [
    { time: 'Morning (9-11 AM)', sent: 2100, conversions: 945, rate: 45.0 },
    { time: 'Afternoon (12-2 PM)', sent: 1850, conversions: 685, rate: 37.0 },
    { time: 'Evening (5-7 PM)', sent: 2900, conversions: 1160, rate: 40.0 },
    { time: 'Night (8-10 PM)', sent: 1600, conversions: 495, rate: 30.9 }
  ]
};

const mockRevenueForecast = {
  current_month_actual: 2425000,
  current_month_forecast: 2650000,
  next_month_forecast: 2785000,
  forecast_confidence: 87.5,
  monthly_forecast: [
    { month: 'Jan', actual: 1850000, forecast: 1820000 },
    { month: 'Feb', actual: 2100000, forecast: 2080000 },
    { month: 'Mar', actual: 2350000, forecast: 2340000 },
    { month: 'Apr', actual: 2150000, forecast: 2200000 },
    { month: 'May', actual: 2425000, forecast: 2450000 },
    { month: 'Jun', actual: null, forecast: 2650000 },
    { month: 'Jul', actual: null, forecast: 2785000 },
    { month: 'Aug', actual: null, forecast: 2920000 }
  ],
  factors: [
    { factor: 'Subscriber Growth', impact: '+8.5%', confidence: 92 },
    { factor: 'Churn Reduction', impact: '+3.2%', confidence: 85 },
    { factor: 'ARPU Increase', impact: '+2.1%', confidence: 78 },
    { factor: 'Seasonal Trends', impact: '-1.8%', confidence: 88 }
  ]
};

// ============ OPERATOR/LCO MOCK DATA ============
const mockSubscribers = [
  {
    id: 'SUB-001',
    name: 'Rajesh Kumar',
    phone: '+91 9876543210',
    email: 'rajesh@example.com',
    plan: 'Premium Cable - ₹599/month',
    status: 'active',
    expiry_date: '2024-06-20',
    last_payment: '2024-05-20',
    payment_method: 'UPI AutoPay',
    risk_level: 'high',
    days_until_expiry: 14
  },
  {
    id: 'SUB-002',
    name: 'Priya Sharma',
    phone: '+91 9876543211',
    email: 'priya@example.com',
    plan: 'Basic Cable - ₹399/month',
    status: 'active',
    expiry_date: '2024-06-25',
    last_payment: '2024-05-25',
    payment_method: 'Manual UPI',
    risk_level: 'high',
    days_until_expiry: 19
  },
  {
    id: 'SUB-003',
    name: 'Amit Patel',
    phone: '+91 9876543212',
    email: 'amit@example.com',
    plan: 'Standard Cable - ₹299/month',
    status: 'expired',
    expiry_date: '2024-06-01',
    last_payment: '2024-05-01',
    payment_method: 'Cash',
    risk_level: 'medium',
    days_until_expiry: -5
  },
  {
    id: 'SUB-004',
    name: 'Sneha Reddy',
    phone: '+91 9876543213',
    email: 'sneha@example.com',
    plan: 'Premium Plus - ₹799/month',
    status: 'active',
    expiry_date: '2024-07-10',
    last_payment: '2024-06-10',
    payment_method: 'UPI AutoPay',
    risk_level: 'low',
    days_until_expiry: 34
  },
  {
    id: 'SUB-005',
    name: 'Vikram Singh',
    phone: '+91 9876543214',
    email: 'vikram@example.com',
    plan: 'Basic Cable - ₹349/month',
    status: 'active',
    expiry_date: '2024-06-28',
    last_payment: '2024-05-28',
    payment_method: 'Card',
    risk_level: 'low',
    days_until_expiry: 22
  }
];

const mockOperatorCollections = {
  today: {
    collected: 45000,
    pending: 28000,
    target: 65000,
    collection_rate: 69.2
  },
  week: {
    collected: 285000,
    pending: 95000,
    target: 380000,
    collection_rate: 75.0
  },
  month: {
    collected: 1245000,
    pending: 325000,
    target: 1570000,
    collection_rate: 79.3
  },
  daily_breakdown: [
    { day: 'Mon', collected: 38000, pending: 15000 },
    { day: 'Tue', collected: 42000, pending: 18000 },
    { day: 'Wed', collected: 45000, pending: 12000 },
    { day: 'Thu', collected: 48000, pending: 20000 },
    { day: 'Fri', collected: 52000, pending: 16000 },
    { day: 'Sat', collected: 35000, pending: 8000 },
    { day: 'Sun', collected: 25000, pending: 6000 }
  ]
};

const mockOperatorSettlements = {
  pending_settlement: 285000,
  last_settlement: 245000,
  last_settlement_date: '2024-06-01',
  next_settlement_date: '2024-06-08',
  commission_rate: 12,
  commission_earned: 34200,
  settlement_history: [
    { date: '2024-06-01', amount: 245000, commission: 29400, status: 'completed' },
    { date: '2024-05-25', amount: 268000, commission: 32160, status: 'completed' },
    { date: '2024-05-18', amount: 232000, commission: 27840, status: 'completed' },
    { date: '2024-05-11', amount: 255000, commission: 30600, status: 'completed' }
  ]
};

// ============ CUSTOMER MOCK DATA ============
const mockCustomerProfile = {
  id: 'CUST-001',
  name: 'Rajesh Kumar',
  email: 'rajesh@example.com',
  phone: '+91 9876543210',
  subscriber_id: 'SUB-VN-12345',
  plan: {
    name: 'Premium Cable HD',
    amount: 599,
    billing_cycle: 'monthly',
    features: ['200+ Channels', 'HD Quality', 'Sports Pack', 'Movie Channels']
  },
  status: 'active',
  expiry_date: '2024-06-20',
  days_remaining: 14,
  auto_pay_enabled: true,
  next_billing_date: '2024-06-20',
  amount_due: 599
};

const mockCustomerPayments = [
  {
    id: 'PAY-001',
    date: '2024-05-20',
    amount: 599,
    status: 'success',
    method: 'UPI AutoPay',
    transaction_id: 'TXN123456789',
    description: 'Monthly subscription - Premium Cable HD'
  },
  {
    id: 'PAY-002',
    date: '2024-04-20',
    amount: 599,
    status: 'success',
    method: 'UPI',
    transaction_id: 'TXN123456788',
    description: 'Monthly subscription - Premium Cable HD'
  },
  {
    id: 'PAY-003',
    date: '2024-03-20',
    amount: 599,
    status: 'failed',
    method: 'UPI AutoPay',
    transaction_id: 'TXN123456787',
    failure_reason: 'Insufficient funds',
    retry_status: 'Retried successfully on 2024-03-22',
    description: 'Monthly subscription - Premium Cable HD'
  },
  {
    id: 'PAY-004',
    date: '2024-02-20',
    amount: 599,
    status: 'success',
    method: 'Card',
    transaction_id: 'TXN123456786',
    description: 'Monthly subscription - Premium Cable HD'
  },
  {
    id: 'PAY-005',
    date: '2024-01-20',
    amount: 599,
    status: 'success',
    method: 'UPI',
    transaction_id: 'TXN123456785',
    description: 'Monthly subscription - Premium Cable HD'
  }
];

const mockCustomerReminders = [
  {
    id: 'REM-001',
    type: 'upcoming_payment',
    message: 'Your subscription expires in 3 days. Renew now to avoid service interruption.',
    date: '2024-06-17',
    status: 'sent',
    channel: 'SMS'
  },
  {
    id: 'REM-002',
    type: 'payment_due',
    message: 'Payment of ₹599 is due today. Pay now to continue enjoying your service.',
    date: '2024-06-20',
    status: 'pending',
    channel: 'WhatsApp'
  },
  {
    id: 'REM-003',
    type: 'retry_scheduled',
    message: 'Your AutoPay retry is scheduled for tomorrow at 9 AM.',
    date: '2024-06-21',
    status: 'scheduled',
    channel: 'Push Notification'
  }
];

// ============ API ROUTE HANDLER ============
export async function GET(request) {
  const { pathname, searchParams } = new URL(request.url);
  const path = pathname.replace('/api/', '');

  try {
    // ============ SUPER ADMIN ENDPOINTS ============
    if (path === 'merchants') {
      const status = searchParams.get('kyc_status');
      const vertical = searchParams.get('vertical');
      let filtered = [...mockMerchants];
      if (status) filtered = filtered.filter(m => m.kyc_status === status);
      if (vertical) filtered = filtered.filter(m => m.vertical === vertical);
      return NextResponse.json({ success: true, data: filtered, total: filtered.length });
    }

    if (path.startsWith('merchants/') && path.split('/').length === 2) {
      const id = path.split('/')[1];
      const merchant = mockMerchants.find(m => m.id === id);
      if (!merchant) {
        return NextResponse.json({ success: false, error: 'Merchant not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: merchant });
    }

    if (path === 'analytics/overview') {
      const totalMerchants = mockMerchants.length;
      const activeMerchants = mockMerchants.filter(m => m.kyc_status === 'approved').length;
      const pendingKyc = mockMerchants.filter(m => m.kyc_status === 'pending').length;
      const totalSubscribers = mockMerchants.reduce((sum, m) => sum + m.active_subscribers, 0);
      const totalTpv = mockMerchants.reduce((sum, m) => sum + m.tpv, 0);
      const avgChurnRate = mockMerchants.reduce((sum, m) => sum + m.churn_rate, 0) / totalMerchants;
      
      return NextResponse.json({
        success: true,
        data: {
          total_merchants: totalMerchants,
          active_merchants: activeMerchants,
          pending_kyc: pendingKyc,
          total_subscribers: totalSubscribers,
          total_tpv: totalTpv,
          avg_churn_rate: avgChurnRate.toFixed(2),
          active_alerts: mockAlerts.filter(a => a.status === 'active').length,
          monthly_growth: 14.2
        }
      });
    }

    if (path === 'analytics/merchants') {
      const performanceData = mockMerchants
        .filter(m => m.kyc_status === 'approved')
        .map(m => ({
          id: m.id,
          name: m.name,
          vertical: m.vertical,
          active_subscribers: m.active_subscribers,
          tpv: m.tpv,
          churn_rate: m.churn_rate,
          monthly_growth: m.monthly_growth,
          avg_arpu: m.avg_arpu,
          health_score: Math.max(0, 100 - (m.churn_rate * 2) + (m.monthly_growth * 0.5))
        }))
        .sort((a, b) => b.tpv - a.tpv);
      
      return NextResponse.json({ success: true, data: performanceData });
    }

    if (path === 'analytics/verticals') {
      const verticals = {};
      mockMerchants.filter(m => m.kyc_status === 'approved').forEach(m => {
        if (!verticals[m.vertical]) {
          verticals[m.vertical] = {
            name: m.vertical,
            merchants: 0,
            subscribers: 0,
            tpv: 0,
            avg_churn: 0,
            avg_growth: 0
          };
        }
        verticals[m.vertical].merchants += 1;
        verticals[m.vertical].subscribers += m.active_subscribers;
        verticals[m.vertical].tpv += m.tpv;
        verticals[m.vertical].avg_churn += m.churn_rate;
        verticals[m.vertical].avg_growth += m.monthly_growth;
      });
      
      const verticalData = Object.values(verticals).map(v => ({
        ...v,
        avg_churn: (v.avg_churn / v.merchants).toFixed(2),
        avg_growth: (v.avg_growth / v.merchants).toFixed(2)
      }));
      
      return NextResponse.json({ success: true, data: verticalData });
    }

    if (path === 'alerts') {
      const status = searchParams.get('status');
      const severity = searchParams.get('severity');
      let filtered = [...mockAlerts];
      if (status) filtered = filtered.filter(a => a.status === status);
      if (severity) filtered = filtered.filter(a => a.severity === severity);
      return NextResponse.json({ success: true, data: filtered, total: filtered.length });
    }

    if (path === 'settlements') {
      const status = searchParams.get('status');
      let filtered = [...mockSettlements];
      if (status) filtered = filtered.filter(s => s.status === status);
      return NextResponse.json({ success: true, data: filtered, total: filtered.length });
    }

    if (path === 'system-health') {
      return NextResponse.json({ success: true, data: mockSystemHealth });
    }

    // ============ MERCHANT ADMIN ENDPOINTS ============
    if (path === 'merchant-admin/collections') {
      return NextResponse.json({ success: true, data: mockCollections });
    }

    if (path === 'merchant-admin/retry-analytics') {
      return NextResponse.json({ success: true, data: mockRetryAnalytics });
    }

    if (path === 'merchant-admin/churn-predictions') {
      const riskLevel = searchParams.get('risk_level');
      let filtered = [...mockChurnPredictions];
      if (riskLevel) filtered = filtered.filter(p => p.risk_level === riskLevel);
      return NextResponse.json({ success: true, data: filtered, total: filtered.length });
    }

    if (path === 'merchant-admin/lco-performance') {
      return NextResponse.json({ success: true, data: mockLcoPerformance });
    }

    if (path === 'merchant-admin/reminders') {
      return NextResponse.json({ success: true, data: mockReminderEffectiveness });
    }

    if (path === 'merchant-admin/revenue-forecast') {
      return NextResponse.json({ success: true, data: mockRevenueForecast });
    }

    // ============ OPERATOR/LCO ENDPOINTS ============
    if (path === 'operator/subscribers') {
      const status = searchParams.get('status');
      const riskLevel = searchParams.get('risk_level');
      let filtered = [...mockSubscribers];
      if (status) filtered = filtered.filter(s => s.status === status);
      if (riskLevel) filtered = filtered.filter(s => s.risk_level === riskLevel);
      return NextResponse.json({ success: true, data: filtered, total: filtered.length });
    }

    if (path === 'operator/collections') {
      return NextResponse.json({ success: true, data: mockOperatorCollections });
    }

    if (path === 'operator/settlements') {
      return NextResponse.json({ success: true, data: mockOperatorSettlements });
    }

    // ============ CUSTOMER ENDPOINTS ============
    if (path === 'customer/profile') {
      return NextResponse.json({ success: true, data: mockCustomerProfile });
    }

    if (path === 'customer/payments') {
      return NextResponse.json({ success: true, data: mockCustomerPayments });
    }

    if (path === 'customer/reminders') {
      return NextResponse.json({ success: true, data: mockCustomerReminders });
    }

    return NextResponse.json({ success: false, error: 'Endpoint not found' }, { status: 404 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  const { pathname } = new URL(request.url);
  const path = pathname.replace('/api/', '');

  try {
    const body = await request.json();

    if (path === 'merchants') {
      const newMerchant = {
        id: uuidv4(),
        name: body.name,
        vertical: body.vertical,
        kyc_status: 'pending',
        active_subscribers: 0,
        tpv: 0,
        churn_rate: 0,
        monthly_growth: 0,
        avg_arpu: 0,
        created_at: new Date().toISOString(),
        contact_email: body.contact_email,
        contact_phone: body.contact_phone
      };
      mockMerchants.push(newMerchant);
      return NextResponse.json({ success: true, message: 'Merchant created successfully', data: newMerchant }, { status: 201 });
    }

    // Operator quick actions
    if (path === 'operator/send-reminder') {
      return NextResponse.json({ success: true, message: `Reminder sent to ${body.subscriber_name}` });
    }

    if (path === 'operator/trigger-retry') {
      return NextResponse.json({ success: true, message: `Retry triggered for ${body.subscriber_name}` });
    }

    if (path === 'operator/pause-service') {
      return NextResponse.json({ success: true, message: `Service paused for ${body.subscriber_name}` });
    }

    // Customer actions
    if (path === 'customer/enable-autopay') {
      return NextResponse.json({ success: true, message: 'AutoPay enabled successfully' });
    }

    if (path === 'customer/make-payment') {
      return NextResponse.json({ 
        success: true, 
        message: 'Payment initiated',
        data: { 
          order_id: 'ORDER_' + Date.now(),
          amount: body.amount,
          payment_link: 'https://razorpay.com/pay/...' 
        }
      });
    }

    return NextResponse.json({ success: false, error: 'Endpoint not found' }, { status: 404 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  const { pathname } = new URL(request.url);
  const path = pathname.replace('/api/', '');

  try {
    const body = await request.json();

    if (path.match(/^merchants\/[^/]+\/kyc$/)) {
      const id = path.split('/')[1];
      const merchant = mockMerchants.find(m => m.id === id);
      if (!merchant) {
        return NextResponse.json({ success: false, error: 'Merchant not found' }, { status: 404 });
      }
      merchant.kyc_status = body.status;
      return NextResponse.json({ success: true, message: `KYC ${body.status} successfully`, data: merchant });
    }

    if (path.match(/^alerts\/[^/]+$/)) {
      const id = path.split('/')[1];
      const alert = mockAlerts.find(a => a.id === id);
      if (!alert) {
        return NextResponse.json({ success: false, error: 'Alert not found' }, { status: 404 });
      }
      alert.status = body.status;
      return NextResponse.json({ success: true, message: 'Alert updated successfully', data: alert });
    }

    if (path === 'customer/toggle-autopay') {
      return NextResponse.json({ 
        success: true, 
        message: body.enabled ? 'AutoPay enabled' : 'AutoPay disabled',
        data: { auto_pay_enabled: body.enabled }
      });
    }

    return NextResponse.json({ success: false, error: 'Endpoint not found' }, { status: 404 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
