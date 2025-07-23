'use client';

import { useState } from 'react';
import { Target } from 'lucide-react';
import { Widget } from '@/components/ui/Widget';
import { Chart } from '@/components/ui/Chart';
import { useValidatorData } from '@/hooks/useCardanoData';
import { TimePeriod } from '@/types/cardano';
import { REFRESH_INTERVALS } from '@/constants/cardano';

export const DecentralizationWidget = () => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('day');
  const { data, loading, error, refetch } = useValidatorData(
    timePeriod,
    REFRESH_INTERVALS.MEDIUM
  );

  const getCurrentValue = () => {
    return data?.decentralizationCoefficient && data.decentralizationCoefficient.length > 0 
      ? data.decentralizationCoefficient[data.decentralizationCoefficient.length - 1].value 
      : 0;
  };

  const getChange = () => {
    if (!data?.decentralizationCoefficient || data.decentralizationCoefficient.length < 2) return 0;
    const current = data.decentralizationCoefficient[data.decentralizationCoefficient.length - 1].value;
    const previous = data.decentralizationCoefficient[data.decentralizationCoefficient.length - 2].value;
    return ((current - previous) / previous) * 100;
  };

  const getDecentralizationLevel = (value: number) => {
    if (value >= 0.8) return { level: 'Highly Decentralized', color: 'text-green-400' };
    if (value >= 0.6) return { level: 'Well Decentralized', color: 'text-blue-400' };
    if (value >= 0.4) return { level: 'Moderately Decentralized', color: 'text-yellow-400' };
    return { level: 'Centralized', color: 'text-red-400' };
  };

  const decentralizationStatus = getDecentralizationLevel(getCurrentValue());

  return (
    <Widget
      title="Decentralization Coefficient"
      description="Network decentralization level based on stake distribution"
      loading={loading}
      error={error}
      timePeriod={timePeriod}
      onTimePeriodChange={setTimePeriod}
      onRefresh={refetch}
    >
      <div className="space-y-6">
        {/* Current Value Display */}
        <div className="text-center p-6 bg-gradient-to-br from-orange-500/10 to-orange-600/5 rounded-lg border border-orange-500/20">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Target className="w-8 h-8 text-orange-400" />
            <span className="text-sm font-medium text-gray-400">Decentralization</span>
          </div>
          <div className="text-4xl font-bold text-white mb-2">
            {(getCurrentValue() * 100).toFixed(1)}%
          </div>
          <div className={`text-sm font-medium mb-2 ${decentralizationStatus.color}`}>
            {decentralizationStatus.level}
          </div>
          <div className={`text-xs font-medium ${getChange() >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {getChange() >= 0 ? '+' : ''}{getChange().toFixed(2)}% from previous period
          </div>
        </div>

        {/* Chart */}
        <div>
          <Chart
            data={data?.decentralizationCoefficient?.map(item => ({
              ...item,
              value: item.value * 100
            })) || []}
            type="spline"
            color="#F59E0B"
            height={300}
            formatTooltip={(point) => {
              const date = new Date(point.x).toLocaleDateString();
              return `<b>${date}</b><br/>Decentralization: <b>${point.y.toFixed(1)}%</b>`;
            }}
          />
        </div>
      </div>
    </Widget>
  );
};