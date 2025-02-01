import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import { ITheme } from '../../../shared/config/theme/ITheme';
import { ThemeMode } from '../../../shared/store/redux/slices/theme/theme.slice';
import { getStyles } from './styles';

interface TeamStatsSectionComponentProps {
  stats: {
    totalPoints: number;
    totalGamesPlayed: number;
    totalGamesWon: number;
    totalAssists: number;
    totalBlocks: number;
    totalDefensiveRebounds: number;
    totalOffensiveRebounds: number;
    totalFieldGoalsAttempted: number;
    totalFieldGoalsMade: number;
    totalFouls: number;
    totalFreeThrowsAttempted: number;
    totalFreeThrowsMade: number;
    totalSeasonsLeaguePlayed: number;
    totalSeasonsLeagueWon: number;
    totalSteals: number;
    totalThreePointersAttempted: number;
    totalThreePointersMade: number;
    totalTurnovers: number;
  };
  theme: ITheme;
  themeMode: ThemeMode;
}

export function TeamStatsSectionComponent({ stats, theme, themeMode }: TeamStatsSectionComponentProps) {
  const styles = getStyles(theme, themeMode);

  // Calcular estadísticas derivadas
  const calculatePercentage = (made: number, attempted: number) => (attempted > 0 ? ((made / attempted) * 100).toFixed(1) : '0.0');

  const calculateAverage = (total: number) => (stats.totalGamesPlayed > 0 ? (total / stats.totalGamesPlayed).toFixed(1) : '0.0');

  const statsGroups = [
    {
      title: 'General',
      stats: [
        {
          label: 'Games Played',
          value: stats.totalGamesPlayed.toString(),
        },
        {
          label: 'Wins',
          value: stats.totalGamesWon.toString(),
        },
        {
          label: 'Win Rate',
          value: `${calculatePercentage(stats.totalGamesWon, stats.totalGamesPlayed)}%`,
        },
        {
          label: 'Seasons Played',
          value: stats.totalSeasonsLeaguePlayed.toString(),
        },
        {
          label: 'Championships',
          value: stats.totalSeasonsLeagueWon.toString(),
        },
      ],
    },
    {
      title: 'Scoring',
      stats: [
        {
          label: 'Total Points',
          value: stats.totalPoints.toString(),
        },
        {
          label: 'PPG',
          value: calculateAverage(stats.totalPoints),
        },
        {
          label: 'FG%',
          value: `${calculatePercentage(stats.totalFieldGoalsMade, stats.totalFieldGoalsAttempted)}%`,
        },
        {
          label: '3PT%',
          value: `${calculatePercentage(stats.totalThreePointersMade, stats.totalThreePointersAttempted)}%`,
        },
        {
          label: 'FT%',
          value: `${calculatePercentage(stats.totalFreeThrowsMade, stats.totalFreeThrowsAttempted)}%`,
        },
      ],
    },
    {
      title: 'Per Game Averages',
      stats: [
        {
          label: 'Assists',
          value: calculateAverage(stats.totalAssists),
        },
        {
          label: 'Rebounds',
          value: calculateAverage(stats.totalOffensiveRebounds + stats.totalDefensiveRebounds),
        },
        {
          label: 'Steals',
          value: calculateAverage(stats.totalSteals),
        },
        {
          label: 'Blocks',
          value: calculateAverage(stats.totalBlocks),
        },
        {
          label: 'Turnovers',
          value: calculateAverage(stats.totalTurnovers),
        },
      ],
    },
    {
      title: 'Advanced',
      stats: [
        {
          label: 'Off. Rebounds',
          value: calculateAverage(stats.totalOffensiveRebounds),
        },
        {
          label: 'Def. Rebounds',
          value: calculateAverage(stats.totalDefensiveRebounds),
        },
        {
          label: 'Fouls/Game',
          value: calculateAverage(stats.totalFouls),
        },
        {
          label: 'Assist/TO',
          value: stats.totalTurnovers > 0
            ? (stats.totalAssists / stats.totalTurnovers).toFixed(2)
            : '0.00',
        },
        {
          label: 'True Shooting%',
          value: `${calculatePercentage(
            stats.totalPoints,
            2 * (stats.totalFieldGoalsAttempted + 0.44 * stats.totalFreeThrowsAttempted),
          )}%`,
        },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {statsGroups.map((group) => (
        <View key={group.title} style={styles.statsGroup}>
          <Text style={styles.groupTitle}>{group.title}</Text>
          <View style={styles.statsGrid}>
            {group.stats.map((stat) => (
              <View key={stat.label} style={styles.statItem}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
