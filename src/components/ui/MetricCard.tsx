'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    period: string;
  };
  icon?: LucideIcon;
  suffix?: string;
  prefix?: string;
  className?: string;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

export const MetricCard = ({
  title,
  value,
  change,
  icon: Icon,
  suffix = '',
  prefix = '',
  className = '',
  color = 'blue',
}: MetricCardProps) => {
  const formatValue = (val: string | number): string => {
    if (typeof val === 'number') {
      if (val >= 1e9) return `${(val / 1e9).toFixed(2)}B`;
      if (val >= 1e6) return `${(val / 1e6).toFixed(2)}M`;
      if (val >= 1e3) return `${(val / 1e3).toFixed(2)}K`;
      return val.toFixed(2);
    }
    return val;
  };

  const colorClasses = {
    blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
    green: 'from-green-500/20 to-green-600/20 border-green-500/30',
    purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
    orange: 'from-orange-500/20 to-orange-600/20 border-orange-500/30',
    red: 'from-red-500/20 to-red-600/20 border-red-500/30',
  };

  const iconColors = {
    blue: 'text-blue-400',
    green: 'text-green-400',
    purple: 'text-purple-400',
    orange: 'text-orange-400',
    red: 'text-red-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`
        relative p-4 rounded-lg border bg-gradient-to-br ${colorClasses[color]}
        hover:scale-105 transition-transform duration-200
        ${className}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="text-sm font-medium text-gray-300 mb-1">{title}</h4>
          <div className="text-2xl font-bold text-white">
            {prefix}{formatValue(value)}{suffix}
          </div>
          {change && (
            <div className="flex items-center mt-2">
              <span
                className={`text-sm font-medium ${
                  change.value >= 0 ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {change.value >= 0 ? '+' : ''}{change.value.toFixed(2)}%
              </span>
              <span className="text-xs text-gray-500 ml-1">
                {change.period}
              </span>
            </div>
          )}
        </div>
        
        {Icon && (
          <div className={`p-2 rounded-lg bg-gray-800/50 ${iconColors[color]}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </motion.div>
  );
};