import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

interface RatingData {
  date: string;
  leetcode?: number;
  codeforces?: number;
  codechef?: number;
}

interface RatingGraphProps {
  data: RatingData[];
}

export function RatingGraph({ data }: RatingGraphProps) {
  const platformColors = {
    leetcode: '#FFA116',
    codeforces: '#1890FF',
    codechef: '#429e4d',
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
        <TrendingUp className="w-5 h-5 mr-2" />
        Rating Progress
      </h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="date"
              stroke="#6B7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '8px',
                color: '#F3F4F6',
              }}
            />
            <Legend />
            {Object.entries(platformColors).map(([platform, color]) => (
              <Line
                key={platform}
                type="monotone"
                dataKey={platform}
                stroke={color}
                name={platform.charAt(0).toUpperCase() + platform.slice(1)}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}