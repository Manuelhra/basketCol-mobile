import { StyleSheet } from 'react-native';

import { ITheme } from '../../config/theme/ITheme';
import { ThemeMode } from '../../store/redux/slices/theme/theme.slice';

export const getStyles = (theme: ITheme, themeMode: ThemeMode, ITEM_WIDTH?: number) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  // Hero Section Styles
  heroSection: {
    height: 500,
    width: '100%',
  },
  heroBackground: {
    flex: 1,
    width: '100%',
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: themeMode === 'light'
      ? 'rgba(156, 39, 176, 0.2)'
      : 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    padding: theme.spacing.xlarge,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    fontFamily: theme.fonts.heading,
    fontSize: 56,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: theme.spacing.medium,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  heroSubtitle: {
    fontFamily: theme.fonts.regular,
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: theme.spacing.xlarge,
  },
  authContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.medium,
    marginBottom: theme.spacing.xlarge,
    width: '100%',
  },
  signInButton: {
    backgroundColor: themeMode === 'light' ? 'rgba(255, 255, 255, 0.9)' : theme.colors.quaternary,
    paddingVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.xlarge,
    borderRadius: theme.borderRadius.medium,
    minWidth: 150,
    alignItems: 'center',
  },
  signInButtonText: {
    fontFamily: theme.fonts.bold,
    fontSize: 16,
    color: themeMode === 'light' ? theme.colors.quaternary : theme.colors.text,
  },
  welcomeContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: theme.spacing.large,
    paddingHorizontal: theme.spacing.xlarge,
    borderRadius: theme.borderRadius.large,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  welcomeLabel: {
    fontFamily: theme.fonts.regular,
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: theme.spacing.small,
  },
  userName: {
    fontFamily: theme.fonts.heading,
    fontSize: 28,
    color: theme.colors.quaternary,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  heroStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: theme.spacing.large,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: theme.fonts.heading,
    fontSize: 32,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: theme.fonts.regular,
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  statDivider: {
    height: 40,
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  // Features Section Styles
  featuresContainer: {
    padding: theme.spacing.large,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.large,
  },
  sectionDecoration: {
    width: 4,
    height: 24,
    backgroundColor: theme.colors.quaternary,
    marginRight: theme.spacing.medium,
    borderRadius: theme.borderRadius.small,
  },
  sectionTitle: {
    fontFamily: theme.fonts.heading,
    fontSize: 28,
    color: theme.colors.text,
  },
  featureContainer: {
    flexDirection: 'row',
    backgroundColor: themeMode === 'light'
      ? '#FFFFFF'
      : 'rgba(255,255,255,0.05)',
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.large,
    marginBottom: theme.spacing.medium,
    elevation: 2,
    shadowColor: theme.colors.quaternary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: themeMode === 'light'
      ? 'rgba(0,0,0,0.1)'
      : theme.colors.quaternary,
  },
  featureIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: themeMode === 'light'
      ? 'rgba(0, 102, 204, 0.1)'
      : 'rgba(0, 163, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.large,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  featureTitle: {
    fontFamily: theme.fonts.heading,
    fontSize: 20,
    color: theme.colors.text,
    marginBottom: theme.spacing.small,
  },
  featureDescription: {
    fontFamily: theme.fonts.regular,
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  // Coming Soon Section Styles
  comingSoonSection: {
    margin: theme.spacing.medium,
  },
  comingSoonBackground: {
    backgroundColor: themeMode === 'light'
      ? theme.colors.quaternary
      : 'rgba(0, 163, 255, 0.1)',
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.xlarge,
    borderWidth: 1,
    borderColor: theme.colors.quaternary,
  },
  comingSoonSectionTitle: {
    fontFamily: theme.fonts.heading,
    fontSize: 32,
    color: themeMode === 'light' ? '#FFFFFF' : theme.colors.text,
    marginBottom: theme.spacing.xlarge,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  comingSoonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  comingSoonContainer: {
    width: ITEM_WIDTH,
    backgroundColor: themeMode === 'light'
      ? 'rgba(255,255,255,0.15)'
      : 'rgba(255,255,255,0.05)',
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.large,
    alignItems: 'center',
    marginBottom: theme.spacing.medium,
    borderWidth: 1,
    borderColor: themeMode === 'light'
      ? 'rgba(255,255,255,0.3)'
      : theme.colors.quaternary,
  },
  comingSoonIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: themeMode === 'light'
      ? 'rgba(255,255,255,0.2)'
      : 'rgba(0, 163, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.medium,
  },
  comingSoonTitle: {
    fontFamily: theme.fonts.bold,
    fontSize: 16,
    color: themeMode === 'light' ? '#FFFFFF' : theme.colors.text,
    marginBottom: theme.spacing.small,
    textAlign: 'center',
  },
  comingSoonBadge: {
    backgroundColor: themeMode === 'light'
      ? 'rgba(255,255,255,0.2)'
      : 'rgba(0, 163, 255, 0.1)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: theme.borderRadius.small,
  },
  comingSoonText: {
    fontFamily: theme.fonts.regular,
    fontSize: 12,
    color: themeMode === 'light' ? '#FFFFFF' : theme.colors.quaternary,
  },
  // Developer Section Styles
  developerSection: {
    padding: theme.spacing.large,
    marginBottom: theme.spacing.xlarge,
  },
  developerCard: {
    backgroundColor: themeMode === 'light'
      ? '#FFFFFF'
      : 'rgba(255,255,255,0.05)',
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.xlarge,
    elevation: 5,
    shadowColor: theme.colors.quaternary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: themeMode === 'light'
      ? 'rgba(0,0,0,0.1)'
      : theme.colors.quaternary,
  },
  developerTitle: {
    fontFamily: theme.fonts.regular,
    fontSize: 18,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.large,
    textAlign: 'center',
  },
  developerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.large,
  },
  avatarContainer: {
    position: 'relative',
  },
  developerAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: theme.colors.quaternary,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.success,
    borderWidth: 3,
    borderColor: themeMode === 'light' ? '#FFFFFF' : '#121212',
  },
  developerTextContainer: {
    marginLeft: theme.spacing.large,
    flex: 1,
  },
  developerName: {
    fontFamily: theme.fonts.heading,
    fontSize: 24,
    color: theme.colors.text,
    marginBottom: 4,
  },
  developerHandle: {
    fontFamily: theme.fonts.regular,
    fontSize: 16,
    color: theme.colors.quaternary,
    marginBottom: 4,
  },
  developerRole: {
    fontFamily: theme.fonts.regular,
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  followButton: {
    backgroundColor: theme.colors.quaternary,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.medium,
    alignItems: 'center',
    marginTop: theme.spacing.medium,
  },
  followButtonText: {
    fontFamily: theme.fonts.bold,
    fontSize: 16,
    color: '#FFFFFF',
  },
});
