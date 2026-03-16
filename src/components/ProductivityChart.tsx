import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { PRODUCTIVITY_DATA } from '../constants';

export const ProductivityChart: React.FC = () => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={PRODUCTIVITY_DATA}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
          <XAxis 
            dataKey="time" 
            stroke="#52525B" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false}
            fontFamily="JetBrains Mono"
          />
          <YAxis 
            stroke="#52525B" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false}
            fontFamily="JetBrains Mono"
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#141417', 
              border: '1px solid #27272A',
              borderRadius: '4px',
              fontFamily: 'JetBrains Mono',
              fontSize: '10px'
            }}
            itemStyle={{ color: '#3B82F6' }}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#3B82F6" 
            fillOpacity={1} 
            fill="url(#colorValue)" 
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
