'use client';

import { useState } from 'react';
import { Shield, Users, TrendingUp, Target } from 'lucide-react';
import { Widget } from '@/components/ui/Widget';
import { MetricCard } from '@/components/ui/MetricCard';
import { Chart } from '@/components/ui/Chart';
import { useValidatorData } from '@/hooks/useCardanoData';
import { TimePeriod } from '@/types/cardano';
import { REFRESH_INTERVALS } from '@/constants/cardano';

export const ValidatorWidget = () => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('day');
  const { data, loading, error, refetch } = useValidatorData(
    timePeriod,
    REFRESH_INTERVALS.MEDIUM
  );

  const getCurrentValue = (metrics: any[]) => {
    return metrics && metrics.length > 0 ? metrics[metrics.length - 1].value : 0;
  };

  const getChange = (metrics: any[]) => {
    if (!metrics || metrics.length < 2) return 0;
    const current = metrics[metrics.length - 1].value;
    const previous = metrics[metrics.length - 2].value;
    return ((current - previous) / previous) * 100;
  };

  return (
    <Widget
      title="Validator Network"
      description="Active stake pool operators and network decentralization"
      loading={loading}
      error={error}
      timePeriod={timePeriod}
      onTimePeriodChange={setTimePeriod}
      onRefresh={refetch}
      className="col-span-12 lg:col-span-6"
    >
      <div className="space-y-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Active Validators"
            value={data ? getCurrentValue(data.activeValidators) : 0}
            change={{
              value: data ? getChange(data.activeValidators) : 0,
              period: '24h',
            }}
            icon={Users}
            color="blue"
          />
          
          <MetricCard
            title="Total Stake"
            value={data ? getCurrentValue(data.totalStake) : 0}
            suffix=" ADA"
            change={{
              value: data ? getChange(data.totalStake) : 0,
              period: '24h',
            }}
            icon={Shield}
            color="green"
          />
          
          <MetricCard
            title="Avg Rewards"
            value={data ? getCurrentValue(data.averageRewards) : 0}
            suffix="%"
            change={{
              value: data ? getChange(data.averageRewards) : 0,
              period: '24h',
            }}
            icon={TrendingUp}
            color="purple"
          />
          
          <MetricCard
            title="Decentralization"
            value={data ? (getCurrentValue(data.decentralizationCoefficient) * 100).toFixed(1) : 0}
            suffix="%"
            change={{
              value: data ? getChange(data.decentralizationCoefficient) : 0,
              period: '24h',
            }}
            icon={Target}
            color="orange"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Active Validators</h4>
            <Chart
              data={data?.activeValidators || []}
              type="line"
              color="#3B82F6"
              height={200}
              formatTooltip={(point) => {
                const date = new Date(point.x).toLocaleDateString();
                return `<b>${date}</b><br/>Active Validators: <b>${point.y.toLocaleString()}</b>`;
              }}
            />
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Total Stake (ADA)</h4>
            <Chart
              data={data?.totalStake || []}
              type="area"
              color="#10B981"
              height={200}
              formatTooltip={(point) => {
                const date = new Date(point.x).toLocaleDateString();
                const value = point.y >= 1e9 ? `${(point.y / 1e9).toFixed(2)}B` : `${(point.y / 1e6).toFixed(2)}M`;
                return `<b>${date}</b><br/>Total Stake: <b>${value} ADA</b>`;
              }}
            />
          </div>
        </div>
      </div>
    </Widget>
  );
};