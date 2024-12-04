import { PlayerUserHttpResponseDTO } from '../../../../../../basketCol/users/player/application/dtos/PlayerUserHttpResponseDTO';

export const dummyLeagueSeasonData: {
  [key: string]: any;
  players: PlayerUserHttpResponseDTO[];
} = {
  leagueSeason: {
    id: 'season_2025',
    name: 'Urban League 2025',
    startDate: '2025-09-01T00:00:00Z',
    endDate: '2025-12-15T00:00:00Z',
    status: 'In Progress',
    courtIdList: ['court_001', 'court_002', 'court_003', 'court_004'],
    leagueId: 'league_001',
  },
  fixtures: {
    '2025-01-01': {
      marked: true,
      dotColor: 'red',
      description: 'Brooklyn Ballers vs. Harlem Hoopers',
    },
    '2025-01-15': {
      marked: true,
      dotColor: 'blue',
      description: 'Queens Quakers vs. Bronx Bombers',
    },
    '2025-01-29': {
      marked: true,
      dotColor: 'green',
      description: 'Staten Island Sharks vs. Manhattan Mavericks',
    },
    '2025-02-12': {
      marked: true,
      dotColor: 'purple',
      description: 'Brooklyn Ballers vs. Queens Quakers',
    },
  },
  seasonAwards: true,
  players: [
    {
      id: 'user_002',
      email: {
        value: 'michael.jordan@example.com',
        verified: true,
      },
      name: {
        firstName: 'Michael',
        lastName: 'Jordan',
      },
      nickname: 'MJ23',
      gender: 'Male',
      biography: 'Professional basketball player with a passion for the game',
      type: 'Player',
      accountStatus: 'Active',
      subscriptionType: 'Premium',
      profileImage: {
        url: 'https://basketcol-dev-profile-image.s3.us-east-1.amazonaws.com/player/1730355431232-9944e49e.webp',
        alt: 'Michael Jordan Profile',
        dimensions: {
          width: 200,
          height: 200,
        },
        uploadedAt: '2021-09-01T00:00:00Z',
      },
      createdAt: '2021-09-01T00:00:00Z',
      updatedAt: '2021-09-01T00:00:00Z',
    },
    {
      id: 'user_003',
      email: {
        value: 'michael.jordan@example.com',
        verified: true,
      },
      name: {
        firstName: 'Michael',
        lastName: 'Jordan',
      },
      nickname: 'MJ23',
      gender: 'Male',
      biography: 'Professional basketball player with a passion for the game',
      type: 'Player',
      accountStatus: 'Active',
      subscriptionType: 'Premium',
      profileImage: {
        url: 'https://basketcol-dev-profile-image.s3.us-east-1.amazonaws.com/player/1730355431232-9944e49e.webp',
        alt: 'Michael Jordan Profile',
        dimensions: {
          width: 200,
          height: 200,
        },
        uploadedAt: '2021-09-01T00:00:00Z',
      },
      createdAt: '2021-09-01T00:00:00Z',
      updatedAt: '2021-09-01T00:00:00Z',
    },
  ],
};
