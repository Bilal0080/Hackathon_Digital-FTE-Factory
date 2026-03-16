import React from 'react';
import { 
  LayoutDashboard, 
  Factory, 
  Cpu, 
  BarChart3, 
  Settings, 
  Zap,
  Activity,
  Box
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 group relative",
      active 
        ? "text-factory-accent bg-factory-accent/10" 
        : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
    )}
  >
    {active && (
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-factory-accent" />
    )}
    <span className={cn("transition-transform duration-200", active ? "scale-110" : "group-hover:scale-110")}>
      {icon}
    </span>
    <span className="font-mono text-xs uppercase tracking-widest">{label}</span>
  </button>
);

export const Sidebar: React.FC<{ activeTab: string; setActiveTab: (tab: string) => void }> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-64 h-screen border-r border-factory-border bg-factory-bg flex flex-col z-20">
      <div className="p-6 flex items-center gap-3 border-b border-factory-border">
        <div className="w-8 h-8 bg-factory-accent rounded flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
          <Factory className="text-white size-5" />
        </div>
        <div>
          <h1 className="text-sm font-bold font-mono tracking-tighter leading-none">DIGITAL FTE</h1>
          <p className="text-[10px] font-mono text-factory-accent uppercase tracking-widest mt-1">Factory v2.4</p>
        </div>
      </div>

      <div className="flex-1 py-6">
        <SidebarItem 
          icon={<LayoutDashboard size={18} />} 
          label="Dashboard" 
          active={activeTab === 'dashboard'} 
          onClick={() => setActiveTab('dashboard')}
        />
        <SidebarItem 
          icon={<Box size={18} />} 
          label="Factory Floor" 
          active={activeTab === 'floor'} 
          onClick={() => setActiveTab('floor')}
        />
        <SidebarItem 
          icon={<Cpu size={18} />} 
          label="Deployment" 
          active={activeTab === 'deployment'} 
          onClick={() => setActiveTab('deployment')}
        />
        <SidebarItem 
          icon={<BarChart3 size={18} />} 
          label="Analytics" 
          active={activeTab === 'analytics'} 
          onClick={() => setActiveTab('analytics')}
        />
      </div>

      <div className="p-4 border-t border-factory-border">
        <SidebarItem 
          icon={<Settings size={18} />} 
          label="System Config" 
          active={activeTab === 'settings'} 
          onClick={() => setActiveTab('settings')}
        />
        <div className="mt-4 p-3 bg-white/5 rounded border border-factory-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">System Load</span>
            <span className="text-[10px] font-mono text-factory-success">Normal</span>
          </div>
          <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-factory-success w-[34%]" />
          </div>
        </div>
      </div>
    </div>
  );
};
