import { TeamHttpResponseDTO } from '../../../../../basketCol/team/application/dtos/TeamHttpResponseDTO';

export const dummyLeagueData: {
  [key: string]: any;
  teams: TeamHttpResponseDTO[];
} = {
  league: {
    id: 'league_001',
    name: {
      short: 'Urban League',
      official: 'Urban Basketball Association',
    },
    description: {
      short: 'Competitive urban basketball league',
      complete: 'A dynamic basketball league bringing together the most talented urban players from across the region, fostering competitive spirit and community engagement.',
    },
    gender: 'Mixed',
    rules: 'Standard NBA 2K basketball regulations',
    level: 'Professional',
    location: {
      street: '123 Basketball Avenue',
      city: 'New York',
      state: 'NY',
      country: 'United States',
      zipCode: '10001',
    },
    establishmentDate: '2020-01-15T00:00:00Z',
    leagueFounderUserId: 'user_founder_001',
    isActive: true,
  },
  leagueFounder: {
    id: 'user_founder_001',
    name: {
      firstName: 'Marcus',
      lastName: 'Thompson',
    },
    profileImage: {
      url: 'https://basketcol-dev-profile-image.s3.us-east-1.amazonaws.com/league-founder/1732202291471-0dad6652.webp',
      alt: 'League Founder Profile',
    },
  },
  seasons: [
    {
      id: 'season_2022',
      name: 'Urban League 2022',
      startDate: '2022-09-01T00:00:00Z',
      endDate: '2022-12-15T00:00:00Z',
      status: 'Completed',
      courtIdList: ['court_001', 'court_002', 'court_003'],
      leagueId: 'league_001',
    },
    {
      id: 'season_2023',
      name: 'Urban League 2023',
      startDate: '2023-09-01T00:00:00Z',
      endDate: '2023-12-15T00:00:00Z',
      status: 'In Progress',
      courtIdList: ['court_001', 'court_002', 'court_003', 'court_004'],
      leagueId: 'league_001',
    },
    {
      id: 'season_2024',
      name: 'Urban League 2024',
      startDate: '2024-09-01T00:00:00Z',
      endDate: '2024-12-15T00:00:00Z',
      status: 'Upcoming',
      courtIdList: ['court_001', 'court_002', 'court_003', 'court_004', 'court_005'],
      leagueId: 'league_001',
    },
  ],
  teams: [
    {
      id: 'team_001',
      officialName: 'Brooklyn Ballers',
      gender: 'Mixed',
      teamFounderUserId: 'user_founder_002',
      mainImage: {
        url: 'https://basketcol-dev-logo.s3.us-east-1.amazonaws.com/team/1732296201563-8c78944a.webp',
        alt: 'Urban Ballers Team Photo',
        uploadedAt: '2022-01-15T00:00:00Z',
        dimensions: {
          width: 1024,
          height: 768,
        },
      },
      logo: {
        url: 'https://basketcol-dev-logo.s3.us-east-1.amazonaws.com/team/1732296201563-8c78944a.webp',
        alt: 'Urban Ballers Logo',
        dimensions: {
          width: 1024,
          height: 768,
        },
        uploadedAt: '2022-01-15T00:00:00Z',
      },
      gallery: {
        images: [
          {
            url: 'https://example.com/gallery1.jpg',
            alt: 'Team Practice',
            dimensions: {
              width: 1024,
              height: 768,
            },
            uploadedAt: '2022-01-15T00:00:00Z',
          },
          {
            url: 'https://example.com/gallery2.jpg',
            alt: 'Team Celebration',
            dimensions: {
              width: 1024,
              height: 768,
            },
            uploadedAt: '2022-01-15T00:00:00Z',
          },
        ],
      },
      createdAt: '2022-01-15T00:00:00Z',
      updatedAt: '2022-01-15T00:00:00Z',
    },
    {
      id: 'team_002',
      officialName: 'Brooklyn Ballers',
      gender: 'Mixed',
      teamFounderUserId: 'user_founder_002',
      mainImage: {
        url: 'https://basketcol-dev-logo.s3.us-east-1.amazonaws.com/team/1732296201563-8c78944a.webp',
        alt: 'Urban Ballers Team Photo',
        uploadedAt: '2022-01-15T00:00:00Z',
        dimensions: {
          width: 1024,
          height: 768,
        },
      },
      logo: {
        url: 'https://basketcol-dev-logo.s3.us-east-1.amazonaws.com/team/1732296201563-8c78944a.webp',
        alt: 'Urban Ballers Logo',
        dimensions: {
          width: 1024,
          height: 768,
        },
        uploadedAt: '2022-01-15T00:00:00Z',
      },
      gallery: {
        images: [
          {
            url: 'https://example.com/gallery1.jpg',
            alt: 'Team Practice',
            dimensions: {
              width: 1024,
              height: 768,
            },
            uploadedAt: '2022-01-15T00:00:00Z',
          },
          {
            url: 'https://example.com/gallery2.jpg',
            alt: 'Team Celebration',
            dimensions: {
              width: 1024,
              height: 768,
            },
            uploadedAt: '2022-01-15T00:00:00Z',
          },
        ],
      },
      createdAt: '2022-01-15T00:00:00Z',
      updatedAt: '2022-01-15T00:00:00Z',
    },
    {
      id: 'team_003',
      officialName: 'Brooklyn Ballers',
      gender: 'Mixed',
      teamFounderUserId: 'user_founder_002',
      mainImage: {
        url: 'https://basketcol-dev-logo.s3.us-east-1.amazonaws.com/team/1732296201563-8c78944a.webp',
        alt: 'Urban Ballers Team Photo',
        uploadedAt: '2022-01-15T00:00:00Z',
        dimensions: {
          width: 1024,
          height: 768,
        },
      },
      logo: {
        url: 'https://basketcol-dev-logo.s3.us-east-1.amazonaws.com/team/1732296201563-8c78944a.webp',
        alt: 'Urban Ballers Logo',
        dimensions: {
          width: 1024,
          height: 768,
        },
        uploadedAt: '2022-01-15T00:00:00Z',
      },
      gallery: {
        images: [
          {
            url: 'https://example.com/gallery1.jpg',
            alt: 'Team Practice',
            dimensions: {
              width: 1024,
              height: 768,
            },
            uploadedAt: '2022-01-15T00:00:00Z',
          },
          {
            url: 'https://example.com/gallery2.jpg',
            alt: 'Team Celebration',
            dimensions: {
              width: 1024,
              height: 768,
            },
            uploadedAt: '2022-01-15T00:00:00Z',
          },
        ],
      },
      createdAt: '2022-01-15T00:00:00Z',
      updatedAt: '2022-01-15T00:00:00Z',
    },
  ],
};
