import { StyleSheet } from 'react-native';

import { ITheme } from '../../../../../../shared/config/theme/ITheme';
import { ThemeMode } from '../../../../../../shared/store/redux/slices/theme/theme.slice';

export const getStyles = (theme: ITheme, themeMode: ThemeMode) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerContainer: {
    height: 220,
    overflow: 'hidden',
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 220,
  },
  headerContentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.large,
    paddingTop: 50,
  },
  backButton: {
    padding: theme.spacing.small,
  },
  dateInfoContainer: {
    alignItems: 'center',
  },
  dayText: {
    fontFamily: theme.fonts.bold,
    fontSize: 16,
    color: theme.colors.background,
    letterSpacing: 1,
  },
  dateText: {
    fontFamily: theme.fonts.heading,
    fontSize: 24,
    color: theme.colors.background,
    marginBottom: theme.spacing.small,
  },
  leagueTagContainer: {
    backgroundColor: theme.colors.accent,
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.small,
    borderRadius: theme.borderRadius.medium,
  },
  leagueTag: {
    fontFamily: theme.fonts.bold,
    fontSize: 12,
    color: theme.colors.background,
    textTransform: 'uppercase',
  },
  headerMetaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  matchCountBadge: {
    backgroundColor: theme.colors.tertiary,
    borderRadius: theme.borderRadius.medium,
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.small,
    marginRight: theme.spacing.medium,
  },
  matchCountText: {
    fontFamily: theme.fonts.bold,
    fontSize: 12,
    color: theme.colors.background,
  },
  headerCurve: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  scrollViewContent: {
    paddingHorizontal: theme.spacing.medium,
    paddingTop: theme.spacing.large,
    paddingBottom: theme.spacing.xlarge,
  },
  matchCard: {
    backgroundColor: themeMode === 'light'
      ? 'rgba(240,240,240,0.8)'
      : 'rgba(50,50,50,0.8)',
    borderRadius: theme.borderRadius.large,
    marginBottom: theme.spacing.large,
    elevation: 5,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    overflow: 'hidden',
  },
  matchCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.large,
  },
  teamContainer: {
    alignItems: 'center',
    width: '30%',
  },
  teamLogo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  teamName: {
    marginTop: theme.spacing.small,
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
    fontSize: 14,
    textAlign: 'center',
  },
  matchDetailsContainer: {
    alignItems: 'center',
    width: '40%',
  },
  vsText: {
    fontFamily: theme.fonts.heading,
    fontSize: 18,
    color: theme.colors.accent,
    marginBottom: theme.spacing.small,
  },
  matchStatus: {
    fontFamily: theme.fonts.regular,
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  matchTime: {
    fontFamily: theme.fonts.bold,
    fontSize: 16,
    color: theme.colors.primary,
  },
});
