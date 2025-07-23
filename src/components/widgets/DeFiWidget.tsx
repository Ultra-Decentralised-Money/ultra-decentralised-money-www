'use client';

import { useState } from 'react';
import { DollarSign, BarChart3, Coins, Layers } from 'lucide-react';
import { Widget } from '@/components/ui/Widget';
import { MetricCard } from '@/components/ui/MetricCard';
import { Chart } from '@/components/ui/Chart';
import { useDeFiData } from '@/hooks/useCardanoData';
import { TimePeriod } from '@/types/cardano';
import { REFRESH_INTERVALS } from '@/constants/cardano';

export const DeFiWidget = () => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('day');
  const { data, loading, error, refetch } = useDeFiData(
    timePeriod,
    REFRESH_INTERVALS.FAST
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
      title="DeFi Overview"
      description="Total value locked, DEX activity, and ecosystem growth"
      loading={loading}
      error={error}
      timePeriod={timePeriod}
      onTimePeriodChange={setTimePeriod}
      onRefresh={refetch}
      className="col-span-12 lg:col-span-8"
    >
      <div className="space-y-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Value Locked"
            value={data ? getCurrentValue(data.totalValueLocked) : 0}
            prefix="$"
            change={{
              value: data ? getChange(data.totalValueLocked) : 0,
              period: '24h',
            }}
            icon={DollarSign}
            color="green"
          />
          
          <MetricCard
            title="DEX Volume (24h)"
            value={data ? getCurrentValue(data.dexVolume) : 0}
            prefix="$"
            change={{
              value: data ? getChange(data.dexVolume) : 0,
              period: '24h',
            }}
            icon={BarChart3}
            color="blue"
          />
          
          <MetricCard
            title="Stablecoin Supply"
            value={data ? getCurrentValue(data.stablecoinSupply) : 0}
            prefix="$"
            change={{
              value: data ? getChange(data.stablecoinSupply) : 0,
              period: '7d',
            }}
            icon={Coins}
            color="purple"
          />
          
          <MetricCard
            title="Liquidity Pools"
            value={data ? getCurrentValue(data.liquidityPools) : 0}
            change={{
              value: data ? getChange(data.liquidityPools) : 0,
              period: '7d',
            }}
            icon={Layers}
            color="orange"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Total Value Locked</h4>
            <Chart
              data={data?.totalValueLocked || []}
              type="area"
              color="#10B981"
              height={250}
              formatTooltip={(point) => {
                const date = new Date(point.x).toLocaleDateString();
                const value = point.y >= 1e9 ? `$${(point.y / 1e9).toFixed(2)}B` : `$${(point.y / 1e6).toFixed(2)}M`;
                return `<b>${date}</b><br/>TVL: <b>${value}</b>`;
              }}
            />
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">DEX Volume (24h)</h4>
            <Chart
              data={data?.dexVolume || []}
              type="column"
              color="#3B82F6"
              height={250}
              formatTooltip={(point) => {
                const date = new Date(point.x).toLocaleDateString();
                const value = point.y >= 1e6 ? `$${(point.y / 1e6).toFixed(2)}M` : `$${(point.y / 1e3).toFixed(2)}K`;
                return `<b>${date}</b><br/>Volume: <b>${value}</b>`;
              }}
            />
          </div>
        </div>

        {/* Stablecoin Supply Chart */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-3">Stablecoin Supply Growth</h4>
          <Chart
            data={data?.stablecoinSupply || []}
            type="spline"
            color="#8B5CF6"
            height={200}
            formatTooltip={(point) => {
              const date = new Date(point.x).toLocaleDateString();
              const value = point.y >= 1e9 ? `$${(point.y / 1e9).toFixed(2)}B` : `$${(point.y / 1e6).toFixed(2)}M`;
              return `<b>${date}</b><br/>Supply: <b>${value}</b>`;
            }}
          />
        </div>
      </div>
    </Widget>
  );
};