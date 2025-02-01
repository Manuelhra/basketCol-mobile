export interface FindCareerStatsByPlayerUserIdHttpResponseDTO {
  playerUserCareerStats: {
    id: string;
    totalGamesPlayed: number;
    totalGamesWon: number;
    totalSeasonsLeaguePlayed: number;
    totalSeasonsLeagueWon: number;
    totalPoints: number;
    totalOffensiveRebounds: number;
    totalDefensiveRebounds: number;
    totalAssists: number;
    totalSteals: number;
    totalBlocks: number;
    totalFouls: number;
    totalTurnovers: number;
    totalThreePointersAttempted: number;
    totalThreePointersMade: number;
    totalFreeThrowsAttempted: number;
    totalFreeThrowsMade: number;
    totalFieldGoalsAttempted: number;
    totalFieldGoalsMade: number;
    playerUserId: string;
    createdAt: string; // Podría ser Date si deseas manejar fechas como objetos Date
    updatedAt: string;
  }
}
