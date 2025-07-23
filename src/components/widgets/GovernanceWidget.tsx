'use client';

import { useState } from 'react';
import { Vote, FileText, Wallet, CheckCircle } from 'lucide-react';
import { Widget } from '@/components/ui/Widget';
import { MetricCard } from '@/components/ui/MetricCard';
import { Chart } from '@/components/ui/Chart';
import { useGovernanceData } from '@/hooks/useCardanoData';
import { TimePeriod } from '@/types/cardano';
import { REFRESH_INTERVALS } from '@/constants/cardano';

export const GovernanceWidget = () => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('day');
  const { data, loading, error, refetch } = useGovernanceData(
    timePeriod,
    REFRESH_INTERVALS.SLOW
  );

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const getCurrentValue = (metrics: any[]) => {
    return metrics && metrics.length > 0 ? metrics[metrics.length - 1].value : 0;
  };

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const getChange = (metrics: any[]) => {
    if (!metrics || metrics.length < 2) return 0;
    const current = metrics[metrics.length - 1].value;
    const previous = metrics[metrics.length - 2].value;
    return ((current - previous) / previous) * 100;
  };

  return (
    <Widget
      title="Governance Activity"
      description="Voting participation, proposals, and treasury status"
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
            title="Active Proposals"
            value={data ? getCurrentValue(data.activeProposals) : 0}
            change={{
              value: data ? getChange(data.activeProposals) : 0,
              period: '7d',
            }}
            icon={FileText}
            color="purple"
          />
          
          <MetricCard
            title="Voting Participation"
            value={data ? (getCurrentValue(data.votingParticipation) * 100).toFixed(1) : 0}
            suffix="%"
            change={{
              value: data ? getChange(data.votingParticipation) : 0,
              period: '7d',
            }}
            icon={Vote}
            color="blue"
          />
          
          <MetricCard
            title="Treasury Balance"
            value={data ? getCurrentValue(data.treasuryBalance) : 0}
            suffix=" ADA"
            change={{
              value: data ? getChange(data.treasuryBalance) : 0,
              period: '30d',
            }}
            icon={Wallet}
            color="green"
          />
          
          <MetricCard
            title="Proposals Passed"
            value={data ? getCurrentValue(data.proposalsPassed) : 0}
            change={{
              value: data ? getChange(data.proposalsPassed) : 0,
              period: '30d',
            }}
            icon={CheckCircle}
            color="orange"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Voting Participation</h4>
            <Chart
              data={data?.votingParticipation.map(item => ({
                ...item,
                value: item.value * 100
              })) || []}
              type="area"
              color="#8B5CF6"
              height={200}
              formatTooltip={(point) => {
                const date = new Date(point.x).toLocaleDateString();
                return `<b>${date}</b><br/>Participation: <b>${point.y.toFixed(1)}%</b>`;
              }}
            />
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Treasury Balance (ADA)</h4>
            <Chart
              data={data?.treasuryBalance || []}
              type="line"
              color="#10B981"
              height={200}
              formatTooltip={(point) => {
                const date = new Date(point.x).toLocaleDateString();
                const value = point.y >= 1e9 ? `${(point.y / 1e9).toFixed(2)}B` : `${(point.y / 1e6).toFixed(2)}M`;
                return `<b>${date}</b><br/>Treasury: <b>${value} ADA</b>`;
              }}
            />
          </div>
        </div>
      </div>
    </Widget>
  );
};