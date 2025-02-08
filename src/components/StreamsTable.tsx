import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Input,
  Stack,
  Select,
  SkeletonText,
  Button,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useState, useMemo, useEffect, ChangeEvent } from "react";
import { getMockStreams, Stream } from "../services/mockData";

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50, 100];

const StreamsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Stream>("dateStreamed");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [streams, setStreams] = useState<Stream[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getMockStreams();
        setStreams(result);
      } catch (error) {
        console.error("Error fetching streams:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredAndSortedStreams = useMemo(() => {
    return streams
      .filter(
        (stream) =>
          stream.songName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          stream.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
          stream.userId.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        const modifier = sortDirection === "asc" ? 1 : -1;

        if (typeof aValue === "string" && typeof bValue === "string") {
          return aValue.localeCompare(bValue) * modifier;
        }
        if (typeof aValue === "number" && typeof bValue === "number") {
          return (aValue - bValue) * modifier;
        }
        return 0;
      });
  }, [streams, searchTerm, sortField, sortDirection]);

  // Calculate pagination values
  const totalItems = filteredAndSortedStreams.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = filteredAndSortedStreams.slice(startIndex, endIndex);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleSort = (field: keyof Stream) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const [field, direction] = e.target.value.split("-");
    setSortField(field as keyof Stream);
    setSortDirection(direction as "asc" | "desc");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return (
    <Box
      p={6}
      bg="white"
      borderRadius="lg"
      border="1px"
      borderColor="gray.200"
      shadow="sm"
    >
      <Text fontSize="lg" fontWeight="medium" mb={4}>
        Recent Streams
      </Text>

      <Stack spacing={4} mb={4}>
        <Stack direction={{ base: "column", md: "row" }} spacing={4}>
          <Input
            placeholder="Search by song, artist, or user ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            maxW={{ base: "100%", md: "400px" }}
            isDisabled={isLoading}
          />
          <Select
            value={`${sortField}-${sortDirection}`}
            onChange={handleSelectChange}
            maxW={{ base: "100%", md: "200px" }}
            isDisabled={isLoading}
          >
            <option value="dateStreamed-desc">Date (Newest)</option>
            <option value="dateStreamed-asc">Date (Oldest)</option>
            <option value="streamCount-desc">Streams (High to Low)</option>
            <option value="streamCount-asc">Streams (Low to High)</option>
            <option value="songName-asc">Song Name (A-Z)</option>
            <option value="songName-desc">Song Name (Z-A)</option>
            <option value="artist-asc">Artist (A-Z)</option>
            <option value="artist-desc">Artist (Z-A)</option>
          </Select>
        </Stack>

        {!isLoading && (
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={4}
            justify="space-between"
            align="center"
          >
            <HStack spacing={2} align="center">
              <Text fontSize="sm" whiteSpace="nowrap">
                Items per page:
              </Text>
              <Select
                value={itemsPerPage}
                onChange={(e) =>
                  handleItemsPerPageChange(Number(e.target.value))
                }
                width="auto"
                size="sm"
              >
                {ITEMS_PER_PAGE_OPTIONS.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </Select>
            </HStack>

            <HStack spacing={2} align="center">
              <Button
                size="sm"
                onClick={() => handlePageChange(1)}
                isDisabled={currentPage === 1}
              >
                First
              </Button>
              <Button
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                isDisabled={currentPage === 1}
              >
                Previous
              </Button>
              <HStack spacing={1} align="center">
                <NumberInput
                  size="sm"
                  min={1}
                  max={totalPages}
                  value={currentPage}
                  onChange={(_, value) => handlePageChange(value)}
                  maxW="16"
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Text fontSize="sm" whiteSpace="nowrap">
                  of {totalPages}
                </Text>
              </HStack>
              <Button
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                isDisabled={currentPage === totalPages}
              >
                Next
              </Button>
              <Button
                size="sm"
                onClick={() => handlePageChange(totalPages)}
                isDisabled={currentPage === totalPages}
              >
                Last
              </Button>
            </HStack>

            <Text fontSize="sm" whiteSpace="nowrap">
              Showing {startIndex + 1}-{endIndex} of {totalItems} items
            </Text>
          </Stack>
        )}
      </Stack>

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th
                cursor="pointer"
                onClick={() => handleSort("songName")}
                _hover={{ bg: "gray.50" }}
              >
                Song Name
                {sortField === "songName" && (
                  <Text as="span" ml={1}>
                    {sortDirection === "asc" ? "↑" : "↓"}
                  </Text>
                )}
              </Th>
              <Th
                cursor="pointer"
                onClick={() => handleSort("artist")}
                _hover={{ bg: "gray.50" }}
              >
                Artist
                {sortField === "artist" && (
                  <Text as="span" ml={1}>
                    {sortDirection === "asc" ? "↑" : "↓"}
                  </Text>
                )}
              </Th>
              <Th
                cursor="pointer"
                onClick={() => handleSort("dateStreamed")}
                _hover={{ bg: "gray.50" }}
              >
                Date Streamed
                {sortField === "dateStreamed" && (
                  <Text as="span" ml={1}>
                    {sortDirection === "asc" ? "↑" : "↓"}
                  </Text>
                )}
              </Th>
              <Th
                cursor="pointer"
                onClick={() => handleSort("streamCount")}
                _hover={{ bg: "gray.50" }}
              >
                Stream Count
                {sortField === "streamCount" && (
                  <Text as="span" ml={1}>
                    {sortDirection === "asc" ? "↑" : "↓"}
                  </Text>
                )}
              </Th>
              <Th>User ID</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading
              ? // Loading skeleton rows
                Array.from({ length: itemsPerPage }).map((_, index) => (
                  <Tr key={`skeleton-${index}`}>
                    <Td>
                      <SkeletonText noOfLines={1} speed={2} />
                    </Td>
                    <Td>
                      <SkeletonText noOfLines={1} speed={2} />
                    </Td>
                    <Td>
                      <SkeletonText noOfLines={1} speed={2} />
                    </Td>
                    <Td>
                      <SkeletonText noOfLines={1} speed={2} />
                    </Td>
                    <Td>
                      <SkeletonText noOfLines={1} speed={2} />
                    </Td>
                  </Tr>
                ))
              : currentItems.map((stream) => (
                  <Tr key={stream.id}>
                    <Td>{stream.songName}</Td>
                    <Td>{stream.artist}</Td>
                    <Td>
                      {new Date(stream.dateStreamed).toLocaleDateString()}
                    </Td>
                    <Td isNumeric>{stream.streamCount.toLocaleString()}</Td>
                    <Td>{stream.userId}</Td>
                  </Tr>
                ))}
          </Tbody>
        </Table>
      </TableContainer>

      {!isLoading && (
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify="space-between"
          align="center"
          mt={4}
        >
          <Text fontSize="sm">
            Showing {startIndex + 1}-{endIndex} of {totalItems} items
          </Text>
          <HStack spacing={2}>
            <Button
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              isDisabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              isDisabled={currentPage === totalPages}
            >
              Next
            </Button>
          </HStack>
        </Stack>
      )}
    </Box>
  );
};

export default StreamsTable;
