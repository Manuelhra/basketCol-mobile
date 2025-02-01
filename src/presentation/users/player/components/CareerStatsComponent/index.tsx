import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import { ITheme } from '../../../../shared/config/theme/ITheme';
import { ThemeMode } from '../../../../shared/store/redux/slices/theme/theme.slice';
import { getStyles } from './styles';

interface CareerStatsComponentProps {
  theme: ITheme;
  themeMode: ThemeMode;
  careerStats: {
    totalPoints: number;
    totalAssists: number;
    totalBlocks: number;
    totalDefensiveRebounds: number;
    totalOffensiveRebounds: number;
    totalSteals: number;
    totalGamesPlayed: number;
    totalGamesWon: number;
    totalFieldGoalsAttempted: number;
    totalFieldGoalsMade: number;
    totalThreePointersAttempted: number;
    totalThreePointersMade: number;
    totalFreeThrowsAttempted: number;
    totalFreeThrowsMade: number;
    totalTurnovers: number;
    totalFouls: number;
  };
}

export function CareerStatsComponent({ theme, themeMode, careerStats }: CareerStatsComponentProps) {
  const styles = getStyles(theme, themeMode);

  const calculatePercentage = (made: number, attempted: number): string => {
    if (attempted === 0) return '0.0';
    return ((made / attempted) * 100).toFixed(1);
  };

  const calculateAverage = (total: number): string => (careerStats.totalGamesPlayed > 0
    ? (total / careerStats.totalGamesPlayed).toFixed(1)
    : '0.0');

  const statsGroups = [
    {
      title: 'General',
      stats: [
        {
          label: 'Games Played',
          value: careerStats.totalGamesPlayed.toString(),
        },
        {
          label: 'Wins',
          value: careerStats.totalGamesWon.toString(),
        },
        {
          label: 'Win Rate',
          value: `${calculatePercentage(careerStats.totalGamesWon, careerStats.totalGamesPlayed)}%`,
        },
        {
          label: 'Total Points',
          value: careerStats.totalPoints.toString(),
        },
        {
          label: 'PPG',
          value: calculateAverage(careerStats.totalPoints),
        },
      ],
    },
    {
      title: 'Shooting',
      stats: [
        {
          label: 'FG%',
          value: `${calculatePercentage(careerStats.totalFieldGoalsMade, careerStats.totalFieldGoalsAttempted)}%`,
        },
        {
          label: '3PT%',
          value: `${calculatePercentage(careerStats.totalThreePointersMade, careerStats.totalThreePointersAttempted)}%`,
        },
        {
          label: 'FT%',
          value: `${calculatePercentage(careerStats.totalFreeThrowsMade, careerStats.totalFreeThrowsAttempted)}%`,
        },
        {
          label: 'True Shooting%',
          value: `${calculatePercentage(
            careerStats.totalPoints,
            2 * (careerStats.totalFieldGoalsAttempted + 0.44 * careerStats.totalFreeThrowsAttempted),
          )}%`,
        },
      ],
    },
    {
      title: 'Per Game Averages',
      stats: [
        {
          label: 'Assists',
          value: calculateAverage(careerStats.totalAssists),
        },
        {
          label: 'Rebounds',
          value: calculateAverage(careerStats.totalDefensiveRebounds + careerStats.totalOffensiveRebounds),
        },
        {
          label: 'Steals',
          value: calculateAverage(careerStats.totalSteals),
        },
        {
          label: 'Blocks',
          value: calculateAverage(careerStats.totalBlocks),
        },
        {
          label: 'Turnovers',
          value: calculateAverage(careerStats.totalTurnovers),
        },
      ],
    },
    {
      title: 'Advanced',
      stats: [
        {
          label: 'Off. Rebounds',
          value: calculateAverage(careerStats.totalOffensiveRebounds),
        },
        {
          label: 'Def. Rebounds',
          value: calculateAverage(careerStats.totalDefensiveRebounds),
        },
        {
          label: 'Fouls/Game',
          value: calculateAverage(careerStats.totalFouls),
        },
        {
          label: 'Assist/TO',
          value: careerStats.totalTurnovers > 0
            ? (careerStats.totalAssists / careerStats.totalTurnovers).toFixed(2)
            : '0.00',
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
