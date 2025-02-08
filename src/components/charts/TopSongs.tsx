import { Box, Text, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TopSong } from "../../services/mockData";
import { getTopSongs } from "../../services/api";

const TopSongs = () => {
  const [data, setData] = useState<TopSong[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getTopSongs();
        setData(result);
      } catch (error) {
        console.error("Error fetching top songs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatStreams = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Box
          bg="white"
          p={2}
          border="1px"
          borderColor="gray.200"
          borderRadius="md"
          shadow="sm"
        >
          <Text fontWeight="medium">{data.name}</Text>
          <Text color="gray.600">{data.artist}</Text>
          <Text color="gray.600">{formatStreams(data.streams)} streams</Text>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box
      p={6}
      bg="white"
      borderRadius="lg"
      border="1px"
      borderColor="gray.200"
      shadow="sm"
      height="400px"
    >
      <Text fontSize="lg" fontWeight="medium" mb={4}>
        Top Streamed Songs
      </Text>
      <Skeleton data-testid="skeleton" isLoaded={!isLoading} height="90%" speed={2}>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" tickFormatter={formatStreams} />
            <YAxis
              type="category"
              dataKey="name"
              width={90}
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="streams" fill="#3182CE" barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </Skeleton>
    </Box>
  );
};

export default TopSongs;
