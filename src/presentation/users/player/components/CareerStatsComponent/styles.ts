import { StyleSheet } from 'react-native';

import { ITheme } from '../../../../shared/config/theme/ITheme';
import { ThemeMode } from '../../../../shared/store/redux/slices/theme/theme.slice';

export const getStyles = (theme: ITheme, themeMode: ThemeMode) => StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.medium,
  },
  statsGroup: {
    marginBottom: theme.spacing.xlarge,
  },
  groupTitle: {
    fontSize: 20,
    fontFamily: theme.fonts.heading,
    color: themeMode === 'light' ? theme.colors.primary : theme.colors.accent,
    marginBottom: theme.spacing.medium,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: themeMode === 'light'
      ? 'rgba(0,0,0,0.03)'
      : 'rgba(255,255,255,0.05)',
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.medium,
  },
  statItem: {
    width: '45%',
    marginVertical: theme.spacing.small,
    padding: theme.spacing.small,
    alignItems: 'center',
    backgroundColor: themeMode === 'light'
      ? theme.colors.background
      : 'rgba(0,0,0,0.2)',
    borderRadius: theme.borderRadius.small,
    borderLeftWidth: 3,
    borderLeftColor: themeMode === 'light'
      ? theme.colors.primary
      : theme.colors.accent,
  },
  statValue: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: themeMode === 'light'
      ? theme.colors.primary
      : theme.colors.accent,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
