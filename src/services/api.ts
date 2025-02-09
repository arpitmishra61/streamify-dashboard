import { Stream, KeyMetric, RevenueSource, TopSong, UserGrowthData } from './apiTypes';
import { config } from '../config';

const API_BASE_URL = config.apiBaseUrl;

export const getStreams = async (): Promise<Stream[]> => {
  const response = await fetch(`${API_BASE_URL}/streams`);
  return response.json();
};

export const getKeyMetrics = async (): Promise<KeyMetric> => {
  const response = await fetch(`${API_BASE_URL}/keyMetrics`);
  return response.json();
};

export const getRevenueDistribution = async (): Promise<RevenueSource[]> => {
  const response = await fetch(`${API_BASE_URL}/revenueDistribution`);
  return response.json();
};

export const getTopSongs = async (): Promise<TopSong[]> => {
  const response = await fetch(`${API_BASE_URL}/topSongs`);
  return response.json();
};

export const getUserGrowthData = async (): Promise<UserGrowthData[]> => {
  const response = await fetch(`${API_BASE_URL}/userGrowth`);
  return response.json();
}; 