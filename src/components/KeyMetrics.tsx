import {
  Box,
  SimpleGrid,
  Text,
  Stack,
  useColorMode,
  Skeleton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { KeyMetric } from "../services/apiTypes";
import { getKeyMetrics } from "../services/api";

export const KeyMetrics = () => {
  const [metrics, setMetrics] = useState<KeyMetric | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { colorMode } = useColorMode();
  const bgColor = colorMode === "light" ? "white" : "gray.700";
  const borderColor = colorMode === "light" ? "gray.200" : "gray.600";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getKeyMetrics();
        setMetrics(data);
      } catch (error) {
        console.error("Error fetching metrics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatRevenue = (num: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const StatBox = ({
    label,
    value,
    helpText,
    isLoading,
  }: {
    label: string;
    value: string;
    helpText: string;
    isLoading: boolean;
  }) => (
    <Box
      p={5}
      bg={bgColor}
      borderRadius="lg"
      border="1px"
      borderColor={borderColor}
      shadow="sm"
    >
      <Stack spacing={1}>
        <Text fontSize="sm" color="gray.500">
          {label}
        </Text>
        <Skeleton data-testid="skeleton" isLoaded={!isLoading} speed={2}>
          <Text fontSize="2xl" fontWeight="bold">
            {value}
          </Text>
        </Skeleton>
        <Text fontSize="sm" color="gray.500">
          {helpText}
        </Text>
      </Stack>
    </Box>
  );

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 5 }} gap={4}>
      <StatBox
        label="Total Users"
        value={metrics ? formatNumber(metrics.totalUsers) : "0"}
        helpText="Registered Users"
        isLoading={isLoading}
      />
      <StatBox
        label="Active Users"
        value={metrics ? formatNumber(metrics.activeUsers) : "0"}
        helpText="Last 30 Days"
        isLoading={isLoading}
      />
      <StatBox
        label="Total Streams"
        value={metrics ? formatNumber(metrics.totalStreams) : "0"}
        helpText="All Time"
        isLoading={isLoading}
      />
      <StatBox
        label="Revenue"
        value={metrics ? formatRevenue(metrics.revenue) : "$0"}
        helpText="Total Revenue"
        isLoading={isLoading}
      />
      <StatBox
        label="Top Artist"
        value={metrics?.topArtist || "Loading..."}
        helpText="Most Streamed"
        isLoading={isLoading}
      />
    </SimpleGrid>
  );
};
