import { CardanoMetrics, TimePeriod, ValidatorMetrics, GovernanceMetrics, DeFiMetrics, StablecoinData, DexData } from '@/types/cardano';
import { generateMockData } from '@/data/mockData';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.ultra-decentralised-money.com';

class CardanoApiService {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  private cache: Map<string, { data: any; timestamp: number; ttl: number }> = new Map();

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  private getCacheKey(endpoint: string, params?: Record<string, any>): string {
    const paramString = params ? JSON.stringify(params) : '';
    return `${endpoint}${paramString}`;
  }

  private getCachedData<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  private setCachedData<T>(key: string, data: T, ttl: number = 60000): void {
    this.cache.set(key, { data, timestamp: Date.now(), ttl });
  }

  private async fetchFromAPI<T>(endpoint: string, ttl: number = 60000): Promise<T> {
    const cacheKey = this.getCacheKey(endpoint);
    const cached = this.getCachedData<T>(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      this.setCachedData(cacheKey, data, ttl);
      return data;
    } catch (error) {
      console.warn(`API call failed for ${endpoint}, using mock data:`, error);
      // Fallback to mock data when API is not available
      throw error;
    }
  }

  async getCardanoMetrics(timePeriod: TimePeriod): Promise<CardanoMetrics> {
    try {
      // This will be replaced with actual API calls when backend is ready
      return await this.fetchFromAPI<CardanoMetrics>(`/metrics?period=${timePeriod}`);
    } catch (error) {
      // Return mock data for now
      console.log(`Using mock data for period: ${timePeriod}`);
      return generateMockData(timePeriod);
    }
  }

  async getValidatorMetrics(timePeriod: TimePeriod): Promise<ValidatorMetrics> {
    try {
      return await this.fetchFromAPI<ValidatorMetrics>(`/validators?period=${timePeriod}`);
    } catch (error) {
      return generateMockData(timePeriod).validators;
    }
  }

  async getGovernanceMetrics(timePeriod: TimePeriod): Promise<GovernanceMetrics> {
    try {
      return await this.fetchFromAPI<GovernanceMetrics>(`/governance?period=${timePeriod}`);
    } catch (error) {
      return generateMockData(timePeriod).governance;
    }
  }

  async getDeFiMetrics(timePeriod: TimePeriod): Promise<DeFiMetrics> {
    try {
      return await this.fetchFromAPI<DeFiMetrics>(`/defi?period=${timePeriod}`);
    } catch (error) {
      return generateMockData(timePeriod).defi;
    }
  }

  async getStablecoinData(timePeriod: TimePeriod): Promise<StablecoinData[]> {
    try {
      return await this.fetchFromAPI<StablecoinData[]>(`/stablecoins?period=${timePeriod}`);
    } catch (error) {
      return generateMockData(timePeriod).stablecoins;
    }
  }

  async getDexData(timePeriod: TimePeriod): Promise<DexData[]> {
    try {
      return await this.fetchFromAPI<DexData[]>(`/dexes?period=${timePeriod}`);
    } catch (error) {
      return generateMockData(timePeriod).dexes;
    }
  }

  clearCache(): void {
    this.cache.clear();
  }
}

export const cardanoApi = new CardanoApiService();