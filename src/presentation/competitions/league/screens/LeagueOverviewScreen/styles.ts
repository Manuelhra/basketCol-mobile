import { StyleSheet } from 'react-native';

import { ITheme } from '../../../../shared/config/theme/ITheme';

export const getStyles = (theme: ITheme, screenWidth: number) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerContainer: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 300, // Fixed height for the header
    overflow: 'hidden',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.7,
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  headerContent: {
    zIndex: 10,
    alignItems: 'center',
  },
  leagueName: {
    fontSize: 28,
    fontFamily: theme.fonts.heading,
    color: theme.colors.background,
    marginTop: theme.spacing.medium,
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  sectionSeparator: {
    height: theme.spacing.large,
    backgroundColor: theme.colors.background,
  },
  founderContainer: {
    paddingHorizontal: theme.spacing.medium,
    marginTop: theme.spacing.medium,
  },
  founderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${theme.colors.quaternary}20`,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.medium,
  },
  founderImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: theme.spacing.medium,
    borderWidth: 3,
    borderColor: `${theme.colors.textSecondary}10`,
  },
  founderInfo: {
    flex: 1,
  },
  founderName: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.small,
  },
  founderLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  founderLocationText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textSecondary,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
    marginVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.medium,
  },
  seasonScrollContainer: {
    paddingHorizontal: theme.spacing.medium,
    paddingBottom: theme.spacing.medium,
  },
  teamScrollContainer: {
    paddingHorizontal: theme.spacing.medium,
    paddingBottom: theme.spacing.medium,
  },
  seasonCard: {
    width: screenWidth * 0.7,
    backgroundColor: `${theme.colors.secondary}10`,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.medium,
    marginRight: theme.spacing.medium,
  },
  selectedSeasonCard: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  seasonTitle: {
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
    fontSize: 16,
  },
  seasonDetails: {
    fontFamily: theme.fonts.regular,
    color: theme.colors.textSecondary,
    fontSize: 14,
    marginTop: theme.spacing.small,
  },
  iconWithText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
