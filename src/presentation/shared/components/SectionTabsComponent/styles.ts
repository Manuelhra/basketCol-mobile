import { StyleSheet } from 'react-native';

import { ITheme } from '../../config/theme/ITheme';
import { ThemeMode } from '../../store/redux/slices/theme/theme.slice';

export const getStyles = (theme: ITheme, themeMode: ThemeMode, minTabWidth: number) => StyleSheet.create({
  sectionTabsWrapper: {
    backgroundColor: themeMode === 'light'
      ? theme.colors.background
      : theme.colors.secondary,
    borderBottomWidth: 1,
    borderBottomColor: themeMode === 'light'
      ? 'rgba(0,0,0,0.1)'
      : 'rgba(255,255,255,0.1)',
  },
  sectionTabsContainer: {
    flexDirection: 'row',
    paddingTop: theme.spacing.medium,
  },
  sectionTab: {
    paddingHorizontal: theme.spacing.large,
    paddingVertical: theme.spacing.medium,
    position: 'relative',
    minWidth: minTabWidth,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: 'transparent',
  },
  sectionTabText: {
    fontFamily: theme.fonts.bold,
    fontSize: 16,
    color: themeMode === 'light'
      ? theme.colors.textSecondary
      : 'rgba(255,255,255,0.6)',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
  },
  activeTabText: {
    color: themeMode === 'light'
      ? theme.colors.primary
      : theme.colors.accent,
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: theme.spacing.large,
    right: theme.spacing.large,
    height: 3,
    backgroundColor: themeMode === 'light'
      ? theme.colors.primary
      : theme.colors.accent,
    borderRadius: theme.borderRadius.small,
  },
});
