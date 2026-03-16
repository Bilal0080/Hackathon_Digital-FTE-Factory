import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Activity, Clock, ShieldCheck, Cpu, TrendingUp, History, AlertCircle, CheckCircle2 } from 'lucide-react';
import { DigitalFTE } from '../types';
import { cn } from '../lib/utils';
import { ProductivityChart } from './ProductivityChart';

interface FTEDetailsPanelProps {
  fte: DigitalFTE | null;
  onClose: () => void;
}

export const FTEDetailsPanel: React.FC<FTEDetailsPanelProps> = ({ fte, onClose }) => {
  if (!fte) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full max-w-md bg-factory-card border-l border-factory-border h-full overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-factory-card/80 backdrop-blur-md border-b border-factory-border px-6 py-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-factory-accent/10 rounded-lg text-factory-accent">
                <Cpu size={20} />
              </div>
              <div>
                <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-zinc-400">Unit Intelligence</h2>
                <p className="text-lg font-bold text-white">{fte.name}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-full text-zinc-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-lg border border-factory-border">
                <div className="flex items-center gap-2 text-zinc-500 mb-1">
                  <Activity size={14} />
                  <span className="text-[10px] font-mono uppercase font-bold">Productivity</span>
                </div>
                <p className="text-xl font-mono font-bold text-factory-success">{fte.productivity}%</p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg border border-factory-border">
                <div className="flex items-center gap-2 text-zinc-500 mb-1">
                  <Clock size={14} />
                  <span className="text-[10px] font-mono uppercase font-bold">Uptime</span>
                </div>
                <p className="text-xl font-mono font-bold text-factory-accent">{fte.uptime}</p>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-zinc-400">
                <TrendingUp size={16} />
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider">Performance Metrics</h3>
              </div>
              <div className="h-48 bg-white/5 rounded-lg border border-factory-border p-4">
                {fte.performanceMetrics && fte.performanceMetrics.length > 0 ? (
                  <ProductivityChart data={fte.performanceMetrics} />
                ) : (
                  <div className="h-full flex items-center justify-center text-zinc-600 text-[10px] font-mono uppercase">
                    No metric data available
                  </div>
                )}
              </div>
            </div>

            {/* Task History */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-zinc-400">
                <History size={16} />
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider">Recent Task History</h3>
              </div>
              <div className="space-y-3">
                {fte.taskHistory && fte.taskHistory.length > 0 ? (
                  fte.taskHistory.map((task) => (
                    <div key={task.id} className="p-3 bg-white/5 rounded-lg border border-factory-border flex items-center justify-between group hover:border-factory-accent/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "p-1.5 rounded",
                          task.status === 'completed' ? "bg-factory-success/10 text-factory-success" : 
                          task.status === 'failed' ? "bg-factory-error/10 text-factory-error" : 
                          "bg-factory-accent/10 text-factory-accent"
                        )}>
                          {task.status === 'completed' ? <CheckCircle2 size={14} /> : 
                           task.status === 'failed' ? <AlertCircle size={14} /> : 
                           <Activity size={14} className="animate-pulse" />}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-zinc-200">{task.name}</p>
                          <p className="text-[10px] font-mono text-zinc-500">{task.id} • {task.timestamp}</p>
                        </div>
                      </div>
                      <div className={cn(
                        "text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 rounded border",
                        task.status === 'completed' ? "border-factory-success/20 text-factory-success" : 
                        task.status === 'failed' ? "border-factory-error/20 text-factory-error" : 
                        "border-factory-accent/20 text-factory-accent"
                      )}>
                        {task.status}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center bg-white/5 rounded-lg border border-dashed border-factory-border">
                    <p className="text-[10px] font-mono text-zinc-600 uppercase">No task history recorded</p>
                  </div>
                )}
              </div>
            </div>

            {/* Technical Specs */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-zinc-400">
                <ShieldCheck size={16} />
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider">Technical Specifications</h3>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex justify-between py-2 border-b border-factory-border/50">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Unit Type</span>
                  <span className="text-[10px] font-mono text-zinc-300">{fte.type}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-factory-border/50">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Operational Cost</span>
                  <span className="text-[10px] font-mono text-zinc-300">${fte.costPerHour}/hr</span>
                </div>
                <div className="flex justify-between py-2 border-b border-factory-border/50">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Last Active</span>
                  <span className="text-[10px] font-mono text-zinc-300">{fte.lastActive}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-factory-border/50">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Total Tasks</span>
                  <span className="text-[10px] font-mono text-zinc-300">{fte.tasksCompleted.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
