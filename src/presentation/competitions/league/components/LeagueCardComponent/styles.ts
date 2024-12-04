import { StyleSheet } from 'react-native';

import { ITheme } from '../../../../shared/config/theme/ITheme';
import { ThemeMode } from '../../../../shared/store/redux/slices/theme/theme.slice';

export const getStyles = (theme: ITheme, themeMode: ThemeMode, isSmall: boolean = false) => StyleSheet.create({
  cardContainer: {
    borderRadius: theme.borderRadius.large,
    overflow: 'hidden',
    marginBottom: theme.spacing.large,
    height: isSmall ? 400 : 600,
    backgroundColor: themeMode === 'light' ? '#0A0A0A' : '#1A1A1A',
    elevation: 12,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  leagueBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.4,
  },
  floatingLogoContainer: {
    position: 'absolute',
    top: isSmall ? 10 : 20,
    right: isSmall ? 10 : 20,
    width: isSmall ? 80 : 120,
    height: isSmall ? 80 : 120,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: theme.borderRadius.large,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.quaternary,
  },
  leagueLogo: {
    width: '70%',
    height: '70%',
  },
  leagueLevelBadge: {
    position: 'absolute',
    top: isSmall ? 15 : 25,
    left: isSmall ? 10 : 20,
    backgroundColor: theme.colors.quaternary,
    paddingHorizontal: theme.spacing.small,
    paddingVertical: theme.spacing.small / 2,
    borderRadius: theme.borderRadius.small,
  },
  leagueLevelText: {
    color: theme.colors.background,
    fontFamily: theme.fonts.bold,
    fontSize: isSmall ? 10 : 14,
    textTransform: 'uppercase',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: isSmall ? theme.spacing.medium : theme.spacing.large,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  leagueName: {
    color: '#FFFFFF',
    fontFamily: theme.fonts.heading,
    fontSize: isSmall ? 18 : 28,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: theme.spacing.small,
  },
  leagueDescription: {
    color: theme.colors.quaternary,
    fontFamily: theme.fonts.regular,
    fontSize: isSmall ? 12 : 16,
    marginBottom: theme.spacing.medium,
  },
  additionalInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    color: '#888888',
    fontFamily: theme.fonts.bold,
    fontSize: isSmall ? 8 : 10,
    textTransform: 'uppercase',
    marginBottom: theme.spacing.small / 2,
  },
  infoValue: {
    color: '#FFFFFF',
    fontFamily: theme.fonts.bold,
    fontSize: isSmall ? 12 : 16,
  },
});
