import { screen } from '@testing-library/react';
import { render } from '../test-utils';
import TopSongs from '../../components/charts/TopSongs';
import * as api from '../../services/api';

// Mock the API module
jest.mock('../../services/api');

describe('TopSongs', () => {
    const mockTopSongs = [
        {
            name: 'Midnight Dreams',
            streams: 1500000,
            artist: 'Luna Eclipse'
        },
        {
            name: 'Dancing in the Rain',
            streams: 1200000,
            artist: 'The Storms'
        }
    ];

    beforeEach(() => {
        jest.resetAllMocks();
        (api.getTopSongs as jest.Mock).mockResolvedValue(mockTopSongs);
    });

    it('renders loading state initially', () => {
        render(<TopSongs />);
        const skeleton = screen.getByTestId('skeleton');
        expect(skeleton).toBeInTheDocument();
    });

    it('displays chart title', () => {
        render(<TopSongs />);
        expect(screen.getByText('Top Streamed Songs')).toBeInTheDocument();
    });
}); 