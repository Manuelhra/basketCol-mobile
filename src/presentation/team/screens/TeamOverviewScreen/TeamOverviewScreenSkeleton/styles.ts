import { StyleSheet } from 'react-native';

import { ITheme } from '../../../../shared/config/theme/ITheme';
import { ThemeMode } from '../../../../shared/store/redux/slices/theme/theme.slice';

export const getStyles = (theme: ITheme, themeMode: ThemeMode) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
  },
  // Header Skeleton
  teamHeaderSkeleton: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeMode === 'dark'
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(0, 0, 0, 0.1)',
    borderRadius: theme.borderRadius.medium,
    marginBottom: theme.spacing.large,
  },
  teamLogoSkeleton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: themeMode === 'dark'
      ? 'rgba(255, 255, 255, 0.15)'
      : 'rgba(0, 0, 0, 0.15)',
    marginBottom: theme.spacing.small,
  },
  teamNameSkeleton: {
    width: '50%',
    height: 20,
    borderRadius: theme.borderRadius.small,
    backgroundColor: themeMode === 'dark'
      ? 'rgba(255, 255, 255, 0.15)'
      : 'rgba(0, 0, 0, 0.15)',
    marginBottom: theme.spacing.small,
  },
  teamGenderSkeleton: {
    width: '30%',
    height: 15,
    borderRadius: theme.borderRadius.small,
    backgroundColor: themeMode === 'dark'
      ? 'rgba(255, 255, 255, 0.15)'
      : 'rgba(0, 0, 0, 0.15)',
  },
  // Stats Skeleton
  teamStatsSkeletonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: theme.spacing.large,
  },
  statBoxSkeleton: {
    width: '20%',
    height: 50,
    borderRadius: theme.borderRadius.small,
    backgroundColor: themeMode === 'dark'
      ? 'rgba(255, 255, 255, 0.15)'
      : 'rgba(0, 0, 0, 0.15)',
  },
  // Roster Skeleton
  teamRosterSkeleton: {
    paddingVertical: theme.spacing.large,
  },
  sectionTitleSkeleton: {
    width: '40%',
    height: 20,
    borderRadius: theme.borderRadius.small,
    backgroundColor: themeMode === 'dark'
      ? 'rgba(255, 255, 255, 0.15)'
      : 'rgba(0, 0, 0, 0.15)',
    marginBottom: theme.spacing.medium,
  },
  playerCardSkeletonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  playerCardSkeleton: {
    width: '45%',
    height: 150,
    borderRadius: theme.borderRadius.medium,
    backgroundColor: themeMode === 'dark'
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(0, 0, 0, 0.1)',
    marginBottom: theme.spacing.medium,
  },
});
