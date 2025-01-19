import { StyleSheet } from 'react-native';

import { ITheme } from '../../config/theme/ITheme';
import { ThemeMode } from '../../store/redux/slices/theme/theme.slice';

export const getStyles = (theme: ITheme, themeMode: ThemeMode, accentColor: string) => StyleSheet.create({
  wrapper: {
    width: '100%',
    overflow: 'hidden',
    borderRadius: theme.borderRadius.large,
    marginVertical: theme.spacing.medium,
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: themeMode === 'light'
      ? 'rgba(255, 255, 255, 0.95)'
      : 'rgba(18, 18, 18, 0.95)',
    borderWidth: 2,
    borderColor: accentColor,
    borderRadius: theme.borderRadius.large,
  },
  container: {
    padding: theme.spacing.large,
  },
  contentContainer: {
    alignItems: 'center',
    gap: theme.spacing.medium,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: themeMode === 'light'
      ? '#F5F5F5'
      : 'rgba(255, 255, 255, 0.1)',
    padding: theme.spacing.small,
    marginBottom: theme.spacing.small,
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  headerText: {
    fontFamily: theme.fonts.heading,
    fontSize: 28,
    color: accentColor,
    textAlign: 'center',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: theme.spacing.small,
  },
  subtitle: {
    fontFamily: theme.fonts.bold,
    fontSize: 20,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.small,
  },
  description: {
    fontFamily: theme.fonts.regular,
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: theme.spacing.medium,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: theme.spacing.medium,
    marginTop: theme.spacing.medium,
  },
  primaryButton: {
    backgroundColor: accentColor,
    paddingHorizontal: theme.spacing.large,
    paddingVertical: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
    minWidth: 120,
    shadowColor: accentColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: theme.spacing.large,
    paddingVertical: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
    minWidth: 120,
    borderWidth: 2,
    borderColor: accentColor,
  },
  fullWidthButton: {
    minWidth: '100%',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontFamily: theme.fonts.bold,
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  secondaryButtonText: {
    color: accentColor,
    fontFamily: theme.fonts.bold,
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
