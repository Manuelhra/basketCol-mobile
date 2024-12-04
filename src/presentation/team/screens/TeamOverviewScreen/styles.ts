import { StyleSheet } from 'react-native';

import { ITheme } from '../../../shared/config/theme/ITheme';
import { ThemeMode } from '../../../shared/store/redux/slices/theme/theme.slice';

export const getStyles = (theme: ITheme, themeMode: ThemeMode) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  teamHeaderContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamHeaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamLogo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: theme.colors.accent,
  },
  teamName: {
    fontSize: 32,
    fontFamily: theme.fonts.heading,
    color: '#FFFFFF',
    marginTop: theme.spacing.medium,
    letterSpacing: 2,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  teamGender: {
    fontSize: 18,
    fontFamily: theme.fonts.regular,
    color: theme.colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  teamStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: theme.spacing.medium,
    backgroundColor: themeMode === 'light'
      ? theme.colors.background
      : theme.colors.secondary,
  },
  statBox: {
    alignItems: 'center',
    width: '22%',
  },
  statValue: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    color: themeMode === 'light'
      ? theme.colors.primary
      : theme.colors.accent,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
  },
  teamRosterContainer: {
    padding: theme.spacing.large,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: theme.fonts.heading,
    color: theme.colors.text,
    marginBottom: theme.spacing.medium,
    textTransform: 'uppercase',
  },
  playerCardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  // Styles from PlayerUserCard
  cardContainer: {
    borderRadius: theme.borderRadius.large,
    overflow: 'hidden',
    marginBottom: theme.spacing.large,
    backgroundColor: themeMode === 'light'
      ? '#000000'
      : '#1A1A1A',
    elevation: 10,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  playerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0.85,
  },
  bottomInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '25%',
    backgroundColor: 'rgba(0,0,0,0.78)',
    paddingHorizontal: theme.spacing.large,
    paddingBottom: theme.spacing.large,
  },
  floatingContainer: {
    position: 'absolute',
    top: -30,
    left: '50%',
    transform: [{ translateX: -100 }],
    width: 200,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
    borderRadius: theme.borderRadius.large,
    borderWidth: 1,
    borderColor: theme.colors.accent,
  },
  divider: {
    width: 2,
    height: '60%',
    backgroundColor: theme.colors.accent,
    marginHorizontal: theme.spacing.medium,
  },
  positionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  positionText: {
    color: '#FFFFFF',
    fontFamily: theme.fonts.bold,
    fontSize: 21,
    letterSpacing: 2,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 45,
  },
  firstName: {
    color: '#FFFFFF',
    fontFamily: theme.fonts.heading,
    fontSize: 18,
    letterSpacing: 3,
    textTransform: 'uppercase',
    textShadowColor: theme.colors.primary,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  lastName: {
    color: theme.colors.accent,
    fontFamily: theme.fonts.heading,
    fontSize: 24,
    letterSpacing: 4,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
  },
  currentUserBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: theme.colors.accent,
    paddingHorizontal: theme.spacing.small,
    paddingVertical: theme.spacing.small / 2,
    borderRadius: theme.borderRadius.small,
  },
  currentUserBadgeText: {
    fontSize: 10,
    fontFamily: theme.fonts.bold,
    color: theme.colors.background,
  },
});
