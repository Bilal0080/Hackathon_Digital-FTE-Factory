import React from 'react';
import { Activity, Clock, CheckCircle2, AlertCircle, Loader2, ChevronUp, ChevronDown } from 'lucide-react';
import { DigitalFTE, FTEStatus } from '../types';
import { cn } from '../lib/utils';

export type SortKey = 'id' | 'type' | 'status' | 'productivity' | 'tasksCompleted';
export type SortOrder = 'asc' | 'desc';

interface FTEListProps {
  ftes: DigitalFTE[];
  sortKey: SortKey;
  sortOrder: SortOrder;
  onSort: (key: SortKey) => void;
  onSelect: (fte: DigitalFTE) => void;
}

const StatusBadge: React.FC<{ status: FTEStatus }> = ({ status }) => {
  const configs = {
    active: { 
      color: 'text-factory-success bg-factory-success/10 border-factory-success/20', 
      icon: <Activity size={12} />, 
      label: 'Active',
      glow: 'shadow-[0_0_8px_rgba(16,185,129,0.2)]'
    },
    idle: { 
      color: 'text-zinc-500 bg-zinc-500/10 border-zinc-500/20', 
      icon: <Clock size={12} />, 
      label: 'Idle',
      glow: ''
    },
    error: { 
      color: 'text-factory-error bg-factory-error/10 border-factory-error/20', 
      icon: <AlertCircle size={12} />, 
      label: 'Error',
      glow: 'shadow-[0_0_8px_rgba(239,68,68,0.2)]'
    },
    deploying: { 
      color: 'text-factory-accent bg-factory-accent/10 border-factory-accent/20', 
      icon: <Loader2 size={12} className="animate-spin" />, 
      label: 'Deploying',
      glow: 'shadow-[0_0_8px_rgba(59,130,246,0.2)]'
    },
  };

  const config = configs[status];

  return (
    <div className={cn(
      "flex items-center gap-1.5 px-2 py-0.5 rounded border text-[10px] font-mono font-bold uppercase transition-all duration-300", 
      config.color,
      config.glow
    )}>
      {config.icon}
      {config.label}
    </div>
  );
};

export const FTEList: React.FC<FTEListProps> = ({ ftes, sortKey, sortOrder, onSort, onSelect }) => {
  const getStatusColor = (status: FTEStatus) => {
    switch (status) {
      case 'active': return 'bg-factory-success';
      case 'idle': return 'bg-zinc-600';
      case 'error': return 'bg-factory-error';
      case 'deploying': return 'bg-factory-accent';
      default: return 'bg-zinc-600';
    }
  };

  const getStatusIcon = (status: FTEStatus) => {
    switch (status) {
      case 'active': return <Activity size={12} className="text-factory-success" />;
      case 'idle': return <Clock size={12} className="text-zinc-500" />;
      case 'error': return <AlertCircle size={12} className="text-factory-error" />;
      case 'deploying': return <Loader2 size={12} className="text-factory-accent animate-spin" />;
      default: return null;
    }
  };

  const getStatusRowTint = (status: FTEStatus) => {
    switch (status) {
      case 'active': return 'hover:bg-factory-success/5';
      case 'idle': return 'hover:bg-zinc-500/5';
      case 'error': return 'hover:bg-factory-error/5';
      case 'deploying': return 'hover:bg-factory-accent/5';
      default: return 'hover:bg-white/5';
    }
  };

  const SortIndicator: React.FC<{ columnKey: SortKey }> = ({ columnKey }) => {
    if (sortKey !== columnKey) return <div className="w-3 h-3" />;
    return sortOrder === 'asc' ? <ChevronUp size={12} className="text-factory-accent" /> : <ChevronDown size={12} className="text-factory-accent" />;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-factory-border">
            <th 
              className="pb-3 pl-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-medium cursor-pointer hover:text-zinc-300 transition-colors"
              onClick={() => onSort('id')}
            >
              <div className="flex items-center gap-1">
                ID / Name
                <SortIndicator columnKey="id" />
              </div>
            </th>
            <th 
              className="pb-3 text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-medium cursor-pointer hover:text-zinc-300 transition-colors"
              onClick={() => onSort('type')}
            >
              <div className="flex items-center gap-1">
                Type
                <SortIndicator columnKey="type" />
              </div>
            </th>
            <th 
              className="pb-3 text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-medium cursor-pointer hover:text-zinc-300 transition-colors"
              onClick={() => onSort('status')}
            >
              <div className="flex items-center gap-1">
                Status
                <SortIndicator columnKey="status" />
              </div>
            </th>
            <th 
              className="pb-3 text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-medium cursor-pointer hover:text-zinc-300 transition-colors"
              onClick={() => onSort('productivity')}
            >
              <div className="flex items-center gap-1">
                Productivity
                <SortIndicator columnKey="productivity" />
              </div>
            </th>
            <th 
              className="pb-3 pr-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-medium text-right cursor-pointer hover:text-zinc-300 transition-colors"
              onClick={() => onSort('tasksCompleted')}
            >
              <div className="flex items-center justify-end gap-1">
                Tasks
                <SortIndicator columnKey="tasksCompleted" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-factory-border">
          {ftes.map((fte) => (
            <tr 
              key={fte.id} 
              className={cn("group transition-colors relative cursor-pointer", getStatusRowTint(fte.status))}
              onClick={() => onSelect(fte)}
            >
              <td className="py-4 pl-4 relative">
                <div className={cn(
                  "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r transition-all duration-300 opacity-0 group-hover:opacity-100",
                  getStatusColor(fte.status)
                )} />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-factory-accent">{fte.id}</span>
                    {getStatusIcon(fte.status)}
                  </div>
                  <span className="text-sm font-medium">{fte.name}</span>
                </div>
              </td>
              <td className="py-4">
                <span className="text-xs text-zinc-400">{fte.type}</span>
              </td>
              <td className="py-4">
                <StatusBadge status={fte.status} />
              </td>
              <td className="py-4">
                <div className="flex items-center gap-3">
                  <div className="w-24 h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full transition-all duration-500",
                        fte.productivity > 80 ? "bg-factory-success" : fte.productivity > 50 ? "bg-factory-warning" : "bg-factory-error"
                      )}
                      style={{ width: `${fte.productivity}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono">{fte.productivity}%</span>
                </div>
              </td>
              <td className="py-4 pr-4 text-right">
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs font-mono">{fte.tasksCompleted.toLocaleString()}</span>
                  <div className="w-20 h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-factory-accent transition-all duration-500"
                      style={{ width: `${Math.min((fte.tasksCompleted / 5000) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-[8px] font-mono text-zinc-500 uppercase">Goal: 5,000</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
