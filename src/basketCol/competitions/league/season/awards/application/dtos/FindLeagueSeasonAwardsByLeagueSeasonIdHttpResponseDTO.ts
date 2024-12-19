export interface FindLeagueSeasonAwardsByLeagueSeasonIdHttpResponseDTO {
  leagueSeasonAwards: LeagueSeasonAwards;
}

interface LeagueSeasonAwards {
  id: string;
  bestThreePointShooterId: string;
  bestTwoPointShooterId: string;
  bestFreeThrowShooterId: string;
  bestAssistProviderId: string;
  bestOffensiveRebounderId: string;
  bestDefensiveRebounderId: string;
  mostValuablePlayerId: string;
  championTeamId: string;
  leagueSeasonId: string;
  createdAt: string;
  updatedAt: string;
  leagueSeason: LeagueSeason;
  championTeam: Team;
  bestThreePointShooter: Player;
  bestTwoPointShooter: Player;
  bestAssistProvider: Player;
  bestDefensiveRebounder: Player;
  bestFreeThrowShooter: Player;
  bestOffensiveRebounder: Player;
  mostValuablePlayer: Player;
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
}

interface Team {
  id: string;
  officialName: string;
  gender: string;
  logo: Image;
  mainImage: Image;
  gallery: Gallery;
  teamFounderUserId: string;
  createdAt: string;
  updatedAt: string;
}

interface Image {
  url: string;
  alt: string;
  uploadedAt: string;
  dimensions: Dimensions;
}

interface Dimensions {
  width: number;
  height: number;
}

interface Gallery {
  images: Image[];
}

interface Player {
  id: string;
  name: PlayerName;
  biography: string;
  nickname: string;
  email: Email;
  password: string;
  gender: string;
  type: string;
  accountStatus: string;
  subscriptionType: string;
  profileImage: Image;
  createdAt: string;
  updatedAt: string;
}

interface PlayerName {
  firstName: string;
  lastName: string;
}

interface Email {
  value: string;
  verified: boolean;
}
