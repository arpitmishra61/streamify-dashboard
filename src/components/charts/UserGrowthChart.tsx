import { Box, Text, useColorMode, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { UserGrowthData } from "../../services/mockData";
import { getUserGrowthData } from "../../services/api";

const UserGrowthChart = () => {
  const [data, setData] = useState<UserGrowthData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "#1A202C" : "#FFFFFF";
  const gridColor = colorMode === "light" ? "#E2E8F0" : "#2D3748";
  const bgColor = colorMode === "light" ? "white" : "gray.700";
  const borderColor = colorMode === "light" ? "gray.200" : "gray.600";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getUserGrowthData();
        setData(result);
      } catch (error) {
        console.error("Error fetching user growth data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatYAxis = (value: number): string => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  return (
    <Box
      p={6}
      bg={bgColor}
      borderRadius="lg"
      border="1px"
      borderColor={borderColor}
      shadow="sm"
      height="400px"
    >
      <Text fontSize="lg" fontWeight="medium" mb={4}>
        User Growth Trends
      </Text>
      <Skeleton isLoaded={!isLoading} height="90%" speed={2}>
        <ResponsiveContainer width="100%" height="90%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis
              dataKey="date"
              stroke={textColor}
              tick={{ fill: textColor }}
            />
            <YAxis
              stroke={textColor}
              tick={{ fill: textColor }}
              tickFormatter={formatYAxis}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: colorMode === "light" ? "#FFFFFF" : "#2D3748",
                borderColor: colorMode === "light" ? "#E2E8F0" : "#4A5568",
                color: textColor,
              }}
              formatter={(value: number) => [formatYAxis(value), "Users"]}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="totalUsers"
              name="Total Users"
              stroke="#3182CE"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="activeUsers"
              name="Active Users"
              stroke="#38A169"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Skeleton>
    </Box>
  );
};

export default UserGrowthChart;
