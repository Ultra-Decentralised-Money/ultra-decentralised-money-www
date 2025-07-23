'use client';

import { useState } from 'react';
import { Vote } from 'lucide-react';
import { Widget } from '@/components/ui/Widget';
import { Chart } from '@/components/ui/Chart';
import { useGovernanceData } from '@/hooks/useCardanoData';
import { TimePeriod } from '@/types/cardano';
import { REFRESH_INTERVALS } from '@/constants/cardano';

export const VotingParticipationWidget = () => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('day');
  const { data, loading, error, refetch } = useGovernanceData(
    timePeriod,
    REFRESH_INTERVALS.SLOW
  );

  const getCurrentValue = () => {
    return data?.votingParticipation && data.votingParticipation.length > 0 
      ? data.votingParticipation[data.votingParticipation.length - 1].value 
      : 0;
  };

  const getChange = () => {
    if (!data?.votingParticipation || data.votingParticipation.length < 2) return 0;
    const current = data.votingParticipation[data.votingParticipation.length - 1].value;
    const previous = data.votingParticipation[data.votingParticipation.length - 2].value;
    return ((current - previous) / previous) * 100;
  };

  const getParticipationLevel = (value: number) => {
    if (value >= 0.8) return { level: 'Very High', color: 'text-green-400' };
    if (value >= 0.6) return { level: 'High', color: 'text-blue-400' };
    if (value >= 0.4) return { level: 'Moderate', color: 'text-yellow-400' };
    return { level: 'Low', color: 'text-red-400' };
  };

  const participationStatus = getParticipationLevel(getCurrentValue());

  return (
    <Widget
      title="Voting Participation"
      description="Percentage of eligible voters participating in governance"
      loading={loading}
      error={error}
      timePeriod={timePeriod}
      onTimePeriodChange={setTimePeriod}
      onRefresh={refetch}
    >
      <div className="space-y-6">
        {/* Current Value Display */}
        <div className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-lg border border-purple-500/20">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Vote className="w-8 h-8 text-purple-400" />
            <span className="text-sm font-medium text-gray-400">Participation Rate</span>
          </div>
          <div className="text-4xl font-bold text-white mb-2">
            {(getCurrentValue() * 100).toFixed(1)}%
          </div>
          <div className={`text-sm font-medium mb-2 ${participationStatus.color}`}>
            {participationStatus.level} Participation
          </div>
          <div className={`text-xs font-medium ${getChange() >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {getChange() >= 0 ? '+' : ''}{getChange().toFixed(2)}% from previous period
          </div>
        </div>

        {/* Chart */}
        <div>
          <Chart
            data={data?.votingParticipation?.map(item => ({
              ...item,
              value: item.value * 100
            })) || []}
            type="area"
            color="#8B5CF6"
            height={300}
            formatTooltip={(point) => {
              const date = new Date(point.x).toLocaleDateString();
              return `<b>${date}</b><br/>Participation: <b>${point.y.toFixed(1)}%</b>`;
            }}
          />
        </div>
      </div>
    </Widget>
  );
};