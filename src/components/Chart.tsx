import React from 'react';

interface ChartProps {
  data: any;
  type: 'line' | 'bar' | 'doughnut';
  height?: string;
}

const Chart: React.FC<ChartProps> = ({ data, type, height = "300px" }) => {
  // This is a simplified chart component for demonstration
  // In a real application, you would use a library like Chart.js or Recharts
  
  if (type === 'doughnut') {
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="40"
              strokeDasharray="176 251"
              strokeLinecap="round"
            />
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#10B981"
              strokeWidth="40"
              strokeDasharray="126 301"
              strokeDashoffset="-176"
              strokeLinecap="round"
            />
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="40"
              strokeDasharray="100 327"
              strokeDashoffset="-302"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Usage</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-end justify-between space-x-2" style={{ height }}>
      {data.labels?.map((label: string, index: number) => (
        <div key={index} className="flex flex-col items-center space-y-2 flex-1">
          <div className="flex flex-col items-center justify-end h-48 space-y-1">
            {data.datasets?.map((dataset: any, datasetIndex: number) => (
              <div
                key={datasetIndex}
                className="w-8 rounded-t transition-all duration-500 hover:opacity-80"
                style={{
                  height: `${(dataset.data[index] / Math.max(...dataset.data)) * 150}px`,
                  backgroundColor: dataset.borderColor || dataset.backgroundColor?.[index] || '#3B82F6'
                }}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-400">{label}</span>
        </div>
      ))}
    </div>
  );
};

export default Chart;