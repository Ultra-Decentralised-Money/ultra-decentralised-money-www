import { TimePeriod } from '@/types/cardano';

export const TIME_PERIODS: Record<TimePeriod, { label: string; days: number }> = {
  day: { label: '24H', days: 1 },
  week: { label: '7D', days: 7 },
  month: { label: '30D', days: 30 },
};

export const REFRESH_INTERVALS = {
  FAST: 30000, // 30 seconds
  MEDIUM: 60000, // 1 minute
  SLOW: 300000, // 5 minutes
};

export const CARDANO_COLORS = {
  primary: '#0033AD',
  secondary: '#1E40AF',
  accent: '#3B82F6',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  gradient: 'linear-gradient(135deg, #0033AD 0%, #3B82F6 100%)',
};

export const CHART_THEMES = {
  backgroundColor: 'transparent',
  textColor: '#E5E7EB',
  gridColor: '#374151',
  lineColor: CARDANO_COLORS.primary,
  areaColor: `${CARDANO_COLORS.primary}20`,
};

export const WIDGET_CONFIGS = {
  validators: {
    id: 'validators',
    title: 'Validator Network',
    description: 'Active validators and stake distribution',
    refreshInterval: REFRESH_INTERVALS.MEDIUM,
  },
  governance: {
    id: 'governance',
    title: 'Governance Activity', 
    description: 'Proposals, voting, and treasury metrics',
    refreshInterval: REFRESH_INTERVALS.SLOW,
  },
  defi: {
    id: 'defi',
    title: 'DeFi Overview',
    description: 'Total value locked and DEX activity',
    refreshInterval: REFRESH_INTERVALS.FAST,
  },
  stablecoins: {
    id: 'stablecoins',
    title: 'Stablecoin Supply',
    description: 'Circulating supply of major stablecoins',
    refreshInterval: REFRESH_INTERVALS.MEDIUM,
  },
};