

export interface Stream {
  id: string;
  songName: string;
  artist: string;
  dateStreamed: string;
  streamCount: number;
  userId: string;
}

export interface KeyMetric {
  totalUsers: number;
  activeUsers: number;
  totalStreams: number;
  revenue: number;
  topArtist: string;
}

export interface RevenueSource {
  name: string;
  value: number;
}

export interface TopSong {
  name: string;
  streams: number;
  artist: string;
}

export interface UserGrowthData {
  date: string;
  totalUsers: number;
  activeUsers: number;
}