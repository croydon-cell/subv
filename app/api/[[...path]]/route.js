import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// Mock data - ready to be replaced with Supabase queries
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
    kyc_status: 'pending',
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

// API Routes Handler
export async function GET(request) {
  const { pathname, searchParams } = new URL(request.url);
  const path = pathname.replace('/api/', '');

  try {
    // GET /api/merchants - List all merchants
    if (path === 'merchants') {
      const status = searchParams.get('kyc_status');
      const vertical = searchParams.get('vertical');
      
      let filtered = [...mockMerchants];
      
      if (status) {
        filtered = filtered.filter(m => m.kyc_status === status);
      }
      
      if (vertical) {
        filtered = filtered.filter(m => m.vertical === vertical);
      }
      
      return NextResponse.json({
        success: true,
        data: filtered,
        total: filtered.length
      });
    }

    // GET /api/merchants/:id - Get merchant details
    if (path.startsWith('merchants/') && path.split('/').length === 2) {
      const id = path.split('/')[1];
      const merchant = mockMerchants.find(m => m.id === id);
      
      if (!merchant) {
        return NextResponse.json(
          { success: false, error: 'Merchant not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({
        success: true,
        data: merchant
      });
    }

    // GET /api/analytics/overview - Super admin overview
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

    // GET /api/analytics/merchants - Merchant performance analytics
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
      
      return NextResponse.json({
        success: true,
        data: performanceData
      });
    }

    // GET /api/analytics/verticals - Vertical performance
    if (path === 'analytics/verticals') {
      const verticals = {};
      
      mockMerchants
        .filter(m => m.kyc_status === 'approved')
        .forEach(m => {
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
      
      return NextResponse.json({
        success: true,
        data: verticalData
      });
    }

    // GET /api/alerts - Risk and fraud alerts
    if (path === 'alerts') {
      const status = searchParams.get('status');
      const severity = searchParams.get('severity');
      
      let filtered = [...mockAlerts];
      
      if (status) {
        filtered = filtered.filter(a => a.status === status);
      }
      
      if (severity) {
        filtered = filtered.filter(a => a.severity === severity);
      }
      
      return NextResponse.json({
        success: true,
        data: filtered,
        total: filtered.length
      });
    }

    // GET /api/settlements - Settlement data
    if (path === 'settlements') {
      const status = searchParams.get('status');
      
      let filtered = [...mockSettlements];
      
      if (status) {
        filtered = filtered.filter(s => s.status === status);
      }
      
      return NextResponse.json({
        success: true,
        data: filtered,
        total: filtered.length
      });
    }

    // GET /api/system-health - System status
    if (path === 'system-health') {
      return NextResponse.json({
        success: true,
        data: mockSystemHealth
      });
    }

    return NextResponse.json(
      { success: false, error: 'Endpoint not found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const { pathname } = new URL(request.url);
  const path = pathname.replace('/api/', '');

  try {
    const body = await request.json();

    // POST /api/merchants - Create new merchant
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
      
      return NextResponse.json({
        success: true,
        message: 'Merchant created successfully',
        data: newMerchant
      }, { status: 201 });
    }

    return NextResponse.json(
      { success: false, error: 'Endpoint not found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  const { pathname } = new URL(request.url);
  const path = pathname.replace('/api/', '');

  try {
    const body = await request.json();

    // PATCH /api/merchants/:id/kyc - Approve/reject KYC
    if (path.match(/^merchants\/[^/]+\/kyc$/)) {
      const id = path.split('/')[1];
      const merchant = mockMerchants.find(m => m.id === id);
      
      if (!merchant) {
        return NextResponse.json(
          { success: false, error: 'Merchant not found' },
          { status: 404 }
        );
      }
      
      merchant.kyc_status = body.status; // 'approved' or 'rejected'
      
      return NextResponse.json({
        success: true,
        message: `KYC ${body.status} successfully`,
        data: merchant
      });
    }

    // PATCH /api/alerts/:id - Update alert status
    if (path.match(/^alerts\/[^/]+$/)) {
      const id = path.split('/')[1];
      const alert = mockAlerts.find(a => a.id === id);
      
      if (!alert) {
        return NextResponse.json(
          { success: false, error: 'Alert not found' },
          { status: 404 }
        );
      }
      
      alert.status = body.status;
      
      return NextResponse.json({
        success: true,
        message: 'Alert updated successfully',
        data: alert
      });
    }

    return NextResponse.json(
      { success: false, error: 'Endpoint not found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
