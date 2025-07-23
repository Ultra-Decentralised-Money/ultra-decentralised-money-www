export type TimePeriod = 'day' | 'week' | 'month';

export interface BaseMetric {
  timestamp: number;
  value: number;
}

export interface ValidatorMetrics {
  activeValidators: BaseMetric[];
  totalStake: BaseMetric[];
  averageRewards: BaseMetric[];
  decentralizationCoefficient: BaseMetric[];
}

export interface GovernanceMetrics {
  activeProposals: BaseMetric[];
  votingParticipation: BaseMetric[];
  treasuryBalance: BaseMetric[];
  proposalsPassed: BaseMetric[];
}

export interface DeFiMetrics {
  totalValueLocked: BaseMetric[];
  dexVolume: BaseMetric[];
  stablecoinSupply: BaseMetric[];
  liquidityPools: BaseMetric[];
}

export interface StablecoinData {
  name: string;
  symbol: string;
  supply: BaseMetric[];
  marketCap: BaseMetric[];
}

export interface DexData {
  name: string;
  tvl: BaseMetric[];
  volume24h: BaseMetric[];
  fees24h: BaseMetric[];
}

export interface CardanoMetrics {
  validators: ValidatorMetrics;
  governance: GovernanceMetrics;
  defi: DeFiMetrics;
  stablecoins: StablecoinData[];
  dexes: DexData[];
}

export interface WidgetConfig {
  id: string;
  title: string;
  description?: string;
  timePeriod: TimePeriod;
  refreshInterval?: number;
}