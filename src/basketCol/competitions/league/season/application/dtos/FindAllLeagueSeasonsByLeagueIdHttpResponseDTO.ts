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

export interface FindAllLeagueSeasonsByLeagueIdHttpResponseDTO {
  leagueSeasons: LeagueSeason[];
}
