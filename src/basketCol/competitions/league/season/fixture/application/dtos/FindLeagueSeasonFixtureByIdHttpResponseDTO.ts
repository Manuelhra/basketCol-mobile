export interface FindLeagueSeasonFixtureByIdHttpResponseDTO {
  leagueSeasonFixture: {
    id: string;
    date: string;
    name: string;
    leagueSeasonId: string;
    createdAt: string;
    updatedAt: string;
    leagueSeason: {
      id: string;
      name: string;
      startDate: string;
      endDate: string;
      status: string;
      leagueId: string;
      courtIdList: string[];
      createdAt: string;
      updatedAt: string;
    };
  };
}
