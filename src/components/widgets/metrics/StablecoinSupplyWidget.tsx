'use client';

import { useState } from 'react';
import { Coins } from 'lucide-react';
import { Widget } from '@/components/ui/Widget';
import { Chart } from '@/components/ui/Chart';
import { useCardanoData } from '@/hooks/useCardanoData';
import { TimePeriod } from '@/types/cardano';
import { REFRESH_INTERVALS } from '@/constants/cardano';

export const StablecoinSupplyWidget = () => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('day');
  const { data, loading, error, refetch } = useCardanoData(
    timePeriod,
    REFRESH_INTERVALS.MEDIUM
  );

  const getTotalSupply = () => {
    if (!data?.stablecoins) return 0;
    return data.stablecoins.reduce((total, coin) => {
      const currentSupply = coin.supply.length > 0 ? coin.supply[coin.supply.length - 1].value : 0;
      return total + currentSupply;
    }, 0);
  };

  const getTotalSupplyTimeSeries = () => {
    if (!data?.stablecoins || data.stablecoins.length === 0) return [];
    
    return data.stablecoins[0].supply.map((_, index) => ({
      timestamp: data.stablecoins[0].supply[index].timestamp,
      value: data.stablecoins.reduce((total, coin) => total + (coin.supply[index]?.value || 0), 0)
    }));
  };

  const getChange = () => {
    const timeSeries = getTotalSupplyTimeSeries();
    if (timeSeries.length < 2) return 0;
    const current = timeSeries[timeSeries.length - 1].value;
    const previous = timeSeries[timeSeries.length - 2].value;
    return ((current - previous) / previous) * 100;
  };

  const formatValue = (value: number) => {
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K`;
    return value.toLocaleString();
  };

  const getStablecoinColors = () => ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'];

  return (
    <Widget
      title="Stablecoin Supply"
      description="Total circulating supply of stablecoins on Cardano"
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
            <Coins className="w-8 h-8 text-blue-400" />
            <span className="text-sm font-medium text-gray-400">Total Supply</span>
          </div>
          <div className="text-4xl font-bold text-white mb-2">
            ${formatValue(getTotalSupply())}
          </div>
          <div className={`text-sm font-medium ${getChange() >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {getChange() >= 0 ? '+' : ''}{getChange().toFixed(2)}% from previous period
          </div>
        </div>

        {/* Individual Stablecoins */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data?.stablecoins?.map((coin, index) => {
            const currentSupply = coin.supply.length > 0 ? coin.supply[coin.supply.length - 1].value : 0;
            const colors = getStablecoinColors();
            
            return (
              <div key={coin.symbol} className="p-4 bg-gray-800/30 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  />
                  <div>
                    <div className="font-medium text-white text-sm">{coin.name}</div>
                    <div className="text-xs text-gray-400">{coin.symbol}</div>
                  </div>
                </div>
                <div className="text-lg font-bold text-white">
                  ${formatValue(currentSupply)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Chart */}
        <div>
          <Chart
            data={getTotalSupplyTimeSeries()}
            type="area"
            color="#3B82F6"
            height={300}
            formatTooltip={(point) => {
              const date = new Date(point.x).toLocaleDateString();
              const value = point.y >= 1e6 ? `$${(point.y / 1e6).toFixed(2)}M` : `$${(point.y / 1e3).toFixed(2)}K`;
              return `<b>${date}</b><br/>Total Supply: <b>${value}</b>`;
            }}
          />
        </div>
      </div>
    </Widget>
  );
};