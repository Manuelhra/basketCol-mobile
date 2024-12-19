interface Location {
  country: {
    code: string;
    label: string;
  };
  city: {
    code: string;
    label: string;
  };
  department: {
    code: string;
    label: string;
  };
  coords: {
    lat: number;
    lng: number;
  };
}

interface Name {
  short: string;
  official: string;
}

interface Description {
  short: string;
  complete: string;
}

interface League {
  id: string;
  name: Name;
  description: Description;
  gender: string;
  rules: string;
  level: string;
  location: Location;
  leagueFounderUserId: string;
  establishmentDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface LeagueSeason {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: string;
  leagueId: string;
  courtIdList: string[];
  createdAt: string;
  updatedAt: string;
  league: League;
}

interface LeagueSeasonFixture {
  id: string;
  date: string;
  name: string;
  leagueSeasonId: string;
  createdAt: string;
  updatedAt: string;
  leagueSeason: LeagueSeason;
}

export interface FindAllLeagueSeasonFixturesByLeagueSeasonIdHttpResponseDTO {
  leagueSeasonFixtures: LeagueSeasonFixture[];
}
