import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { 
  Leaf, BarChart3, Clock, Globe2, ArrowUpRight, Wallet, User, LogOut, Shield, 
  Users, Landmark, Waves, CheckCircle, XCircle, TrendingUp, LineChart,
  PlusCircle, DollarSign, History, FileCheck, ShoppingCart, Store
} from 'lucide-react';

interface CarbonCredit {
  id: string;
  project: string;
  location: string;
  credits: number;
  price: number;
  verified: boolean;
  image: string;
}

interface Transaction {
  id: string;
  type: 'purchase' | 'sale';
  amount: number;
  credits: number;
  date: string;
  status: 'completed' | 'pending';
  projectName: string;
}

interface AuthUser {
  email: string;
  name: string;
  credits: number;
  transactions: number;
  isVerified: boolean;
  joinedDate: string;
  role: 'buyer' | 'seller' | null;
  carbonOffset: number;
  totalPurchases: {
    lifetime: number;
    monthly: number;
  };
  totalSales: {
    listed: number;
    sold: number;
    revenue: number;
  };
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthUser | null>({
    email: "demo@carbonbazar.com",
    name: "Demo User",
    credits: 1500,
    transactions: 12,
    isVerified: true,
    joinedDate: "2024-01-15",
    role: null,
    carbonOffset: 75.5,
    totalPurchases: {
      lifetime: 2500,
      monthly: 300
    },
    totalSales: {
      listed: 5000,
      sold: 3500,
      revenue: 87500
    }
  });

  const [selectedRole, setSelectedRole] = useState<'buyer' | 'seller' | null>(null);

  const recentTransactions: Transaction[] = [
    {
      id: '1',
      type: 'purchase',
      amount: 2800,
      credits: 100,
      date: '2024-03-15',
      status: 'completed',
      projectName: 'Mangrove Forest Restoration'
    },
    {
      id: '2',
      type: 'sale',
      amount: 3500,
      credits: 125,
      date: '2024-03-14',
      status: 'completed',
      projectName: 'Coastal Wetland Protection'
    },
    {
      id: '3',
      type: 'purchase',
      amount: 1400,
      credits: 50,
      date: '2024-03-13',
      status: 'pending',
      projectName: 'Seagrass Conservation'
    }
  ];

  const carbonCredits: CarbonCredit[] = [
    {
      id: '1',
      project: 'Mangrove Forest Restoration',
      location: 'Indonesia',
      credits: 1000,
      price: 28,
      verified: true,
      image: 'https://cdn.unenvironment.org/2024-05/20231207-UNEP_Decade%20on%20Ecosystem%20Restoration_Growing%20Mangroves_Sri%20Lanka_Todd%20Brown-66.jpg'
    },
    {
      id: '2',
      project: 'Seagrass Meadow Conservation',
      location: 'Australia',
      credits: 750,
      price: 25,
      verified: true,
      image: 'https://images.squarespace-cdn.com/content/v1/5cd121afd7456285f1c0a9f9/1579965571431-QMQMG4MQLC90DLHXFDF1/LR_Ali+Seagrass+Research.jpg'
    },
    {
      id: '3',
      project: 'Salt Marsh Restoration',
      location: 'United Kingdom',
      credits: 500,
      price: 22,
      verified: true,
      image: 'https://www.essexwt.org.uk/sites/default/files/styles/scaled_default/public/2021-05/Installation%20of%20structures%20at%20Abbotts%20Hall%20Farm%20in%202018%20%20%281%29.jpg?itok=JsScTzdh'
    },
    {
      id: '4',
      project: 'Coastal Wetland Protection',
      location: 'Mexico',
      credits: 800,
      price: 24,
      verified: true,
      image: 'https://globalwetlandsproject.org/wp-content/uploads/2020/05/green-trees-2666806.jpg'
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      email: "demo@carbonbazar.com",
      name: "Demo User",
      credits: 1500,
      transactions: 12,
      isVerified: true,
      joinedDate: "2024-01-15",
      role: null,
      carbonOffset: 75.5,
      totalPurchases: {
        lifetime: 2500,
        monthly: 300
      },
      totalSales: {
        listed: 5000,
        sold: 3500,
        revenue: 87500
      }
    });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const Navigation = () => (
    <nav className="nav-blur fixed w-full z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Leaf className="h-8 w-8 text-emerald-500" />
              <span className="ml-2 text-xl font-bold text-white-900">Carbon Bazar</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="flex items-center px-4 py-2 rounded-lg text-white-700 hover:bg-white/20">
                  <User className="h-5 w-5" />
                  <span className="ml-2">{user?.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 rounded-lg text-white-700 hover:bg-white/20"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );

  const LoginPage = () => (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full glass-card p-8 rounded-2xl space-y-8">
        <div className="text-center">
          <Leaf className="mx-auto h-12 w-12 text-emerald-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-white">Welcome to Carbon Bazar</h2>
          <p className="mt-2 text-sm text-gray-300">Sign in to start trading carbon credits</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const ProfilePage = () => {
    if (!user) return <Navigate to="/login" />;

    const handleRoleSelect = (role: 'buyer' | 'seller') => {
      setSelectedRole(role);
      setUser(prev => prev ? { ...prev, role } : null);
    };

    const BuyerDashboard = () => (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-xl">
            <div className="flex items-center space-x-3 mb-4">
              <ShoppingCart className="h-6 w-6 text-emerald-400" />
              <h3 className="text-lg font-semibold text-white">Lifetime Purchases</h3>
            </div>
            <p className="text-3xl font-bold text-emerald-400">{user.totalPurchases.lifetime}</p>
            <p className="text-sm text-gray-300">Total Credits</p>
          </div>

          <div className="glass-card p-6 rounded-xl">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="h-6 w-6 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Monthly Purchases</h3>
            </div>
            <p className="text-3xl font-bold text-blue-400">{user.totalPurchases.monthly}</p>
            <p className="text-sm text-gray-300">Credits this month</p>
          </div>

          <div className="glass-card p-6 rounded-xl">
            <div className="flex items-center space-x-3 mb-4">
              <LineChart className="h-6 w-6 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Carbon Offset</h3>
            </div>
            <p className="text-3xl font-bold text-purple-400">{user.carbonOffset}</p>
            <p className="text-sm text-gray-300">Tons of CO₂</p>
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-white mb-4">Carbon Offset Progress</h3>
          <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-400 to-blue-400"
              style={{ width: `${(user.carbonOffset / 100) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-300 mt-2">Target: 100 Tons</p>
        </div>
      </div>
    );

    const SellerDashboard = () => (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-xl">
            <div className="flex items-center space-x-3 mb-4">
              <Store className="h-6 w-6 text-emerald-400" />
              <h3 className="text-lg font-semibold text-white">Credits Listed</h3>
            </div>
            <p className="text-3xl font-bold text-emerald-400">{user.totalSales.listed}</p>
            <p className="text-sm text-gray-300">Available Credits</p>
          </div>

          <div className="glass-card p-6 rounded-xl">
            <div className="flex items-center space-x-3 mb-4">
              <DollarSign className="h-6 w-6 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Revenue</h3>
            </div>
            <p className="text-3xl font-bold text-blue-400">${user.totalSales.revenue}</p>
            <p className="text-sm text-gray-300">Total Earnings</p>
          </div>

          <div className="glass-card p-6 rounded-xl">
            <div className="flex items-center space-x-3 mb-4">
              <FileCheck className="h-6 w-6 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Credits Sold</h3>
            </div>
            <p className="text-3xl font-bold text-purple-400">{user.totalSales.sold}</p>
            <p className="text-sm text-gray-300">Total Sales</p>
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-white mb-4">List New Credits</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Project Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter project name"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Credits Amount</label>
                <input 
                  type="number" 
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Number of credits"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Price per Credit</label>
                <input 
                  type="number" 
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Price in USD"
                />
              </div>
            </div>
            <button href="/marketplace"
              type="submit" 
              className="w-full py-2 px-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg hover:from-emerald-600 hover:to-blue-600 transition-all transform hover:scale-105"
            >
              List Credits
            </button>
          </form>
        </div>
      </div>
    );

    return (
      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="p-8">
            {/* User Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-3 rounded-full">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                  <div className="flex items-center space-x-2">
                    <p className="text-gray-300">{user.email}</p>
                    {user.isVerified ? (
                      <div className="flex items-center text-emerald-400">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        <span className="text-sm">Verified</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-400">
                        <XCircle className="h-4 w-4 mr-1" />
                        <span className="text-sm">Unverified</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-300">Member since</p>
                <p className="text-lg font-semibold text-white">{user.joinedDate}</p>
              </div>
            </div>

            {/* Role Selection */}
            {!selectedRole ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <button
                  onClick={() => handleRoleSelect('buyer')}
                  className="glass-card p-6 rounded-xl hover:bg-white/20 transition-all cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-emerald-500/10 p-3 rounded-full">
                      <ShoppingCart className="h-8 w-8 text-emerald-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Buyer Dashboard</h3>
                      <p className="text-gray-300">Purchase and track carbon credits</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleRoleSelect('seller')}
                  className="glass-card p-6 rounded-xl hover:bg-white/20 transition-all cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-500/10 p-3 rounded-full">
                      <Store className="h-8 w-8 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Seller Dashboard</h3>
                      <p className="text-gray-300">List and manage your carbon credits</p>
                    </div>
                  </div>
                </button>
              </div>
            ) : (
              <div className="mb-8">
                <button
                  onClick={() => setSelectedRole(null)}
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  ← Back to role selection
                </button>
              </div>
            )}

            {/* Dashboard Content */}
            {selectedRole === 'buyer' && <BuyerDashboard />}
            {selectedRole === 'seller' && <SellerDashboard />}

            {/* Transaction History */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-white mb-4">Recent Transactions</h3>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="glass-card flex items-center justify-between p-4 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-full ${
                        transaction.type === 'purchase' 
                          ? 'bg-emerald-500/10' 
                          : 'bg-blue-500/10'
                      }`}>
                        {transaction.type === 'purchase' ? (
                          <ShoppingCart className={`h-4 w-4 ${
                            transaction.type === 'purchase' 
                              ? 'text-emerald-500' 
                              : 'text-blue-500'
                          }`} />
                        ) : (
                          <Store className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-white">
                          {transaction.type === 'purchase' ? 'Purchased' : 'Sold'} {transaction.credits} Credits
                        </p>
                        <p className="text-sm text-gray-300">{transaction.projectName}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-emerald-400">${transaction.amount}</p>
                      <p className="text-sm text-gray-300">{transaction.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };


  const stats = [
    { label: 'Total Credits Traded', value: '2.5M', icon: BarChart3 },
    { label: 'Active Projects', value: '156', icon: Globe2 },
    { label: 'Avg. Settlement Time', value: '48h', icon: Clock }
  ];

  const MarketplacePage = () => (
    <main className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="glass-card p-6 rounded-xl">
            <div className="flex items-center">
              <stat.icon className="h-8 w-8 text-blue-400" />
              <div className="ml-4">
                <p className="text-sm text-blue-200">{stat.label}</p>
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white">Blue Carbon Credit Marketplace</h2>
          <p className="mt-2 text-blue-200">Browse verified coastal and marine conservation projects</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-6">
          {carbonCredits.map((credit) => (
            <div key={credit.id} className="marketplace-card rounded-xl overflow-hidden">
              <img src={credit.image} alt={credit.project} className="h-48 w-full object-cover" />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">{credit.project}</h3>
                  {credit.verified && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      Verified
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-gray-500">{credit.location}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Available Credits</p>
                    <p className="text-lg font-semibold text-gray-900">{credit.credits.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Price per Credit</p>
                    <p className="text-lg font-semibold text-gray-900">${credit.price}</p>
                  </div>
                </div>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                  Purchase Credits
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );

  const LandingPage = () => (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="https://billionbricks.org/wp-content/uploads/2023/06/large_ww2122215_748616.jpg"
            alt="Coastal Community"
            className="w-full h-full object-cover"
          />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="flex items-center mb-8 fade-in-up">
            {/* <div className="logo-shine bg-gradient-to-r from-emerald-500 to-blue-500 p-3 rounded-lg">
              <Waves className="h-12 w-12 text-white" />
            </div> */}
            {/* <span className="ml-4 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400">
              Carbon Bazar
            </span> */}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight fade-in-up fade-in-up-delay-1">
            Empowering <font color = "#00FFFF">coastal</font><br />
            communities worldwide.
          </h1>
          
          <p className="text-xl text-blue-100 max-w-2xl mb-8 fade-in-up fade-in-up-delay-2">
            Join us in revolutionizing the carbon credit marketplace while supporting sustainable coastal development and marine conservation efforts.
          </p>
          
          <div className="flex space-x-4 fade-in-up fade-in-up-delay-3">
            <Link
              to="/marketplace"
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg hover:from-emerald-600 hover:to-blue-600 transition-all transform hover:scale-105 font-semibold flex items-center"
            >
              Explore Marketplace
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gradient-to-b from-slate-900 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Bridging the gap between coastal communities and global carbon markets
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Why We Exist */}
            <div className="glass-card p-8 rounded-2xl transform hover:scale-105 transition-all">
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Globe2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Global Impact</h3>
              <p className="text-blue-100">
                Connecting local conservation efforts with global carbon markets through innovative blockchain solutions.
              </p>
            </div>

            {/* Transparent & Secure */}
            <div className="glass-card p-8 rounded-2xl transform hover:scale-105 transition-all">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Verified Projects</h3>
              <p className="text-blue-100">
                Every credit is thoroughly verified and tracked, ensuring maximum impact and transparency.
              </p>
            </div>

            {/* Community Support */}
            <div className="glass-card p-8 rounded-2xl transform hover:scale-105 transition-all">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Community First</h3>
              <p className="text-blue-100">
                Supporting local communities through direct funding and sustainable development initiatives.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-400 mb-2">2.5M+</div>
              <div className="text-blue-100">Carbon Credits Traded</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-400 mb-2">150+</div>
              <div className="text-blue-100">Conservation Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-400 mb-2">50K+</div>
              <div className="text-blue-100">Community Members</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Router>
      <div className="min-h-screen">
        <Navigation />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
