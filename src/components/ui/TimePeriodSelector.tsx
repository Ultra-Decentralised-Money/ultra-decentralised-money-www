'use client';

import { TimePeriod } from '@/types/cardano';
import { TIME_PERIODS } from '@/constants/cardano';

interface TimePeriodSelectorProps {
  selected: TimePeriod;
  onChange: (period: TimePeriod) => void;
  className?: string;
}

export const TimePeriodSelector = ({ 
  selected, 
  onChange, 
  className = '' 
}: TimePeriodSelectorProps) => {
  return (
    <div className={`flex bg-gray-800/50 rounded-lg p-1 ${className}`}>
      {Object.entries(TIME_PERIODS).map(([period, config]) => (
        <button
          key={period}
          onClick={() => onChange(period as TimePeriod)}
          className={`
            px-3 py-1 text-sm font-medium rounded-md transition-all duration-200
            ${selected === period
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
              : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }
          `}
        >
          {config.label}
        </button>
      ))}
    </div>
  );
};