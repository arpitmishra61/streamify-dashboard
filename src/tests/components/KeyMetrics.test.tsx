import { render, screen, waitFor } from '../test-utils';
import { KeyMetrics } from '../../components/KeyMetrics';
import * as api from '../../services/api';

// Mock the API module
jest.mock('../../services/api');

describe('KeyMetrics', () => {
    const mockMetrics = {
        totalUsers: 1250000,
        activeUsers: 850000,
        totalStreams: 25000000,
        revenue: 4750000,
        topArtist: 'Luna Eclipse'
    };

    beforeEach(() => {
        jest.resetAllMocks();
        (api.getKeyMetrics as jest.Mock).mockResolvedValue(mockMetrics);
    });

    it('renders loading state initially', () => {
        render(<KeyMetrics />);
        const skeletons = screen.getAllByTestId('skeleton');
        expect(skeletons.length).toBeGreaterThan(0);
    });

    it('displays metrics after loading', async () => {
        render(<KeyMetrics />);

        await waitFor(() => {
            expect(screen.getByText('1.3M')).toBeInTheDocument();
            expect(screen.getByText('850.0K')).toBeInTheDocument();
            expect(screen.getByText('25.0M')).toBeInTheDocument();
            expect(screen.getByText('$4,750,000')).toBeInTheDocument();
            expect(screen.getByText('Luna Eclipse')).toBeInTheDocument();
        });
    });

    it('handles API error gracefully', async () => {
        (api.getKeyMetrics as jest.Mock).mockRejectedValue(new Error('API Error'));
        render(<KeyMetrics />);

        await waitFor(() => {
            expect(screen.getAllByText('0')).toHaveLength(3);
            expect(screen.getByText('$0')).toBeInTheDocument();
            expect(screen.getByText('Loading...')).toBeInTheDocument();
        });
    });

    it('displays correct labels and help text', () => {
        render(<KeyMetrics />);

        expect(screen.getByText('Total Users')).toBeInTheDocument();
        expect(screen.getByText('Active Users')).toBeInTheDocument();
        expect(screen.getByText('Total Streams')).toBeInTheDocument();
        expect(screen.getByText('Revenue')).toBeInTheDocument();
        expect(screen.getByText('Top Artist')).toBeInTheDocument();

        expect(screen.getByText('Registered Users')).toBeInTheDocument();
        expect(screen.getByText('Last 30 Days')).toBeInTheDocument();
        expect(screen.getByText('All Time')).toBeInTheDocument();
        expect(screen.getByText('Total Revenue')).toBeInTheDocument();
        expect(screen.getByText('Most Streamed')).toBeInTheDocument();
    });
}); 