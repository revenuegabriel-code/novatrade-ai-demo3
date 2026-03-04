import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { LayoutDashboard, LogOut, Settings, CreditCard, Bell, TrendingUp, Users, PieChart, Activity, Menu, X, ChevronDown, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Trader';
  const displayEmail = user?.email || 'user@example.com';

  return (
    <div className="min-h-screen bg-charcoal-900 flex">
      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-charcoal-800/30 hidden md:flex flex-col sticky top-0 h-screen">
        <div className="p-6">
          <Link to="/dashboard" className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Activity className="w-6 h-6 text-neon-cyan" />
            Nova<span className="text-neon-cyan">Trade</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <NavItem icon={LayoutDashboard} to="/dashboard">Overview</NavItem>
          <NavItem icon={TrendingUp} to="/trading">Live Trading</NavItem>
          <NavItem icon={PieChart} to="/portfolio">Portfolio</NavItem>
          <NavItem icon={CreditCard} to="/pricing">Billing</NavItem>
          <NavItem icon={Settings} to="/settings">Settings</NavItem>
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="p-4 rounded-xl bg-gradient-to-br from-neon-cyan/10 to-neon-purple/10 border border-white/5 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400">Status</span>
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                ONLINE
              </span>
            </div>
            <p className="text-sm font-bold text-white capitalize">{user?.app_metadata?.subscription_tier || 'Pro'} Tier</p>
          </div>
          <button 
            onClick={signOut}
            className="flex items-center gap-3 text-gray-400 hover:text-white px-4 py-2 w-full transition-colors rounded-lg hover:bg-white/5"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-64 bg-charcoal-900 border-r border-white/10 z-50 md:hidden flex flex-col"
            >
              <div className="p-6 flex items-center justify-between">
                <Link to="/dashboard" className="text-2xl font-bold text-white tracking-tight flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <Activity className="w-6 h-6 text-neon-cyan" />
                  Nova<span className="text-neon-cyan">Trade</span>
                </Link>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <nav className="flex-1 px-4 space-y-2">
                <NavItem icon={LayoutDashboard} to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>Overview</NavItem>
                <NavItem icon={TrendingUp} to="/trading" onClick={() => setIsMobileMenuOpen(false)}>Live Trading</NavItem>
                <NavItem icon={PieChart} to="/portfolio" onClick={() => setIsMobileMenuOpen(false)}>Portfolio</NavItem>
                <NavItem icon={CreditCard} to="/pricing" onClick={() => setIsMobileMenuOpen(false)}>Billing</NavItem>
                <NavItem icon={Settings} to="/settings" onClick={() => setIsMobileMenuOpen(false)}>Settings</NavItem>
              </nav>

              <div className="p-4 border-t border-white/5">
                <button 
                  onClick={signOut}
                  className="flex items-center gap-3 text-gray-400 hover:text-white px-4 py-2 w-full transition-colors rounded-lg hover:bg-white/5"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Sign Out</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-screen flex flex-col relative">
        {/* Top Bar */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-4 md:px-8 bg-charcoal-900/50 backdrop-blur-sm sticky top-0 z-30 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-gray-400 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-medium text-white hidden sm:block">Dashboard</h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-gray-400 border border-white/5 hidden sm:block">
              BETA v2.0
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-neon-cyan rounded-full animate-ping" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-neon-cyan rounded-full" />
            </button>
            
            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-3 pl-4 border-l border-white/5 hover:bg-white/5 p-2 rounded-lg transition-colors group"
              >
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-bold text-white group-hover:text-neon-cyan transition-colors">{displayName}</div>
                  <div className="text-xs text-gray-500">{user?.app_metadata?.subscription_tier || 'Pro Account'}</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple ring-2 ring-white/10 group-hover:ring-neon-cyan/50 transition-all flex items-center justify-center text-charcoal-900 font-bold text-xs">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isProfileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                    className="absolute right-0 top-full mt-2 w-56 bg-charcoal-800 border border-white/10 rounded-xl shadow-xl overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-white/5">
                      <p className="text-sm font-bold text-white">{displayName}</p>
                      <p className="text-xs text-gray-400 truncate">{displayEmail}</p>
                    </div>
                    <div className="p-2">
                      <Link 
                        to="/settings" 
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                      <Link 
                        to="/settings" 
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                      <Link 
                        to="/pricing" 
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                      >
                        <CreditCard className="w-4 h-4" />
                        Billing
                      </Link>
                    </div>
                    <div className="p-2 border-t border-white/5">
                      <button 
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          signOut();
                        }}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-400/10 rounded-lg w-full transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon: Icon, children, to, onClick }: { icon: any, children: React.ReactNode, to: string, onClick?: () => void }) => {
  const location = useLocation();
  const active = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all",
        active 
          ? "bg-neon-cyan/10 text-neon-cyan" 
          : "text-gray-400 hover:bg-white/5 hover:text-white"
      )}
    >
      <Icon className="w-5 h-5" />
      {children}
    </Link>
  );
};
