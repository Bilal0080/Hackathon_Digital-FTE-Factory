export type FTEStatus = 'active' | 'idle' | 'error' | 'deploying';

export interface TaskEntry {
  id: string;
  name: string;
  timestamp: string;
  status: 'completed' | 'failed' | 'in-progress';
}

export interface DigitalFTE {
  id: string;
  name: string;
  type: 'Data Analyst' | 'Customer Support' | 'Code Reviewer' | 'Content Writer' | 'Researcher';
  status: FTEStatus;
  productivity: number; // 0-100
  uptime: string;
  lastActive: string;
  tasksCompleted: number;
  costPerHour: number;
  taskHistory?: TaskEntry[];
  performanceMetrics?: MetricData[];
}

export interface MetricData {
  time: string;
  value: number;
}
