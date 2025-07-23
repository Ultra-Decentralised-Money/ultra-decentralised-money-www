import { CardanoMetrics, BaseMetric, TimePeriod } from '@/types/cardano';

const generateTimeSeriesData = (
  days: number,
  baseValue: number,
  volatility: number = 0.1
): BaseMetric[] => {
  const data: BaseMetric[] = [];
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;
  
  for (let i = days; i >= 0; i--) {
    const timestamp = now - (i * dayMs);
    const randomFactor = 1 + (Math.random() - 0.5) * volatility;
    const trendFactor = 1 + (days - i) * 0.001; // Slight upward trend
    const value = baseValue * randomFactor * trendFactor;
    
    data.push({ timestamp, value });
  }
  
  return data;
};

export const generateMockData = (timePeriod: TimePeriod): CardanoMetrics => {
  const days = timePeriod === 'day' ? 1 : timePeriod === 'week' ? 7 : 30;
  
  return {
    validators: {
      activeValidators: generateTimeSeriesData(days, 3200, 0.05),
      totalStake: generateTimeSeriesData(days, 25_000_000_000, 0.02),
      averageRewards: generateTimeSeriesData(days, 4.5, 0.1),
      decentralizationCoefficient: generateTimeSeriesData(days, 0.72, 0.05),
    },
    governance: {
      activeProposals: generateTimeSeriesData(days, 15, 0.3),
      votingParticipation: generateTimeSeriesData(days, 0.68, 0.1),
      treasuryBalance: generateTimeSeriesData(days, 1_200_000_000, 0.02),
      proposalsPassed: generateTimeSeriesData(days, 8, 0.4),
    },
    defi: {
      totalValueLocked: generateTimeSeriesData(days, 450_000_000, 0.15),
      dexVolume: generateTimeSeriesData(days, 25_000_000, 0.3),
      stablecoinSupply: generateTimeSeriesData(days, 180_000_000, 0.08),
      liquidityPools: generateTimeSeriesData(days, 1250, 0.1),
    },
    stablecoins: [
      {
        name: 'DJED',
        symbol: 'DJED',
        supply: generateTimeSeriesData(days, 45_000_000, 0.12),
        marketCap: generateTimeSeriesData(days, 45_000_000, 0.12),
      },
      {
        name: 'iUSD',
        symbol: 'iUSD',
        supply: generateTimeSeriesData(days, 25_000_000, 0.15),
        marketCap: generateTimeSeriesData(days, 25_000_000, 0.15),
      },
      {
        name: 'USDC',
        symbol: 'USDC',
        supply: generateTimeSeriesData(days, 110_000_000, 0.08),
        marketCap: generateTimeSeriesData(days, 110_000_000, 0.08),
      },
    ],
    dexes: [
      {
        name: 'Minswap',
        tvl: generateTimeSeriesData(days, 180_000_000, 0.18),
        volume24h: generateTimeSeriesData(days, 8_500_000, 0.35),
        fees24h: generateTimeSeriesData(days, 25_000, 0.4),
      },
      {
        name: 'SundaeSwap',
        tvl: generateTimeSeriesData(days, 95_000_000, 0.2),
        volume24h: generateTimeSeriesData(days, 4_200_000, 0.4),
        fees24h: generateTimeSeriesData(days, 12_000, 0.45),
      },
      {
        name: 'WingRiders',
        tvl: generateTimeSeriesData(days, 75_000_000, 0.22),
        volume24h: generateTimeSeriesData(days, 3_800_000, 0.38),
        fees24h: generateTimeSeriesData(days, 11_000, 0.42),
      },
      {
        name: 'MuesliSwap',
        tvl: generateTimeSeriesData(days, 45_000_000, 0.25),
        volume24h: generateTimeSeriesData(days, 2_100_000, 0.45),
        fees24h: generateTimeSeriesData(days, 6_500, 0.5),
      },
    ],
  };
};