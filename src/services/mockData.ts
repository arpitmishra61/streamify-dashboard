import { subDays, format } from "date-fns";

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

// Helper function to simulate API delay
const simulateApiCall = <T>(data: T): Promise<T> => {
  const delay = Math.random() * 3000 + 500; // Random delay between 500-1500ms
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

// Generate mock streams data
const generateMockStreams = (): Stream[] => {
  const streams: Stream[] = [];
  const songs = [
    { name: "Midnight Dreams", artist: "Luna Eclipse" },
    { name: "Dancing in the Rain", artist: "The Storms" },
    { name: "Electric Heart", artist: "Neon Pulse" },
    { name: "Mountain High", artist: "The Climbers" },
    { name: "Ocean Waves", artist: "Coastal Vibes" },
  ];

  for (let i = 0; i < 100; i++) {
    const songIndex = Math.floor(Math.random() * songs.length);
    streams.push({
      id: `stream-${i}`,
      songName: songs[songIndex].name,
      artist: songs[songIndex].artist,
      dateStreamed: format(
        subDays(new Date(), Math.floor(Math.random() * 30)),
        "yyyy-MM-dd"
      ),
      streamCount: Math.floor(Math.random() * 1000) + 100,
      userId: `user-${Math.floor(Math.random() * 1000)}`,
    });
  }

  return streams;
};

// Generate mock key metrics
const generateMockKeyMetrics = (): KeyMetric => ({
  totalUsers: 1250000,
  activeUsers: 850000,
  totalStreams: 25000000,
  revenue: 4750000,
  topArtist: "Luna Eclipse",
});

// Generate mock revenue distribution
const generateMockRevenueDistribution = (): RevenueSource[] => [
  { name: "Premium Subscriptions", value: 3800000 },
  { name: "Ad Revenue", value: 750000 },
  { name: "Merchandise", value: 150000 },
  { name: "Other", value: 50000 },
];

// Generate mock top songs
const generateMockTopSongs = (): TopSong[] => [
  { name: "Midnight Dreams", streams: 1500000, artist: "Luna Eclipse" },
  { name: "Dancing in the Rain", streams: 1200000, artist: "The Storms" },
  { name: "Electric Heart", streams: 900000, artist: "Neon Pulse" },
  { name: "Mountain High", streams: 750000, artist: "The Climbers" },
  { name: "Ocean Waves", streams: 600000, artist: "Coastal Vibes" },
];

// Generate mock user growth data
const generateMockUserGrowthData = (): UserGrowthData[] => {
  const data: UserGrowthData[] = [];
  let totalUsers = 800000;
  let activeUsers = 500000;

  for (let i = 11; i >= 0; i--) {
    totalUsers += Math.floor(Math.random() * 50000);
    activeUsers += Math.floor(Math.random() * 30000);

    data.push({
      date: format(subDays(new Date(), i * 30), "MMM yyyy"),
      totalUsers,
      activeUsers,
    });
  }

  return data;
};

// API functions that return promises
export const getMockStreams = (): Promise<Stream[]> =>
  simulateApiCall(generateMockStreams());

export const getMockKeyMetrics = (): Promise<KeyMetric> =>
  simulateApiCall(generateMockKeyMetrics());

export const getMockRevenueDistribution = (): Promise<RevenueSource[]> =>
  simulateApiCall(generateMockRevenueDistribution());

export const getMockTopSongs = (): Promise<TopSong[]> =>
  simulateApiCall(generateMockTopSongs());

export const getMockUserGrowthData = (): Promise<UserGrowthData[]> =>
  simulateApiCall(generateMockUserGrowthData());
