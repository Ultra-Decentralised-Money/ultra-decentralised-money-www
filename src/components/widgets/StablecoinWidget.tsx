'use client';

import { useState } from 'react';
import { Coins, TrendingUp, PieChart } from 'lucide-react';
import { Widget } from '@/components/ui/Widget';
import { Chart } from '@/components/ui/Chart';
import { useCardanoData } from '@/hooks/useCardanoData';
import { TimePeriod } from '@/types/cardano';
import { REFRESH_INTERVALS } from '@/constants/cardano';

export const StablecoinWidget = () => {
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

  const getStablecoinColors = () => [
    '#3B82F6', // Blue
    '#10B981', // Green  
    '#8B5CF6', // Purple
    '#F59E0B', // Orange
    '#EF4444', // Red
  ];

  return (
    <Widget
      title="Stablecoin Ecosystem"
      description="Circulating supply and market cap of Cardano stablecoins"
      loading={loading}
      error={error}
      timePeriod={timePeriod}
      onTimePeriodChange={setTimePeriod}
      onRefresh={refetch}
      className="col-span-12 lg:col-span-4"
    >
      <div className="space-y-6">
        {/* Total Supply */}
        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mb-1">
            <Coins className="w-4 h-4" />
            Total Supply
          </div>
          <div className="text-2xl font-bold text-white">
            ${getTotalSupply() >= 1e6 ? `${(getTotalSupply() / 1e6).toFixed(1)}M` : `${(getTotalSupply() / 1e3).toFixed(1)}K`}
          </div>
        </div>

        {/* Individual Stablecoins */}
        <div className="space-y-3">
          {data?.stablecoins?.map((coin, index) => {
            const currentSupply = coin.supply.length > 0 ? coin.supply[coin.supply.length - 1].value : 0;
            const previousSupply = coin.supply.length > 1 ? coin.supply[coin.supply.length - 2].value : currentSupply;
            const change = previousSupply !== 0 ? ((currentSupply - previousSupply) / previousSupply) * 100 : 0;
            const colors = getStablecoinColors();
            
            return (
              <div key={coin.symbol} className="flex items-center justify-between p-3 bg-gray-800/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  />
                  <div>
                    <div className="font-medium text-white text-sm">{coin.name}</div>
                    <div className="text-xs text-gray-400">{coin.symbol}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-medium text-white text-sm">
                    ${currentSupply >= 1e6 ? `${(currentSupply / 1e6).toFixed(1)}M` : `${(currentSupply / 1e3).toFixed(1)}K`}
                  </div>
                  <div className={`text-xs ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {change >= 0 ? '+' : ''}{change.toFixed(2)}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Supply Growth Chart */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Total Supply Growth
          </h4>
          <Chart
            data={data?.stablecoins?.[0]?.supply.map((_, index) => ({
              timestamp: data.stablecoins[0].supply[index].timestamp,
              value: data.stablecoins.reduce((total, coin) => total + (coin.supply[index]?.value || 0), 0)
            })) || []}
            type="area"
            color="#3B82F6"
            height={200}
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