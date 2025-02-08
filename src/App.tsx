import {
  ChakraProvider,
  Box,
  Grid,
  GridItem,
  Spinner,
  Center,
  Button,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { Suspense, lazy } from "react";
import { KeyMetrics } from "./components/KeyMetrics";
import { FiDownload } from "react-icons/fi";
import { downloadDashboard } from "./utils/downloadDashboard";
import LazyLoadWrapper from './components/LazyLoadWrapper';

// Lazy load components
const UserGrowthChart = lazy(
  () => import("./components/charts/UserGrowthChart")
);
const RevenueDistribution = lazy(
  () => import("./components/charts/RevenueDistribution")
);
const TopSongs = lazy(() => import("./components/charts/TopSongs"));
const StreamsTable = lazy(() => import("./components/StreamsTable"));

// Loading fallback component
const LoadingFallback = () => (
  <Center p={4}>
    <Spinner size="xl" />
  </Center>
);

function App() {
  const handleDownload = async () => {
    await downloadDashboard();
  };

  return (
    <ChakraProvider>
      <Box p={6} bg="gray.50" minH="100vh">
        <HStack justify="flex-end" mb={4}>
          <Button
            leftIcon={<Icon as={FiDownload} />}
            colorScheme="blue"
            onClick={handleDownload}
            size="sm"
          >
            Download PDF
          </Button>
        </HStack>

        <Box id="dashboard-content">
          <Grid templateColumns="repeat(12, 1fr)" gap={6}>
            {/* Key Metrics Section */}
            <GridItem colSpan={{ base: 12, lg: 12 }}>
              <KeyMetrics />
            </GridItem>

            {/* Charts Section */}
            <GridItem colSpan={{ base: 12, lg: 8 }}>
              <Suspense fallback={<LoadingFallback />}>
                <UserGrowthChart />
              </Suspense>
            </GridItem>

            <GridItem colSpan={{ base: 12, lg: 4 }}>
              <Suspense fallback={<LoadingFallback />}>
                <RevenueDistribution />
              </Suspense>
            </GridItem>

            <GridItem colSpan={{ base: 12, lg: 6 }}>
              <Suspense fallback={<LoadingFallback />}>
                <TopSongs />
              </Suspense>
            </GridItem>

            {/* Data Table Section */}
            <GridItem colSpan={12}>
              <LazyLoadWrapper height="600px">
                <Suspense fallback={<LoadingFallback />}>
                  <StreamsTable />
                </Suspense>
              </LazyLoadWrapper>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
