import { ILeaguePrimitives } from '@basketcol/domain';

export const dummyLeaguesData: ILeaguePrimitives[] = [
  {
    id: 'league_001',
    name: {
      short: 'NBA',
      official: 'National Basketball Association',
    },
    description: {
      short: 'Top professional basketball league in North America',
      complete: 'The National Basketball Association (NBA) is a professional basketball league in North America composed of 30 teams.',
    },
    gender: 'Male',
    rules: 'NBA Official Rules',
    level: 'Professional',
    location: {
      city: { code: 'city_001', label: 'New York' },
      department: { code: 'department_001', label: 'New York' },
      country: { code: 'country_001', label: 'USA' },
      coords: {
        lat: 40.7128,
        lng: 74.0060,
      },
    },
    establishmentDate: '1946-06-06',
    leagueFounderUserId: 'user_founder_001',
    isActive: true,
    createdAt: '2021-06-01T12:00:00Z',
    updatedAt: '2021-06-01T12:00:00Z',
  },
];
