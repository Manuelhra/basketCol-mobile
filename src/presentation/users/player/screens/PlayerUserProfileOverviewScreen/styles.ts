import { StyleSheet } from 'react-native';

import { ITheme } from '../../../../shared/config/theme/ITheme';
import { ThemeMode } from '../../../../shared/store/redux/slices/theme/theme.slice';

export const getStyles = (theme: ITheme, themeMode: ThemeMode) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
  },
  // Estilos de las estadísticas
  statsOverview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: theme.spacing.large,
    padding: theme.spacing.large,
    backgroundColor: themeMode === 'light'
      ? '#F8F8F8'
      : '#1A1A1A',
    borderRadius: theme.borderRadius.large,
    borderWidth: 1,
    borderColor: themeMode === 'light'
      ? 'rgba(0,0,0,0.1)'
      : 'rgba(255,255,255,0.1)',
  },
  statsCard: {
    width: '23%',
    aspectRatio: 1,
    backgroundColor: themeMode === 'light'
      ? theme.colors.primary
      : 'rgba(255,255,255,0.05)',
    borderRadius: theme.borderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.small,
    elevation: 5,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderWidth: 2,
    borderColor: theme.colors.accent,
  },
  statsValue: {
    color: themeMode === 'light'
      ? '#FFFFFF'
      : theme.colors.accent,
    fontFamily: theme.fonts.heading,
    fontSize: 20,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  statsTitle: {
    color: themeMode === 'light'
      ? theme.colors.accent
      : '#FFFFFF',
    fontFamily: theme.fonts.bold,
    fontSize: 12,
    marginTop: 4,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  // Estilos de los atributos
  attributesContainer: {
    backgroundColor: themeMode === 'light'
      ? '#F5F5F5'
      : 'rgba(255,255,255,0.05)',
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.large,
    elevation: 2,
  },
  categoryContainer: {
    marginBottom: theme.spacing.large,
  },
  categoryTitle: {
    color: theme.colors.text,
    fontFamily: theme.fonts.heading,
    fontSize: 20,
    marginBottom: theme.spacing.medium,
    textTransform: 'uppercase',
  },
  attributeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.small,
  },
  attributeLabel: {
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.regular,
    width: '30%',
    fontSize: 14,
    textTransform: 'capitalize',
  },
  barContainer: {
    flex: 1,
    height: 8,
    backgroundColor: themeMode === 'light'
      ? 'rgba(0,0,0,0.1)'
      : 'rgba(255,255,255,0.1)',
    borderRadius: theme.borderRadius.small,
    marginHorizontal: theme.spacing.medium,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: theme.borderRadius.small,
  },
  attributeValue: {
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
    width: '10%',
    textAlign: 'right',
    fontSize: 14,
  },
  // Estilos feedback cuando no hay atributos
  emptySectionContainer: {
    padding: theme.spacing.medium,
  },
  card: {
    backgroundColor: themeMode === 'light'
      ? '#F5F5F5'
      : 'rgba(255,255,255,0.08)',
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.xlarge,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.primary,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.large,
  },
  brandContainer: {
    marginBottom: theme.spacing.large,
    padding: theme.spacing.medium,
  },
  brandText: {
    fontFamily: theme.fonts.heading,
    fontSize: 29,
    color: theme.colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  title: {
    fontFamily: theme.fonts.heading,
    fontSize: 22,
    color: theme.colors.text,
    marginBottom: theme.spacing.medium,
    textAlign: 'center',
  },
  description: {
    fontFamily: theme.fonts.regular,
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.large,
    lineHeight: 24,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.large,
    paddingVertical: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: theme.fonts.bold,
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
