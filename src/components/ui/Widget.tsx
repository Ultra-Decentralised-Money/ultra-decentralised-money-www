'use client';

import { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { TimePeriodSelector } from './TimePeriodSelector';
import { LoadingSpinner } from './LoadingSpinner';
import { TimePeriod } from '@/types/cardano';

interface WidgetProps {
  title: string;
  description?: string;
  children: ReactNode;
  loading?: boolean;
  error?: string | null;
  timePeriod?: TimePeriod;
  onTimePeriodChange?: (period: TimePeriod) => void;
  onRefresh?: () => void;
  className?: string;
  showTimePeriodSelector?: boolean;
  lastUpdated?: Date | null;
}

export const Widget = ({
  title,
  description,
  children,
  loading = false,
  error = null,
  timePeriod = 'day',
  onTimePeriodChange,
  onRefresh,
  className = '',
  showTimePeriodSelector = true,
  lastUpdated,
}: WidgetProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (onRefresh && !isRefreshing) {
      setIsRefreshing(true);
      await onRefresh();
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6
        hover:border-gray-700 transition-all duration-300
        ${className}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          {description && (
            <p className="text-sm text-gray-400">{description}</p>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          {showTimePeriodSelector && onTimePeriodChange && (
            <TimePeriodSelector
              selected={timePeriod}
              onChange={onTimePeriodChange}
            />
          )}
          
          {onRefresh && (
            <button
              onClick={handleRefresh}
              disabled={isRefreshing || loading}
              className="
                p-2 text-gray-400 hover:text-white hover:bg-gray-800 
                rounded-lg transition-all duration-200 disabled:opacity-50
              "
              title="Refresh data"
            >
              <RefreshCw 
                className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} 
              />
            </button>
          )}
        </div>
      </div>

      {/* Last Updated */}
      {lastUpdated && (
        <div className="text-xs text-gray-500 mb-3">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      )}

      {/* Content */}
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm rounded-lg">
            <LoadingSpinner size="lg" />
          </div>
        )}
        
        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-900/20 border border-red-800 rounded-lg mb-4">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <div className="text-sm text-red-300">
              <strong>Error:</strong> {error}
            </div>
          </div>
        )}
        
        <div className={loading ? 'opacity-50' : 'opacity-100'}>
          {children}
        </div>
      </div>
    </motion.div>
  );
};