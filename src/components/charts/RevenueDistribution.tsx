import { Box, Text, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { RevenueSource } from "../../services/mockData";
import { getRevenueDistribution } from "../../services/api";

const COLORS = ["#3182CE", "#38A169", "#805AD5", "#DD6B20"];

const RevenueDistribution = () => {
  const [data, setData] = useState<RevenueSource[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getRevenueDistribution();
        setData(result);
      } catch (error) {
        console.error("Error fetching revenue distribution:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatValue = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
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
          <Text color="gray.600">{formatValue(data.value)}</Text>
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
        Revenue Distribution
      </Text>
      <Skeleton isLoaded={!isLoading} height="90%" speed={2}>
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Skeleton>
    </Box>
  );
};

export default RevenueDistribution;
