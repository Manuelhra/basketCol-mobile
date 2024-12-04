import { StyleSheet } from 'react-native';

import { ITheme } from '../../../shared/config/theme/ITheme';
import { ThemeMode } from '../../../shared/store/redux/slices/theme/theme.slice';

export const getStyles = (theme: ITheme, themeMode: ThemeMode, isSmall: boolean) => StyleSheet.create({
  cardContainer: {
    marginRight: isSmall ? theme.spacing.medium : 'auto',
    width: isSmall ? 250 : 'auto',
    height: isSmall ? 350 : 550,
    borderRadius: theme.borderRadius.large,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    backgroundColor: themeMode === 'light'
      ? 'rgba(0,0,0,0.1)'
      : 'rgba(26,26,26,0.5)',
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: theme.colors.accent,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.7,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  logoContainer: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: theme.colors.accent,
  },
  teamLogo: {
    width: 80,
    height: 80,
  },
  teamNameContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  teamNamePrimary: {
    color: '#FFFFFF',
    fontFamily: theme.fonts.heading,
    fontSize: 18,
    letterSpacing: 2,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  teamNameSecondary: {
    color: theme.colors.accent,
    fontFamily: theme.fonts.heading,
    fontSize: 14,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  statsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: theme.spacing.small,
    paddingVertical: theme.spacing.small / 2,
    borderRadius: theme.borderRadius.medium,
  },
  statText: {
    color: '#FFFFFF',
    fontFamily: theme.fonts.regular,
    fontSize: 12,
    marginLeft: theme.spacing.small,
  },
});
