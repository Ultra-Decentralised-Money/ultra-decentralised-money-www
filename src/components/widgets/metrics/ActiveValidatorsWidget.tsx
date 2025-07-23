'use client';

import { useState } from 'react';
import { Users } from 'lucide-react';
import { Widget } from '@/components/ui/Widget';
import { Chart } from '@/components/ui/Chart';
import { useValidatorData } from '@/hooks/useCardanoData';
import { TimePeriod } from '@/types/cardano';
import { REFRESH_INTERVALS } from '@/constants/cardano';

export const ActiveValidatorsWidget = () => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('day');
  const { data, loading, error, refetch } = useValidatorData(
    timePeriod,
    REFRESH_INTERVALS.MEDIUM
  );

  const getCurrentValue = () => {
    return data?.activeValidators && data.activeValidators.length > 0 
      ? data.activeValidators[data.activeValidators.length - 1].value 
      : 0;
  };

  const getChange = () => {
    if (!data?.activeValidators || data.activeValidators.length < 2) return 0;
    const current = data.activeValidators[data.activeValidators.length - 1].value;
    const previous = data.activeValidators[data.activeValidators.length - 2].value;
    return ((current - previous) / previous) * 100;
  };

  return (
    <Widget
      title="Active Validators"
      description="Total number of active stake pool operators securing the network"
      loading={loading}
      error={error}
      timePeriod={timePeriod}
      onTimePeriodChange={setTimePeriod}
      onRefresh={refetch}
    >
      <div className="space-y-6">
        {/* Current Value Display */}
        <div className="text-center p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-lg border border-blue-500/20">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Users className="w-8 h-8 text-blue-400" />
            <span className="text-sm font-medium text-gray-400">Active Validators</span>
          </div>
          <div className="text-4xl font-bold text-white mb-2">
            {getCurrentValue().toLocaleString()}
          </div>
          <div className={`text-sm font-medium ${getChange() >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {getChange() >= 0 ? '+' : ''}{getChange().toFixed(2)}% from previous period
          </div>
        </div>

        {/* Chart */}
        <div>
          <Chart
            data={data?.activeValidators || []}
            type="line"
            color="#3B82F6"
            height={300}
            formatTooltip={(point) => {
              const date = new Date(point.x).toLocaleDateString();
              return `<b>${date}</b><br/>Active Validators: <b>${point.y.toLocaleString()}</b>`;
            }}
          />
        </div>
      </div>
    </Widget>
  );
};