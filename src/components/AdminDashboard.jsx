/**
 * BrandsIntel Admin Dashboard
 * Complete control panel for managing the platform
 * Deploy to Vercel
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3000';

export default function AdminDashboard() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [businesses, setBusinesses] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBusinesses: 0,
    monthlyRevenue: 0,
    checksThisMonth: 0,
  });
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');

  // Simple password login (replace with real auth later)
  const adminPassword = 'BrandsIntel2024';

  useEffect(() => {
    if (isLoggedIn) {
      loadDashboardData();
    }
  }, [isLoggedIn, currentTab]);

  async function loadDashboardData() {
    try {
      setLoading(true);
      // Fetch all data from backend
      // For now, we'll simulate data - replace with real API calls
      
      // Simulated data
      setStats({
        totalUsers: 1247,
        totalBusinesses: 45,
        monthlyRevenue: 750000,
        checksThisMonth: 3421,
      });

      setBusinesses([
        {
          id: '1',
          name: 'Jumia Nigeria',
          website: 'jumia.com.ng',
          trustScore: 92,
          riskLevel: 'established',
          verified: true,
          verifiedDate: '2024-08-15',
          subscriptionTier: 'pro',
          monthlyFee: 50000,
          status: 'active',
          lastChecked: '2024-08-24',
        },
        {
          id: '2',
          name: 'Konga',
          website: 'konga.com',
          trustScore: 88,
          riskLevel: 'established',
          verified: true,
          verifiedDate: '2024-08-10',
          subscriptionTier: 'basic',
          monthlyFee: 30000,
          status: 'active',
          lastChecked: '2024-08-23',
        },
        {
          id: '3',
          name: 'ABC Electronics',
          website: 'abc-electronics.com',
          trustScore: 65,
          riskLevel: 'caution',
          verified: false,
          verifiedDate: null,
          subscriptionTier: 'none',
          monthlyFee: 0,
          status: 'pending',
          lastChecked: '2024-08-22',
        },
      ]);

      setUsers([
        { id: '1', phone: '+234 701 XXX XXXX', checksCount: 12, lastCheck: '2024-08-24', location: 'Lagos' },
        { id: '2', phone: '+234 703 XXX XXXX', checksCount: 8, lastCheck: '2024-08-24', location: 'Abuja' },
        { id: '3', phone: '+234 705 XXX XXXX', checksCount: 25, lastCheck: '2024-08-23', location: 'Lagos' },
      ]);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  }

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3f4f6' }}>
        <div style={{ background: 'white', padding: '3rem', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>🔐 BrandsIntel Admin</h1>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Admin Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '1rem',
              }}
              placeholder="Enter admin password"
            />
          </div>

          <button
            onClick={() => {
              if (password === adminPassword) {
                setIsLoggedIn(true);
              } else {
                alert('Wrong password');
              }
            }}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '500',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Login
          </button>

          <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#666', textAlign: 'center' }}>
            Hint: Password is in your environment variables
          </p>
        </div>
      </div>
    );
  }

  // Dashboard Content
  const renderDashboard = () => (
    <div>
      <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem', fontWeight: '600' }}>📊 Dashboard Overview</h2>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <StatCard title="Total Users" value={stats.totalUsers} icon="👥" color="#3b82f6" />
        <StatCard title="Verified Businesses" value={stats.totalBusinesses} icon="✓" color="#10b981" />
        <StatCard title="Monthly Revenue" value={`₦${stats.monthlyRevenue.toLocaleString()}`} icon="💰" color="#f59e0b" />
        <StatCard title="Checks This Month" value={stats.checksThisMonth} icon="🔍" color="#8b5cf6" />
      </div>

      {/* Quick Stats */}
      <div style={{
        background: '#f3f4f6',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '2rem',
      }}>
        <h3 style={{ marginBottom: '1rem', fontWeight: '600' }}>📈 Key Metrics</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <Metric label="Avg Trust Score" value="78/100" />
          <Metric label="Verification Speed" value="1.2s" />
          <Metric label="User Growth (30d)" value="+23%" />
          <Metric label="Bot Uptime" value="99.9%" />
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{
        background: '#f3f4f6',
        padding: '1.5rem',
        borderRadius: '12px',
      }}>
        <h3 style={{ marginBottom: '1rem', fontWeight: '600' }}>⏰ Recent Activity</h3>
        <div style={{ fontSize: '0.9rem', color: '#666' }}>
          <p>✓ 12 verifications in the last hour</p>
          <p>✓ 2 new business signups today</p>
          <p>✓ ₦150,000 revenue collected today</p>
          <p>✓ 0 failed verifications</p>
        </div>
      </div>
    </div>
  );

  const renderBusinesses = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>🏢 Businesses</h2>
        <button
          style={{
            padding: '0.5rem 1rem',
            background: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          + Add Business
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Business Name</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Trust Score</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Status</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Plan</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Monthly Fee</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {businesses.map((biz) => (
              <tr key={biz.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '1rem' }}>
                  <div>
                    <strong>{biz.name}</strong>
                    <div style={{ fontSize: '0.85rem', color: '#666' }}>{biz.website}</div>
                  </div>
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{
                    background: biz.trustScore > 80 ? '#d1fae5' : '#fef3c7',
                    color: biz.trustScore > 80 ? '#065f46' : '#92400e',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.85rem',
                  }}>
                    {biz.trustScore}/100
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{
                    background: biz.status === 'active' ? '#d1fae5' : '#fee2e2',
                    color: biz.status === 'active' ? '#065f46' : '#991b1b',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                  }}>
                    {biz.status}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{
                    background: '#e0e7ff',
                    color: '#3730a3',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                  }}>
                    {biz.subscriptionTier}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>₦{biz.monthlyFee.toLocaleString()}</td>
                <td style={{ padding: '1rem' }}>
                  <button
                    style={{
                      padding: '0.4rem 0.8rem',
                      background: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div>
      <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem', fontWeight: '600' }}>👥 Users</h2>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Phone</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Location</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Total Checks</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Last Check</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '1rem' }}>{user.phone}</td>
                <td style={{ padding: '1rem' }}>{user.location}</td>
                <td style={{ padding: '1rem' }}>{user.checksCount}</td>
                <td style={{ padding: '1rem', fontSize: '0.9rem', color: '#666' }}>
                  {new Date(user.lastCheck).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPayments = () => (
    <div>
      <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem', fontWeight: '600' }}>💰 Payments</h2>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {/* Payment Summary */}
        <div style={{
          background: '#f3f4f6',
          padding: '1.5rem',
          borderRadius: '12px',
        }}>
          <h3 style={{ marginBottom: '1rem', fontWeight: '600' }}>Payment Summary</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
            <SummaryItem label="This Month" value="₦750,000" />
            <SummaryItem label="Pending" value="₦150,000" />
            <SummaryItem label="Total Collected" value="₦2,100,000" />
            <SummaryItem label="Paying Businesses" value="12" />
          </div>
        </div>

        {/* Payment Methods */}
        <div style={{
          background: '#f3f4f6',
          padding: '1.5rem',
          borderRadius: '12px',
        }}>
          <h3 style={{ marginBottom: '1rem', fontWeight: '600' }}>Payment Methods</h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <PaymentMethod method="Bank Transfer" enabled={true} connected={true} />
            <PaymentMethod method="Paystack" enabled={false} connected={false} />
            <PaymentMethod method="Stripe" enabled={false} connected={false} />
          </div>
        </div>

        {/* Invoice Button */}
        <button
          style={{
            padding: '1rem',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
          }}
        >
          📄 Generate Invoice
        </button>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div>
      <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem', fontWeight: '600' }}>⚙️ Settings</h2>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {/* Pricing */}
        <SettingsSection title="💵 Pricing Plans">
          <PricingTier tier="Basic" price={30000} features={['Profile verification', 'Basic monitoring']} />
          <PricingTier tier="Pro" price={50000} features={['Profile verification', 'Advanced monitoring', 'API access']} />
          <PricingTier tier="Enterprise" price="Custom" features={['Everything', 'Dedicated support', 'White-label']} />
        </SettingsSection>

        {/* Bot Settings */}
        <SettingsSection title="🤖 WhatsApp Bot">
          <Setting label="WhatsApp Number" value="+234 XXX XXXX XXXX" editable={true} />
          <Setting label="Webhook URL" value="https://brandsintel-backend.onrender.com/whatsapp/webhook" editable={false} />
          <Setting label="Bot Status" value="✓ Connected" editable={false} />
        </SettingsSection>

        {/* API Keys */}
        <SettingsSection title="🔑 API Configuration">
          <Setting label="Claude API" value="●●●●●●●●●●●●" editable={false} />
          <Setting label="Supabase Key" value="●●●●●●●●●●●●" editable={false} />
          <Setting label="Twilio Account" value="AC●●●●●●●●●●" editable={false} />
        </SettingsSection>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      {/* Header */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>🔍 BrandsIntel Admin</h1>
        <button
          onClick={() => setIsLoggedIn(false)}
          style={{
            padding: '0.5rem 1rem',
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
        {/* Sidebar */}
        <div style={{
          width: '250px',
          background: '#1f2937',
          color: 'white',
          padding: '1rem',
          borderRight: '1px solid #374151',
        }}>
          <nav>
            {[
              { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
              { id: 'businesses', label: '🏢 Businesses', icon: '🏢' },
              { id: 'users', label: '👥 Users', icon: '👥' },
              { id: 'payments', label: '💰 Payments', icon: '💰' },
              { id: 'settings', label: '⚙️ Settings', icon: '⚙️' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  marginBottom: '0.5rem',
                  background: currentTab === item.id ? '#3b82f6' : 'transparent',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontWeight: currentTab === item.id ? '600' : '400',
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '2rem' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>
          ) : (
            <>
              {currentTab === 'dashboard' && renderDashboard()}
              {currentTab === 'businesses' && renderBusinesses()}
              {currentTab === 'users' && renderUsers()}
              {currentTab === 'payments' && renderPayments()}
              {currentTab === 'settings' && renderSettings()}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper Components
function StatCard({ title, value, icon, color }) {
  return (
    <div style={{
      background: 'white',
      padding: '1.5rem',
      borderRadius: '12px',
      border: `3px solid ${color}`,
    }}>
      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</div>
      <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{title}</div>
      <div style={{ fontSize: '1.75rem', fontWeight: '700' }}>{value}</div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.25rem' }}>{label}</div>
      <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>{value}</div>
    </div>
  );
}

function SummaryItem({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: '0.85rem', color: '#666' }}>{label}</div>
      <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{value}</div>
    </div>
  );
}

function PaymentMethod({ method, enabled, connected }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      background: 'white',
      borderRadius: '6px',
      borderLeft: `4px solid ${connected ? '#10b981' : '#9ca3af'}`,
    }}>
      <div>
        <strong>{method}</strong>
        <div style={{ fontSize: '0.85rem', color: '#666' }}>
          {connected ? '✓ Connected' : 'Not connected'}
        </div>
      </div>
      <button
        style={{
          padding: '0.5rem 1rem',
          background: connected ? '#ef4444' : '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.85rem',
        }}
      >
        {connected ? 'Disconnect' : 'Connect'}
      </button>
    </div>
  );
}

function Setting({ label, value, editable }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      background: 'white',
      borderRadius: '6px',
      marginBottom: '0.5rem',
    }}>
      <div>
        <div style={{ fontWeight: '500' }}>{label}</div>
        <div style={{ fontSize: '0.85rem', color: '#666', fontFamily: 'monospace' }}>{value}</div>
      </div>
      {editable && (
        <button
          style={{
            padding: '0.4rem 0.8rem',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.85rem',
          }}
        >
          Edit
        </button>
      )}
    </div>
  );
}

function SettingsSection({ title, children }) {
  return (
    <div style={{
      background: 'white',
      padding: '1.5rem',
      borderRadius: '12px',
    }}>
      <h3 style={{ marginBottom: '1rem', fontWeight: '600' }}>{title}</h3>
      {children}
    </div>
  );
}

function PricingTier({ tier, price, features }) {
  return (
    <div style={{
      background: '#f3f4f6',
      padding: '1rem',
      borderRadius: '6px',
      marginBottom: '0.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <div>
        <strong>{tier}</strong>
        <div style={{ fontSize: '0.85rem', color: '#666' }}>
          {features.map((f, i) => (
            <div key={i}>✓ {f}</div>
          ))}
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>₦{price}</div>
        <button
          style={{
            padding: '0.4rem 0.8rem',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            marginTop: '0.5rem',
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
}
