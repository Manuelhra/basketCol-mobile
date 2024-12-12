interface ImageDimensions {
  width: number;
  height: number;
}

interface Image {
  url: string;
  alt: string;
  uploadedAt: string;
  dimensions: ImageDimensions;
}

interface TeamGallery {
  images: Image[];
}

interface Team {
  id: string;
  officialName: string;
  gender: string;
  logo: Image;
  mainImage: Image;
  gallery: TeamGallery;
  teamFounderUserId: string;
  createdAt: string;
  updatedAt: string;
}

interface LeagueTeamStatus {
  id: string;
  teamId: string;
  leagueId: string;
  status: string;
  joinedAt: string;
  leftAt: string | null;
  divisionLevel: string | null;
  lastPromotionDate: string | null;
  lastRelegationDate: string | null;
  createdAt: string;
  updatedAt: string;
  league: League;
  team: Team;
}

export interface FindAllLeagueTeamsByLeagueIdHttpResponseDTO {
  leagueTeams: LeagueTeamStatus[];
}

interface League {
  id: string;
  name: {
    short: string;
    official: string;
  };
  description: {
    short: string;
    complete: string;
  };
  gender: string;
  rules: string;
  level: string;
  location: {
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
  };
  leagueFounderUserId: string;
  establishmentDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
