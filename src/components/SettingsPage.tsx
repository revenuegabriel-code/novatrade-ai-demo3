import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DashboardLayout } from './DashboardLayout';
import { useLanguage } from '../LanguageContext';
import { useAuth } from '../AuthContext';
import { 
  User, 
  Bell, 
  Shield, 
  Monitor, 
  CreditCard, 
  Smartphone, 
  Globe,
  Moon,
  Sun,
  Laptop,
  Check,
  Save,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SettingsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'profile';
  const setActiveTab = (tab: string) => setSearchParams({ tab });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'appearance', label: 'Appearance', icon: Monitor },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  return (
    <DashboardLayout>
      <div className="p-8 max-w-6xl mx-auto relative">
        {/* Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: -20, x: '-50%' }}
              className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3"
            >
              <Check className="w-5 h-5" />
              <span className="font-medium">{toastMessage}</span>
              <button onClick={() => setToastMessage(null)} className="ml-2 hover:text-white/80">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage your account preferences and platform configuration.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <nav className="w-full lg:w-64 flex-shrink-0 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id 
                    ? 'bg-neon-cyan/10 text-neon-cyan' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Content Area */}
          <div className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-charcoal-800/40 border border-white/5 rounded-2xl p-6"
            >
              {activeTab === 'profile' && <ProfileSettings onSave={() => showToast('Profile updated successfully')} />}
              {activeTab === 'appearance' && <AppearanceSettings onSave={() => showToast('Appearance settings saved')} />}
              {activeTab === 'notifications' && <NotificationSettings onSave={() => showToast('Notification preferences updated')} />}
              {activeTab === 'security' && <SecuritySettings onSave={() => showToast('Security settings updated')} onAction={(msg) => showToast(msg)} />}
              {activeTab === 'billing' && <BillingSettings onAction={(msg) => showToast(msg)} />}
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const ProfileSettings = ({ onSave }: { onSave: () => void }) => {
  const { language, setLanguage } = useLanguage();
  const { user } = useAuth();
  const displayName = user?.user_metadata?.full_name || 'Alex Trader';
  const email = user?.email || 'alex@novatrade.ai';
  const tier = user?.app_metadata?.subscription_tier || 'Pro';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6 pb-6 border-b border-white/5">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple ring-4 ring-white/10 flex items-center justify-center text-2xl font-bold text-charcoal-900">
          {displayName.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">{displayName}</h3>
          <p className="text-sm text-gray-400 capitalize">{tier} Member</p>
          <button className="mt-2 text-xs font-medium text-neon-cyan hover:text-neon-cyan/80">
            Change Avatar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-400 uppercase">Display Name</label>
          <input 
            type="text" 
            defaultValue={displayName}
            className="w-full bg-charcoal-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-neon-cyan/50 transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-400 uppercase">Email Address</label>
          <input 
            type="email" 
            defaultValue={email}
            className="w-full bg-charcoal-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-neon-cyan/50 transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-400 uppercase">Timezone</label>
          <select className="w-full bg-charcoal-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-neon-cyan/50 transition-colors">
            <option>UTC-8 (Pacific Time)</option>
            <option>UTC-5 (Eastern Time)</option>
            <option>UTC+0 (London)</option>
            <option>UTC+8 (Singapore)</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-400 uppercase">Currency</label>
          <select className="w-full bg-charcoal-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-neon-cyan/50 transition-colors">
            <option>USD ($)</option>
            <option>EUR (€)</option>
            <option>GBP (£)</option>
            <option>JPY (¥)</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-400 uppercase">Language</label>
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'en' | 'fr')}
            className="w-full bg-charcoal-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-neon-cyan/50 transition-colors"
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
          </select>
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button 
          onClick={onSave}
          className="bg-neon-cyan text-charcoal-900 font-bold px-6 py-2 rounded-lg hover:bg-neon-cyan/90 transition-colors flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );
};

const AppearanceSettings = ({ onSave }: { onSave: () => void }) => (
  <div className="space-y-8">
    <div>
      <h3 className="text-lg font-bold text-white mb-1">Theme Preference</h3>
      <p className="text-sm text-gray-400 mb-4">Choose how the platform looks to you.</p>
      
      <div className="grid grid-cols-3 gap-4">
        {[
          { id: 'dark', label: 'Dark Mode', icon: Moon, active: true },
          { id: 'light', label: 'Light Mode', icon: Sun, active: false },
          { id: 'system', label: 'System', icon: Laptop, active: false },
        ].map((theme) => (
          <button 
            key={theme.id}
            className={`flex flex-col items-center gap-3 p-4 rounded-xl border transition-all ${
              theme.active 
                ? 'bg-neon-cyan/10 border-neon-cyan text-white' 
                : 'bg-charcoal-900 border-white/5 text-gray-400 hover:border-white/10'
            }`}
          >
            <theme.icon className={`w-6 h-6 ${theme.active ? 'text-neon-cyan' : ''}`} />
            <span className="text-sm font-medium">{theme.label}</span>
          </button>
        ))}
      </div>
    </div>

    <div>
      <h3 className="text-lg font-bold text-white mb-1">Accent Color</h3>
      <p className="text-sm text-gray-400 mb-4">Customize the primary color of the interface.</p>
      
      <div className="flex gap-4">
        {[
          { color: 'bg-neon-cyan', active: true },
          { color: 'bg-neon-purple', active: false },
          { color: 'bg-green-400', active: false },
          { color: 'bg-blue-500', active: false },
          { color: 'bg-orange-500', active: false },
        ].map((accent, i) => (
          <button 
            key={i}
            className={`w-10 h-10 rounded-full ${accent.color} relative ring-2 ring-offset-2 ring-offset-charcoal-800 ${
              accent.active ? 'ring-white' : 'ring-transparent hover:ring-white/50'
            }`}
          >
            {accent.active && <Check className="w-5 h-5 text-charcoal-900 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
          </button>
        ))}
      </div>
    </div>

    <div className="pt-4 border-t border-white/5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="text-white font-medium">Compact Mode</h4>
          <p className="text-xs text-gray-400">Increase data density on the dashboard</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" />
          <div className="w-11 h-6 bg-charcoal-900 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-cyan"></div>
        </label>
      </div>
      
      <div className="flex justify-end">
        <button 
          onClick={onSave}
          className="bg-neon-cyan text-charcoal-900 font-bold px-6 py-2 rounded-lg hover:bg-neon-cyan/90 transition-colors flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Preferences
        </button>
      </div>
    </div>
  </div>
);

const NotificationSettings = ({ onSave }: { onSave: () => void }) => (
  <div className="space-y-6">
    {[
      { title: 'Trade Executions', desc: 'Get notified when a trade is opened or closed', email: true, push: true },
      { title: 'Price Alerts', desc: 'When an asset hits your target price', email: false, push: true },
      { title: 'Security Alerts', desc: 'New device logins and password changes', email: true, push: true },
      { title: 'Marketing', desc: 'News, updates, and promotional offers', email: false, push: false },
    ].map((item, i) => (
      <div key={i} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
        <div>
          <h4 className="text-white font-medium">{item.title}</h4>
          <p className="text-xs text-gray-400">{item.desc}</p>
        </div>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked={item.email} className="rounded bg-charcoal-900 border-white/10 text-neon-cyan focus:ring-neon-cyan/50" />
            <span className="text-xs text-gray-400">Email</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked={item.push} className="rounded bg-charcoal-900 border-white/10 text-neon-cyan focus:ring-neon-cyan/50" />
            <span className="text-xs text-gray-400">Push</span>
          </label>
        </div>
      </div>
    ))}
    
    <div className="pt-4 flex justify-end">
      <button 
        onClick={onSave}
        className="bg-neon-cyan text-charcoal-900 font-bold px-6 py-2 rounded-lg hover:bg-neon-cyan/90 transition-colors flex items-center gap-2"
      >
        <Save className="w-4 h-4" />
        Save Preferences
      </button>
    </div>
  </div>
);

const SecuritySettings = ({ onSave, onAction }: { onSave: () => void, onAction: (msg: string) => void }) => (
  <div className="space-y-6">
    <div className="p-4 bg-neon-cyan/5 border border-neon-cyan/20 rounded-xl flex items-start gap-4">
      <Shield className="w-6 h-6 text-neon-cyan flex-shrink-0" />
      <div>
        <h4 className="text-neon-cyan font-bold mb-1">Two-Factor Authentication (2FA)</h4>
        <p className="text-sm text-gray-300 mb-3">Protect your account with an extra layer of security using Google Authenticator or Authy.</p>
        <button 
          onClick={() => onAction('2FA Setup initiated. Check your email.')}
          className="bg-neon-cyan text-charcoal-900 text-xs font-bold px-4 py-2 rounded-lg hover:bg-neon-cyan/90 transition-colors"
        >
          Enable 2FA
        </button>
      </div>
    </div>

    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white">Change Password</h3>
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-400 uppercase">Current Password</label>
        <input type="password" className="w-full bg-charcoal-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-neon-cyan/50 transition-colors" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-400 uppercase">New Password</label>
          <input type="password" className="w-full bg-charcoal-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-neon-cyan/50 transition-colors" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-400 uppercase">Confirm Password</label>
          <input type="password" className="w-full bg-charcoal-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-neon-cyan/50 transition-colors" />
        </div>
      </div>
      <div className="pt-2 flex justify-end">
        <button 
          onClick={onSave}
          className="bg-white/10 text-white font-medium px-6 py-2 rounded-lg hover:bg-white/20 transition-colors"
        >
          Update Password
        </button>
      </div>
    </div>
  </div>
);

const BillingSettings = ({ onAction }: { onAction: (msg: string) => void }) => (
  <div className="text-center py-12">
    <CreditCard className="w-12 h-12 text-gray-600 mx-auto mb-4" />
    <h3 className="text-xl font-bold text-white mb-2">Payment Methods</h3>
    <p className="text-gray-400 mb-6">Manage your subscription and payment details.</p>
    <button 
      onClick={() => onAction('Redirecting to secure payment portal...')}
      className="bg-neon-cyan text-charcoal-900 font-bold px-6 py-3 rounded-lg hover:bg-neon-cyan/90 transition-colors"
    >
      Manage Subscription
    </button>
  </div>
);
