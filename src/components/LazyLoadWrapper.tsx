import { useEffect, useRef, useState } from 'react';
import { Box, Skeleton } from '@chakra-ui/react';

interface LazyLoadWrapperProps {
    children: React.ReactNode;
    height?: string;
}

const LazyLoadWrapper = ({ children, height = '400px' }: LazyLoadWrapperProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Load the component after it becomes visible
                    setTimeout(() => setIsLoaded(true), 100);
                    // Cleanup observer after detection
                    if (containerRef.current) {
                        observer.unobserve(containerRef.current);
                    }
                }
            },
            {
                threshold: 0.01, // Trigger when even 1% is visible
                rootMargin: '100px' // Start loading 100px before it comes into view
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    return (
        <Box ref={containerRef} minH={height}>
            {isVisible ? (
                isLoaded ? (
                    children
                ) : (
                    <Skeleton height={height} width="100%" data-testid="skeleton" />
                )
            ) : (
                <Skeleton height={height} width="100%" data-testid="skeleton" />
            )}
        </Box>
    );
};

export default LazyLoadWrapper; 