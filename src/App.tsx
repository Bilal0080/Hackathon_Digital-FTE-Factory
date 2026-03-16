import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Plus, 
  Search,
  Filter,
  Download,
  RefreshCw,
  Bell,
  Activity,
  AlertCircle,
  Factory,
  Clock,
  ShieldCheck,
  Cpu,
  Globe
} from 'lucide-react';
import { cn } from './lib/utils';
import { Sidebar } from './components/Sidebar';
import { Card } from './components/Card';
import { ProductivityChart } from './components/ProductivityChart';
import { FTEList, SortKey, SortOrder } from './components/FTEList';
import { FTEDetailsPanel } from './components/FTEDetailsPanel';
import { MOCK_FTES } from './constants';
import { FTEStatus, DigitalFTE } from './types';

const StatCard: React.FC<{ label: string; value: string; subValue: string; icon: React.ReactNode; trend?: 'up' | 'down' }> = ({ label, value, subValue, icon, trend }) => (
  <Card className="flex flex-col justify-between group hover:border-factory-accent/50 transition-all duration-300">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-factory-accent/10 rounded-lg text-factory-accent group-hover:scale-110 transition-transform">
        {icon}
      </div>
      {trend && (
        <div className={cn(
          "flex items-center gap-1 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded",
          trend === 'up' ? "text-factory-success bg-factory-success/10" : "text-factory-error bg-factory-error/10"
        )}>
          {trend === 'up' ? <TrendingUp size={10} /> : <TrendingUp size={10} className="rotate-180" />}
          {trend === 'up' ? '+12.5%' : '-2.4%'}
        </div>
      )}
    </div>
    <div>
      <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">{label}</p>
      <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
      <p className="text-[10px] font-mono text-zinc-400 mt-1">{subValue}</p>
    </div>
  </Card>
);

const SubKPI: React.FC<{ label: string; value: string; icon: React.ReactNode; color?: string }> = ({ label, value, icon, color = "text-zinc-400" }) => (
  <div className="flex items-center gap-3 p-3 bg-factory-card/30 border border-factory-border/50 rounded-lg hover:bg-factory-card/50 transition-colors">
    <div className={cn("p-1.5 bg-white/5 rounded", color)}>
      {icon}
    </div>
    <div>
      <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-bold font-mono tracking-tight">{value}</p>
    </div>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [statusFilter, setStatusFilter] = useState<FTEStatus | 'all'>('all');
  const [sortKey, setSortKey] = useState<SortKey>('id');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedFTE, setSelectedFTE] = useState<DigitalFTE | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate data fetch
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const getSortedFTEs = () => {
    const filtered = statusFilter === 'all' ? MOCK_FTES : MOCK_FTES.filter(fte => fte.status === statusFilter);
    return [...filtered].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
      }
      
      return 0;
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'Type', 'Status', 'Productivity', 'Uptime', 'Tasks Completed', 'Cost Per Hour'];
    const rows = MOCK_FTES.map(fte => [
      fte.id,
      fte.name,
      fte.type,
      fte.status,
      fte.productivity,
      fte.uptime,
      fte.tasksCompleted,
      fte.costPerHour
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `factory_floor_status_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex h-screen bg-factory-bg overflow-hidden relative">
      <div className="scanline" />
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Header */}
        <header className="h-16 border-b border-factory-border bg-factory-bg/50 backdrop-blur-md flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-zinc-400">
              System Status: <span className="text-factory-success">Operational</span>
            </h2>
            <div className="h-4 w-[1px] bg-factory-border" />
            <div className="text-[10px] font-mono text-zinc-500">
              {formatTime(currentTime)} UTC
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 size-4" />
              <input 
                type="text" 
                placeholder="Search Factory..." 
                className="bg-factory-card border border-factory-border rounded-full py-1.5 pl-9 pr-4 text-xs font-mono focus:outline-none focus:border-factory-accent transition-colors w-64"
              />
            </div>
            <button className="p-2 text-zinc-400 hover:text-zinc-200 transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-factory-error rounded-full border-2 border-factory-bg" />
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-factory-accent to-indigo-600 border border-white/20 flex items-center justify-center text-[10px] font-bold">
              BT
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                {/* Hero Stats (Main KPIs) */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1 h-4 bg-factory-accent rounded-full" />
                    <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">Main Performance KPIs</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard 
                      label="Active Digital FTEs" 
                      value="42" 
                      subValue="3 deploying, 1 error" 
                      icon={<Users size={20} />}
                      trend="up"
                    />
                    <StatCard 
                      label="System Productivity" 
                      value="92.4%" 
                      subValue="Avg. across all units" 
                      icon={<Zap size={20} />}
                      trend="up"
                    />
                    <StatCard 
                      label="Tasks Completed" 
                      value="12,842" 
                      subValue="Last 24 hours" 
                      icon={<CheckCircle2 size={20} className="text-factory-success" />}
                      trend="up"
                    />
                    <StatCard 
                      label="Est. Cost Savings" 
                      value="$4,280" 
                      subValue="Monthly projected" 
                      icon={<DollarSign size={20} />}
                      trend="up"
                    />
                  </div>

                  {/* Operational Sub-KPIs */}
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                    <SubKPI 
                      label="Avg. Response" 
                      value="1.2s" 
                      icon={<Clock size={14} />} 
                      color="text-factory-accent"
                    />
                    <SubKPI 
                      label="Success Rate" 
                      value="99.8%" 
                      icon={<ShieldCheck size={14} />} 
                      color="text-factory-success"
                    />
                    <SubKPI 
                      label="System Load" 
                      value="64%" 
                      icon={<Cpu size={14} />} 
                      color="text-factory-warning"
                    />
                    <SubKPI 
                      label="Global Uptime" 
                      value="99.99%" 
                      icon={<Globe size={14} />} 
                      color="text-indigo-400"
                    />
                  </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card title="Productivity Matrix" className="lg:col-span-2" icon={<Activity size={16} />}>
                    <div className="mb-6 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-mono text-zinc-500 uppercase">Real-time throughput</p>
                        <h4 className="text-lg font-bold">842 units/hr</h4>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-factory-accent/10 border border-factory-accent/20 rounded text-[10px] font-mono text-factory-accent">24H</button>
                        <button className="px-3 py-1 hover:bg-white/5 rounded text-[10px] font-mono text-zinc-500">7D</button>
                        <button className="px-3 py-1 hover:bg-white/5 rounded text-[10px] font-mono text-zinc-500">30D</button>
                      </div>
                    </div>
                    <ProductivityChart />
                  </Card>

                  <Card title="Factory Alerts" icon={<AlertCircle size={16} />}>
                    <div className="space-y-4">
                      {[
                        { time: '10:42', type: 'error', msg: 'FTE-004: Delta-2 connection timeout' },
                        { time: '09:15', type: 'success', msg: 'FTE-005: Epsilon-1 deployment complete' },
                        { time: '08:30', type: 'warning', msg: 'System load exceeding 80% threshold' },
                        { time: '07:22', type: 'info', msg: 'Scheduled maintenance in 4 hours' },
                      ].map((alert, i) => (
                        <div key={i} className="flex gap-3 items-start p-2 rounded hover:bg-white/5 transition-colors cursor-pointer group">
                          <div className={cn(
                            "w-1.5 h-1.5 rounded-full mt-1.5 shrink-0",
                            alert.type === 'error' ? "bg-factory-error shadow-[0_0_8px_#EF4444]" :
                            alert.type === 'warning' ? "bg-factory-warning shadow-[0_0_8px_#F59E0B]" :
                            alert.type === 'success' ? "bg-factory-success shadow-[0_0_8px_#10B981]" :
                            "bg-factory-accent shadow-[0_0_8px_#3B82F6]"
                          )} />
                          <div>
                            <p className="text-xs font-medium group-hover:text-white transition-colors">{alert.msg}</p>
                            <p className="text-[10px] font-mono text-zinc-500 mt-0.5">{alert.time} UTC</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-6 py-2 border border-factory-border rounded text-[10px] font-mono uppercase tracking-widest hover:bg-white/5 transition-colors">
                      View All Logs
                    </button>
                  </Card>
                </div>

                {/* Factory Floor Preview */}
                <Card 
                  title="Factory Floor Status" 
                  icon={<Factory size={16} />}
                  extra={
                    <button 
                      onClick={handleRefresh}
                      className={cn(
                        "p-1.5 hover:bg-white/5 rounded transition-all",
                        isRefreshing && "animate-spin text-factory-accent"
                      )}
                      title="Refresh Data"
                    >
                      <RefreshCw size={14} />
                    </button>
                  }
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex flex-wrap gap-4">
                      <button 
                        onClick={() => setStatusFilter('all')}
                        className={cn(
                          "flex items-center gap-2 px-2 py-1 rounded transition-colors",
                          statusFilter === 'all' ? "bg-white/10" : "hover:bg-white/5"
                        )}
                      >
                        <div className="w-2 h-2 rounded-full bg-zinc-400" />
                        <span className={cn("text-[10px] font-mono uppercase tracking-widest", statusFilter === 'all' ? "text-white" : "text-zinc-500")}>All Units</span>
                      </button>
                      <button 
                        onClick={() => setStatusFilter('active')}
                        className={cn(
                          "flex items-center gap-2 px-2 py-1 rounded transition-colors",
                          statusFilter === 'active' ? "bg-factory-success/20" : "hover:bg-white/5"
                        )}
                      >
                        <div className="w-2 h-2 rounded-full bg-factory-success" />
                        <span className={cn("text-[10px] font-mono uppercase tracking-widest", statusFilter === 'active' ? "text-factory-success" : "text-zinc-500")}>Active</span>
                      </button>
                      <button 
                        onClick={() => setStatusFilter('idle')}
                        className={cn(
                          "flex items-center gap-2 px-2 py-1 rounded transition-colors",
                          statusFilter === 'idle' ? "bg-zinc-600/20" : "hover:bg-white/5"
                        )}
                      >
                        <div className="w-2 h-2 rounded-full bg-zinc-600" />
                        <span className={cn("text-[10px] font-mono uppercase tracking-widest", statusFilter === 'idle' ? "text-zinc-300" : "text-zinc-500")}>Idle</span>
                      </button>
                      <button 
                        onClick={() => setStatusFilter('error')}
                        className={cn(
                          "flex items-center gap-2 px-2 py-1 rounded transition-colors",
                          statusFilter === 'error' ? "bg-factory-error/20" : "hover:bg-white/5"
                        )}
                      >
                        <div className="w-2 h-2 rounded-full bg-factory-error" />
                        <span className={cn("text-[10px] font-mono uppercase tracking-widest", statusFilter === 'error' ? "text-factory-error" : "text-zinc-500")}>Error</span>
                      </button>
                      <button 
                        onClick={() => setStatusFilter('deploying')}
                        className={cn(
                          "flex items-center gap-2 px-2 py-1 rounded transition-colors",
                          statusFilter === 'deploying' ? "bg-factory-accent/20" : "hover:bg-white/5"
                        )}
                      >
                        <div className="w-2 h-2 rounded-full bg-factory-accent" />
                        <span className={cn("text-[10px] font-mono uppercase tracking-widest", statusFilter === 'deploying' ? "text-factory-accent" : "text-zinc-500")}>Deploying</span>
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-1.5 border border-factory-border rounded hover:bg-white/5 text-zinc-400 transition-colors" title="Advanced Filters">
                        <Filter size={14} />
                      </button>
                      <button 
                        onClick={handleExportCSV}
                        className="p-1.5 border border-factory-border rounded hover:bg-white/5 text-zinc-400 transition-colors" 
                        title="Export CSV"
                      >
                        <Download size={14} />
                      </button>
                      <button className="flex items-center gap-2 px-3 py-1.5 bg-factory-accent hover:bg-factory-accent/90 text-white rounded text-[10px] font-mono font-bold uppercase transition-colors">
                        <Plus size={14} />
                        New FTE
                      </button>
                    </div>
                  </div>
                  <FTEList 
                    ftes={getSortedFTEs()} 
                    sortKey={sortKey}
                    sortOrder={sortOrder}
                    onSort={handleSort}
                    onSelect={setSelectedFTE}
                  />
                </Card>
              </motion.div>
            )}

            {activeTab === 'floor' && (
              <motion.div
                key="floor"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card title="Full Factory Floor" icon={<Factory size={16} />}>
                  <FTEList 
                    ftes={[...MOCK_FTES, ...MOCK_FTES]} 
                    sortKey={sortKey}
                    sortOrder={sortOrder}
                    onSort={handleSort}
                    onSelect={setSelectedFTE}
                  />
                </Card>
              </motion.div>
            )}
            
            {/* Other tabs would go here */}
            {['deployment', 'analytics', 'settings'].includes(activeTab) && (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-[60vh] text-center"
              >
                <div className="w-16 h-16 bg-factory-accent/10 rounded-full flex items-center justify-center mb-4 text-factory-accent">
                  <RefreshCw size={32} className="animate-spin-slow" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-widest font-mono">Module Initializing</h3>
                <p className="text-zinc-500 font-mono text-xs mt-2">Accessing secure factory protocols...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <FTEDetailsPanel 
        fte={selectedFTE} 
        onClose={() => setSelectedFTE(null)} 
      />
    </div>
  );
}

function CheckCircle2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
