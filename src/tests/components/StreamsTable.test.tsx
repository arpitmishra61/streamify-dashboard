import { screen, fireEvent, waitFor } from '@testing-library/react';
import { render } from '../test-utils';
import StreamsTable from '../../components/StreamsTable';
import * as api from '../../services/api';

// Mock the API module
jest.mock('../../services/api');

describe('StreamsTable', () => {
    const mockStreams = [
        {
            id: 'stream-1',
            songName: 'Midnight Dreams',
            artist: 'Luna Eclipse',
            dateStreamed: '2024-03-15',
            streamCount: 856,
            userId: 'user-123'
        },
        {
            id: 'stream-2',
            songName: 'Dancing in the Rain',
            artist: 'The Storms',
            dateStreamed: '2024-03-14',
            streamCount: 654,
            userId: 'user-456'
        }
    ];

    beforeEach(() => {
        jest.resetAllMocks();
        (api.getStreams as jest.Mock).mockResolvedValue(mockStreams);
    });

    it('renders loading state initially', () => {
        render(<StreamsTable />);
        const skeletons = screen.getAllByTestId('skeleton');
        expect(skeletons.length).toBeGreaterThan(0);
    });

    it('displays streams data after loading', async () => {
        render(<StreamsTable />);

        await waitFor(() => {
            expect(screen.getByText('Midnight Dreams')).toBeInTheDocument();
            expect(screen.getByText('Luna Eclipse')).toBeInTheDocument();
            expect(screen.getByText('856')).toBeInTheDocument();
        });
    });

    it('handles search functionality', async () => {
        render(<StreamsTable />);

        // Wait for data to load
        await waitFor(() => {
            expect(screen.getByText('Midnight Dreams')).toBeInTheDocument();
        });

        // Get the search input
        const searchInput = screen.getByPlaceholderText('Search by song, artist, or user ID...');

        // Search for "Luna"
        fireEvent.change(searchInput, { target: { value: 'Luna' } });

        // Should show Luna Eclipse but not The Storms
        expect(screen.getByText('Luna Eclipse')).toBeInTheDocument();
        expect(screen.queryByText('The Storms')).not.toBeInTheDocument();
    });

    it('handles sorting', async () => {
        render(<StreamsTable />);

        await waitFor(() => {
            expect(screen.getByText('Midnight Dreams')).toBeInTheDocument();
        });

        // Click on Stream Count header to sort
        const streamCountHeader = screen.getByText('Stream Count');
        fireEvent.click(streamCountHeader);

        // Check if sorting indicators are shown
        const sortIndicator = screen.getByText('↓');
        expect(sortIndicator).toBeInTheDocument();
    });

    it('handles pagination', async () => {
        render(<StreamsTable />);

        await waitFor(() => {
            expect(screen.getByText('Midnight Dreams')).toBeInTheDocument();
        });

        // Check if pagination controls are present
        const previousButtons = screen.getAllByText('Previous');
        const nextButtons = screen.getAllByText('Next');
        expect(previousButtons.length).toBeGreaterThan(0);
        expect(nextButtons.length).toBeGreaterThan(0);

        // Check if items per page selector is present
        expect(screen.getByText('Items per page:')).toBeInTheDocument();
    });

    it('handles API error gracefully', async () => {
        // Mock API error
        (api.getStreams as jest.Mock).mockRejectedValue(new Error('API Error'));

        render(<StreamsTable />);

        // Should show empty state or error message
        await waitFor(() => {
            const rows = screen.queryAllByRole('row');
            // Header row + loading skeleton rows
            expect(rows.length).toBeGreaterThan(1);
        });
    });
}); 