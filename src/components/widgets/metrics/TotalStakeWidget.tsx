'use client';

import { useState } from 'react';
import { Shield } from 'lucide-react';
import { Widget } from '@/components/ui/Widget';
import { Chart } from '@/components/ui/Chart';
import { useValidatorData } from '@/hooks/useCardanoData';
import { TimePeriod } from '@/types/cardano';
import { REFRESH_INTERVALS } from '@/constants/cardano';

export const TotalStakeWidget = () => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('day');
  const { data, loading, error, refetch } = useValidatorData(
    timePeriod,
    REFRESH_INTERVALS.MEDIUM
  );

  const getCurrentValue = () => {
    return data?.totalStake && data.totalStake.length > 0 
      ? data.totalStake[data.totalStake.length - 1].value 
      : 0;
  };

  const getChange = () => {
    if (!data?.totalStake || data.totalStake.length < 2) return 0;
    const current = data.totalStake[data.totalStake.length - 1].value;
    const previous = data.totalStake[data.totalStake.length - 2].value;
    return ((current - previous) / previous) * 100;
  };

  const formatValue = (value: number) => {
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
    return value.toLocaleString();
  };

  return (
    <Widget
      title="Total Stake"
      description="Total ADA delegated to stake pools across the network"
      loading={loading}
      error={error}
      timePeriod={timePeriod}
      onTimePeriodChange={setTimePeriod}
      onRefresh={refetch}
    >
      <div className="space-y-6">
        {/* Current Value Display */}
        <div className="text-center p-6 bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-lg border border-green-500/20">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-green-400" />
            <span className="text-sm font-medium text-gray-400">Total Staked</span>
          </div>
          <div className="text-4xl font-bold text-white mb-2">
            {formatValue(getCurrentValue())} <span className="text-2xl text-gray-400">ADA</span>
          </div>
          <div className={`text-sm font-medium ${getChange() >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {getChange() >= 0 ? '+' : ''}{getChange().toFixed(2)}% from previous period
          </div>
        </div>

        {/* Chart */}
        <div>
          <Chart
            data={data?.totalStake || []}
            type="area"
            color="#10B981"
            height={300}
            formatTooltip={(point) => {
              const date = new Date(point.x).toLocaleDateString();
              const value = point.y >= 1e9 ? `${(point.y / 1e9).toFixed(2)}B` : `${(point.y / 1e6).toFixed(2)}M`;
              return `<b>${date}</b><br/>Total Stake: <b>${value} ADA</b>`;
            }}
          />
        </div>
      </div>
    </Widget>
  );
};