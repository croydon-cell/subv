'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Shield, 
  Store, 
  User, 
  UserCircle, 
  TrendingUp, 
  Zap, 
  Target, 
  Brain,
  Bell,
  CreditCard,
  Users,
  BarChart3,
  Linkedin,
  Twitter,
  Menu,
  X,
  ArrowRight,
  CheckCircle,
  Star,
  Play
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Preload all dashboard routes
  useEffect(() => {
    const routes = ['/admin', '/merchant', '/operator', '/customer'];
    routes.forEach(route => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = route;
      document.head.appendChild(link);
    });
  }, []);

  const handleDashboardClick = (href) => {
    // Immediate navigation without any delay
    window.location.replace(href);
  };

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

  const features = [
    {
      title: 'AI-Powered Retries',
      description: 'Intelligent retry logic that learns from payment patterns to maximize success rates',
      icon: Brain,
      color: 'text-blue-600'
    },
    {
      title: 'Smart Churn Prediction',
      description: 'Predict customer churn before it happens with advanced behavioral analytics',
      icon: Target,
      color: 'text-green-600'
    },
    {
      title: 'Revenue Forecasting',
      description: 'Accurate revenue predictions based on payment history and market trends',
      icon: BarChart3,
      color: 'text-purple-600'
    },
    {
      title: 'Smart Reminders',
      description: 'Automated, personalized payment reminders that increase collection rates',
      icon: Bell,
      color: 'text-orange-600'
    },
    {
      title: 'Auto-Mapped UPI Checkout',
      description: 'Seamless UPI integration with automatic payment method mapping',
      icon: CreditCard,
      color: 'text-indigo-600'
    },
    {
      title: 'LCO-Friendly Design',
      description: 'Intuitive interface designed specifically for local cable operators',
      icon: Users,
      color: 'text-cyan-600'
    }
  ];

  const stats = [
    { value: '99.2%', label: 'Payment Success Rate' },
    { value: '45%', label: 'Revenue Recovery' },
    { value: '2.5x', label: 'Collection Efficiency' },
    { value: '500+', label: 'Active Merchants' }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'CEO, CableNet Solutions',
      content: 'SubversePay increased our collection rate by 40% in just 3 months. The AI-powered retries are game-changing.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      role: 'Operations Head, FitZone Gyms',
      content: 'The churn prediction feature helped us retain 60% more customers. Incredible ROI on our investment.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                SubversePay
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#about" className="text-slate-600 hover:text-blue-600 transition-colors">About</a>
              <a href="#pricing" className="text-slate-600 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="#contact" className="text-slate-600 hover:text-blue-600 transition-colors">Contact</a>
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                Get Started
              </Button>
            </div>

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200">
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block text-slate-600 hover:text-blue-600">Features</a>
              <a href="#about" className="block text-slate-600 hover:text-blue-600">About</a>
              <a href="#pricing" className="block text-slate-600 hover:text-blue-600">Pricing</a>
              <a href="#contact" className="block text-slate-600 hover:text-blue-600">Contact</a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" className="border-blue-600 text-blue-600">Sign In</Button>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">Get Started</Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
              <Zap className="h-4 w-4 mr-2" />
              AI-Powered Payment Recovery Platform
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6">
              Turn Failed Payments Into
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block">
                Recovered Revenue
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              The universal autopay and revenue-recovery layer for semi-digital sectors. 
              Boost your collection rates with AI-driven retries and behavioral intelligence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 text-lg">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-slate-300 text-slate-700 px-8 py-4 text-lg">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
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
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Choose Your Dashboard</h2>
            <p className="text-xl text-slate-600">Access the right tools for your role</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {roles.map((role) => (
              <Card
                key={role.id}
                className="border-0 shadow-xl hover:shadow-2xl cursor-pointer group overflow-hidden select-none"
                onClick={() => handleDashboardClick(role.href)}
                onMouseDown={(e) => e.preventDefault()}
              >
                <CardContent className="p-8">
                  <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <role.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{role.title}</h3>
                  <p className="text-slate-600 mb-6">{role.description}</p>
                  <Button 
                    className={`w-full bg-gradient-to-r ${role.color} text-white shadow-lg select-none`}
                    size="lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDashboardClick(role.href);
                    }}
                  >
                    Access Dashboard
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Core Features</h2>
            <p className="text-xl text-slate-600">Powerful tools to maximize your revenue recovery</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-8">
                  <div className={`h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center mb-6`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Trusted by Industry Leaders</h2>
            <p className="text-xl text-slate-600">See what our customers say about us</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-slate-900">{testimonial.name}</div>
                    <div className="text-slate-500 text-sm">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">About SubversePay</h2>
          <Card className="border-0 shadow-xl">
            <CardContent className="p-12">
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                We are building the universal autopay and revenue-recovery layer for semi-digital sectors — starting with cable, gyms, and ISPs. Our mission is to turn failed payments into recovered revenue using AI-driven retries, churn prediction, and behavioral intelligence.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center text-slate-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Built for MSOs, ISPs, and Gyms
                </div>
                <div className="flex items-center text-slate-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Powered by Supabase & Razorpay
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call-to-Action Strip */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Revenue Recovery?</h2>
          <p className="text-xl text-blue-100 mb-8">Join hundreds of businesses already using SubversePay</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-slate-100 shadow-lg px-8 py-4 text-lg font-semibold"
            >
              Book a Demo
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600 shadow-lg px-8 py-4 text-lg font-semibold"
            >
              Start a Pilot
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">SubversePay</span>
              </div>
              <p className="text-slate-400 mb-6 max-w-md">
                The universal autopay and revenue-recovery layer for semi-digital sectors. 
                Turn failed payments into recovered revenue with AI.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Twitter className="h-6 w-6" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">&copy; 2024 SubversePay. All rights reserved.</p>
            <p className="text-slate-400 text-sm mt-4 md:mt-0">Built for MSOs, ISPs, and Gyms</p>
          </div>
        </div>
      </footer>
    </div>
  );
}