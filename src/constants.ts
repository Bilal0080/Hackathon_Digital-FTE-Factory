import { DigitalFTE } from './types';

export const MOCK_FTES: DigitalFTE[] = [
  {
    id: 'FTE-001',
    name: 'Alpha-7',
    type: 'Data Analyst',
    status: 'active',
    productivity: 94,
    uptime: '142h 12m',
    lastActive: 'Just now',
    tasksCompleted: 1240,
    costPerHour: 0.12,
    taskHistory: [
      { id: 'T-101', name: 'Market Sentiment Analysis', timestamp: '10m ago', status: 'completed' },
      { id: 'T-102', name: 'Quarterly Revenue Forecast', timestamp: '45m ago', status: 'completed' },
      { id: 'T-103', name: 'Anomaly Detection - Node 4', timestamp: '1h ago', status: 'completed' },
    ],
    performanceMetrics: [
      { time: '08:00', value: 82 },
      { time: '10:00', value: 94 },
      { time: '12:00', value: 91 },
      { time: '14:00', value: 96 },
    ]
  },
  {
    id: 'FTE-002',
    name: 'Beta-4',
    type: 'Customer Support',
    status: 'active',
    productivity: 88,
    uptime: '89h 45m',
    lastActive: '2m ago',
    tasksCompleted: 3421,
    costPerHour: 0.08,
    taskHistory: [
      { id: 'T-201', name: 'Ticket #8842 - Billing', timestamp: '5m ago', status: 'completed' },
      { id: 'T-202', name: 'Ticket #8843 - Login Issue', timestamp: '12m ago', status: 'in-progress' },
    ],
    performanceMetrics: [
      { time: '08:00', value: 75 },
      { time: '10:00', value: 88 },
      { time: '12:00', value: 82 },
      { time: '14:00', value: 85 },
    ]
  },
  {
    id: 'FTE-003',
    name: 'Gamma-9',
    type: 'Code Reviewer',
    status: 'idle',
    productivity: 0,
    uptime: '12h 05m',
    lastActive: '1h ago',
    tasksCompleted: 450,
    costPerHour: 0.15,
    taskHistory: [
      { id: 'T-301', name: 'PR #442 - Auth Module', timestamp: '1h ago', status: 'completed' },
      { id: 'T-302', name: 'PR #443 - UI Components', timestamp: '3h ago', status: 'completed' },
    ],
    performanceMetrics: [
      { time: '08:00', value: 90 },
      { time: '10:00', value: 92 },
      { time: '12:00', value: 0 },
      { time: '14:00', value: 0 },
    ]
  },
  {
    id: 'FTE-004',
    name: 'Delta-2',
    type: 'Content Writer',
    status: 'error',
    productivity: 0,
    uptime: '0h 00m',
    lastActive: '12h ago',
    tasksCompleted: 89,
    costPerHour: 0.05,
    taskHistory: [
      { id: 'T-401', name: 'Blog Post - AI Trends', timestamp: '12h ago', status: 'failed' },
    ],
    performanceMetrics: [
      { time: '08:00', value: 45 },
      { time: '10:00', value: 0 },
      { time: '12:00', value: 0 },
      { time: '14:00', value: 0 },
    ]
  },
  {
    id: 'FTE-005',
    name: 'Epsilon-1',
    type: 'Researcher',
    status: 'deploying',
    productivity: 0,
    uptime: '0h 00m',
    lastActive: 'Never',
    tasksCompleted: 0,
    costPerHour: 0.20,
    taskHistory: [],
    performanceMetrics: []
  },
];

export const PRODUCTIVITY_DATA = [
  { time: '00:00', value: 45 },
  { time: '04:00', value: 52 },
  { time: '08:00', value: 85 },
  { time: '12:00', value: 92 },
  { time: '16:00', value: 78 },
  { time: '20:00', value: 65 },
  { time: '23:59', value: 58 },
];
