import { Center, Spinner, Text, VStack } from "@chakra-ui/react";

const AppLoader = () => {
  return (
    <Center minH="100vh" bg="gray.50">
      <VStack spacing={4}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        <Text fontSize="lg" color="gray.600">
          Loading Streamify...
        </Text>
      </VStack>
    </Center>
  );
};

export default AppLoader;
