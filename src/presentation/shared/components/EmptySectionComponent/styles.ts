import { StyleSheet } from 'react-native';

import { ITheme } from '../../config/theme/ITheme';
import { ThemeMode } from '../../store/redux/slices/theme/theme.slice';

export const getStyles = (theme: ITheme, themeMode: ThemeMode, accentColor: string) => StyleSheet.create({
  emptyCard: {
    backgroundColor: `${accentColor}10`,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.medium,
    marginRight: theme.spacing.medium,
    alignItems: 'center',
    justifyContent: 'center',
    height: 160,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: `${accentColor}30`,
  },
  emptyTitle: {
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
    fontSize: 16,
    marginTop: theme.spacing.small,
    textAlign: 'center',
  },
  emptyDescription: {
    fontFamily: theme.fonts.regular,
    color: theme.colors.textSecondary,
    fontSize: 14,
    marginTop: theme.spacing.small,
    textAlign: 'center',
  },
  actionButton: {
    marginTop: theme.spacing.medium,
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.small,
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.medium,
  },
  actionButtonText: {
    fontFamily: theme.fonts.bold,
    color: theme.colors.background,
    fontSize: 14,
  },
});
