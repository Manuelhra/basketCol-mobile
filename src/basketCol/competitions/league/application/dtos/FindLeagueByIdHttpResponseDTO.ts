interface LeagueLocation {
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

interface LeagueName {
  short: string;
  official: string;
}

interface LeagueDescription {
  short: string;
  complete: string;
}

interface ProfileImageDimensions {
  width: number;
  height: number;
}

interface ProfileImage {
  url: string;
  uploadedAt: string;
  alt: string;
  dimensions: ProfileImageDimensions;
}

interface UserEmail {
  value: string;
  verified: boolean;
}

interface UserName {
  firstName: string;
  lastName: string;
}

interface LeagueFounderUser {
  id: string;
  name: UserName;
  biography: string;
  email: UserEmail;
  password: string;
  gender: 'MALE' | 'FEMALE';
  type: 'LEAGUE_FOUNDER_USER';
  accountStatus: string;
  subscriptionType: string;
  profileImage: ProfileImage;
  createdAt: string;
  updatedAt: string;
}

export interface FindLeagueByIdHttpResponseDTO {
  id: string;
  name: LeagueName;
  description: LeagueDescription;
  gender: 'MALE' | 'FEMALE';
  rules: string;
  level: string;
  location: LeagueLocation;
  leagueFounderUserId: string;
  establishmentDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  leagueFounderUser: LeagueFounderUser;
}
