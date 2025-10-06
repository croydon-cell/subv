# SubversePay - API Integration Guide

## 🚀 Super Admin Dashboard - Ready to Connect

This application is built with a **ready-to-connect API architecture**. All endpoints are functional with mock data and can be easily connected to Supabase and Razorpay.

---

## 📋 Table of Contents

1. [Current Features](#current-features)
2. [API Endpoints](#api-endpoints)
3. [Database Schema (Supabase)](#database-schema-supabase)
4. [Connecting Supabase](#connecting-supabase)
5. [Connecting Razorpay](#connecting-razorpay)
6. [Data Models](#data-models)

---

## ✨ Current Features

### Super Admin Dashboard Includes:

1. **Merchant Management**
   - List all merchants with KYC status
   - Approve/reject KYC applications
   - View merchant performance metrics
   - Filter by vertical (Cable/DTH, ISP, Gym/Fitness)

2. **Analytics & Insights**
   - Platform overview (total merchants, subscribers, TPV)
   - Merchant performance analytics
   - Vertical performance comparison
   - Health scores based on churn, growth, and TPV
   - Growth trend analysis

3. **Risk & Fraud Alerts**
   - Real-time alert monitoring
   - Severity-based filtering (high, medium, low)
   - Alert type classification (fraud, churn, settlement, risk)
   - Alert resolution tracking

4. **Settlement Oversight**
   - Settlement tracking by status
   - Transaction count and amount monitoring
   - Payout date tracking
   - Merchant-wise settlement view

5. **System Health Monitoring**
   - API uptime tracking (99.98%)
   - Integration status (Razorpay, Supabase)
   - Performance metrics (response time, request volume)
   - Failed request monitoring

---

## 🔌 API Endpoints

All endpoints are prefixed with `/api` and return JSON responses.

### Merchants

```bash
# Get all merchants
GET /api/merchants
Query params: ?kyc_status=approved&vertical=ISP

# Get merchant by ID
GET /api/merchants/:id

# Create new merchant
POST /api/merchants
Body: {
  "name": "Merchant Name",
  "vertical": "Cable/DTH|ISP|Gym/Fitness",
  "contact_email": "email@example.com",
  "contact_phone": "+91 1234567890"
}

# Update KYC status
PATCH /api/merchants/:id/kyc
Body: { "status": "approved|rejected" }
```

### Analytics

```bash
# Platform overview
GET /api/analytics/overview
Response: {
  "total_merchants": 5,
  "active_merchants": 3,
  "pending_kyc": 1,
  "total_subscribers": 40400,
  "total_tpv": 20310000,
  "avg_churn_rate": "7.26",
  "active_alerts": 3,
  "monthly_growth": 14.2
}

# Merchant performance
GET /api/analytics/merchants
Response: Array of merchant performance data with health scores

# Vertical performance
GET /api/analytics/verticals
Response: Aggregated data by vertical (Cable/DTH, ISP, Gym)
```

### Alerts

```bash
# Get all alerts
GET /api/alerts
Query params: ?status=active&severity=high

# Update alert status
PATCH /api/alerts/:id
Body: { "status": "resolved|active" }
```

### Settlements

```bash
# Get all settlements
GET /api/settlements
Query params: ?status=completed|processing|pending

Response: Array of settlement records with payout details
```

### System Health

```bash
# Get system health
GET /api/system-health

Response: {
  "api_uptime": 99.98,
  "razorpay_status": "operational",
  "supabase_status": "operational",
  "avg_response_time": 145,
  "total_requests_today": 45678,
  "failed_requests_today": 23
}
```

---

## 🗄️ Database Schema (Supabase)

### Tables to Create in Supabase

```sql
-- 1. Merchants Table
CREATE TABLE merchants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    vertical VARCHAR(50) NOT NULL,
    kyc_status VARCHAR(20) DEFAULT 'pending',
    active_subscribers INTEGER DEFAULT 0,
    tpv DECIMAL(15,2) DEFAULT 0,
    churn_rate DECIMAL(5,2) DEFAULT 0,
    monthly_growth DECIMAL(5,2) DEFAULT 0,
    avg_arpu DECIMAL(10,2) DEFAULT 0,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Subscribers Table
CREATE TABLE subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID REFERENCES merchants(id),
    customer_name VARCHAR(255),
    customer_email VARCHAR(255),
    customer_phone VARCHAR(20),
    plan_amount DECIMAL(10,2),
    status VARCHAR(20) DEFAULT 'active',
    expiry_date DATE,
    last_payment_date DATE,
    payment_method VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. Transactions Table
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID REFERENCES merchants(id),
    subscriber_id UUID REFERENCES subscribers(id),
    amount DECIMAL(10,2),
    status VARCHAR(20),
    failure_reason VARCHAR(255),
    payment_method VARCHAR(50),
    razorpay_payment_id VARCHAR(255),
    razorpay_order_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);

-- 4. Alerts Table
CREATE TABLE alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(50) NOT NULL,
    severity VARCHAR(20) NOT NULL,
    merchant_id UUID REFERENCES merchants(id),
    message TEXT,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    resolved_at TIMESTAMP
);

-- 5. Settlements Table
CREATE TABLE settlements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID REFERENCES merchants(id),
    amount DECIMAL(15,2),
    status VARCHAR(20) DEFAULT 'pending',
    transaction_count INTEGER,
    payout_date DATE,
    razorpay_transfer_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP
);

-- 6. System Metrics Table
CREATE TABLE system_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    api_uptime DECIMAL(5,2),
    razorpay_status VARCHAR(50),
    supabase_status VARCHAR(50),
    avg_response_time INTEGER,
    total_requests_today INTEGER,
    failed_requests_today INTEGER,
    recorded_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_merchants_kyc_status ON merchants(kyc_status);
CREATE INDEX idx_merchants_vertical ON merchants(vertical);
CREATE INDEX idx_subscribers_merchant_id ON subscribers(merchant_id);
CREATE INDEX idx_subscribers_status ON subscribers(status);
CREATE INDEX idx_transactions_merchant_id ON transactions(merchant_id);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_alerts_status ON alerts(status);
CREATE INDEX idx_alerts_merchant_id ON alerts(merchant_id);
CREATE INDEX idx_settlements_merchant_id ON settlements(merchant_id);
CREATE INDEX idx_settlements_status ON settlements(status);
```

---

## 🔗 Connecting Supabase

### Step 1: Get Supabase Credentials

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Create a new project or select existing one
3. Go to Settings → API
4. Copy:
   - Project URL (e.g., `https://xxxxx.supabase.co`)
   - Anon/Public Key
   - Service Role Key (for server-side operations)

### Step 2: Add to Environment Variables

Create or update `/app/.env`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### Step 3: Update API Routes

Create `/app/lib/supabase.js`:

```javascript
import { createClient } from '@supabase/supabase-js';

// Client for browser/frontend
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Client for server-side operations
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
```

### Step 4: Replace Mock Data with Supabase Queries

Example for `/api/merchants` endpoint:

```javascript
// Before (Mock)
const mockMerchants = [...];
return NextResponse.json({ success: true, data: mockMerchants });

// After (Supabase)
import { supabaseAdmin } from '@/lib/supabase';

const { data: merchants, error } = await supabaseAdmin
  .from('merchants')
  .select('*')
  .order('created_at', { ascending: false });

if (error) {
  return NextResponse.json({ success: false, error: error.message }, { status: 500 });
}

return NextResponse.json({ success: true, data: merchants });
```

---

## 💳 Connecting Razorpay

### Step 1: Get Razorpay Credentials

1. Go to [https://dashboard.razorpay.com](https://dashboard.razorpay.com)
2. Navigate to Settings → API Keys
3. Generate Keys (Test/Live mode)
4. Copy:
   - Key ID (e.g., `rzp_test_xxxxx`)
   - Key Secret

### Step 2: Add to Environment Variables

Update `/app/.env`:

```bash
# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your-secret-key-here
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
```

### Step 3: Install Razorpay SDK

```bash
cd /app
yarn add razorpay
```

### Step 4: Create Payment Integration

Create `/app/lib/razorpay.js`:

```javascript
import Razorpay from 'razorpay';

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
```

### Step 5: Create Payment Endpoints

```javascript
// POST /api/payments/create-order
export async function POST(request) {
  const { amount, currency, receipt } = await request.json();
  
  const options = {
    amount: amount * 100, // Convert to paise
    currency: currency || 'INR',
    receipt: receipt,
  };

  const order = await razorpay.orders.create(options);
  return NextResponse.json({ success: true, data: order });
}

// POST /api/payments/verify
export async function POST(request) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();
  
  const crypto = require('crypto');
  const sign = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSign = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(sign.toString())
    .digest('hex');

  if (razorpay_signature === expectedSign) {
    return NextResponse.json({ success: true, message: 'Payment verified' });
  } else {
    return NextResponse.json({ success: false, message: 'Invalid signature' }, { status: 400 });
  }
}
```

---

## 📊 Data Models

### Merchant Model
```typescript
interface Merchant {
  id: string;
  name: string;
  vertical: 'Cable/DTH' | 'ISP' | 'Gym/Fitness';
  kyc_status: 'pending' | 'approved' | 'rejected';
  active_subscribers: number;
  tpv: number; // Total Payment Volume
  churn_rate: number;
  monthly_growth: number;
  avg_arpu: number; // Average Revenue Per User
  contact_email: string;
  contact_phone: string;
  created_at: string;
}
```

### Alert Model
```typescript
interface Alert {
  id: string;
  type: 'fraud' | 'churn' | 'settlement' | 'risk';
  severity: 'high' | 'medium' | 'low';
  merchant_id: string;
  merchant_name: string;
  message: string;
  status: 'active' | 'resolved';
  created_at: string;
}
```

### Settlement Model
```typescript
interface Settlement {
  id: string;
  merchant_id: string;
  merchant_name: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed';
  transaction_count: number;
  payout_date: string;
  created_at: string;
}
```

---

## 🧪 Testing the APIs

### Using cURL

```bash
# Test overview endpoint
curl http://localhost:3000/api/analytics/overview

# Test merchants endpoint
curl http://localhost:3000/api/merchants

# Test KYC approval
curl -X PATCH http://localhost:3000/api/merchants/3/kyc \
  -H "Content-Type: application/json" \
  -d '{"status": "approved"}'

# Test alerts
curl http://localhost:3000/api/alerts?status=active

# Test settlements
curl http://localhost:3000/api/settlements

# Test system health
curl http://localhost:3000/api/system-health
```

---

## 🎯 Next Steps

1. **Create Supabase Database**
   - Execute the SQL schema provided above
   - Seed with initial merchant data

2. **Add Supabase Integration**
   - Install Supabase client
   - Update environment variables
   - Replace mock data in API routes

3. **Add Razorpay Integration**
   - Install Razorpay SDK
   - Add payment endpoints
   - Implement webhook handlers

4. **Add Authentication**
   - Implement Supabase Auth
   - Add role-based access control
   - Protect admin routes

5. **Build Additional Dashboards**
   - Merchant Admin Dashboard
   - Operator/LCO Dashboard
   - Customer Dashboard

---

## 📝 Notes

- All mock data is structured exactly like Supabase responses
- API endpoints follow RESTful conventions
- UUIDs are used throughout for better compatibility
- All currency values are in INR (₹)
- Date formats are ISO 8601 compatible
- Error handling is implemented in all routes

---

## 🚀 Access the Dashboard

- **Local**: http://localhost:3000/admin
- **Super Admin Dashboard**: Full platform oversight with all features

The dashboard automatically redirects from `/` to `/admin` for quick access.

---

## 📞 Support

For integration help or questions, refer to:
- [Supabase Documentation](https://supabase.com/docs)
- [Razorpay API Documentation](https://razorpay.com/docs/api)
- [Next.js App Router Documentation](https://nextjs.org/docs/app)
