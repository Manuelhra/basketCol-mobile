import { StyleSheet } from 'react-native';

import { ITheme } from '../../../../shared/config/theme/ITheme';
import { ThemeMode } from '../../../../shared/store/redux/slices/theme/theme.slice';

export const getStyles = (theme: ITheme, themeMode: ThemeMode, isSmall: boolean = false) => StyleSheet.create({
  cardContainer: {
    borderRadius: theme.borderRadius.large,
    overflow: 'hidden',
    marginBottom: theme.spacing.large,
    height: isSmall ? 350 : 550,
    backgroundColor: themeMode === 'light'
      ? '#000000'
      : '#1A1A1A',
    elevation: 10,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  currentUserCard: {
    borderColor: theme.colors.accent,
    borderWidth: 2,
  },
  playerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0.85,
  },
  // Contenedor principal inferior (35% de la altura)
  bottomInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '25%',
    backgroundColor: 'rgba(0,0,0,0.78)',
    paddingHorizontal: isSmall ? theme.spacing.small : theme.spacing.large,
    paddingBottom: isSmall ? theme.spacing.small : theme.spacing.large,
  },
  // Contenedor flotante para posición y logo
  floatingContainer: {
    position: 'absolute',
    top: isSmall ? -20 : -30, // Ajusta esto para que flote más arriba o abajo
    left: '50%',
    transform: [{ translateX: isSmall ? -80 : -100 }], // La mitad del ancho del contenedor
    width: isSmall ? 160 : 200,
    height: isSmall ? 50 : 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
    borderRadius: isSmall ? theme.borderRadius.medium : theme.borderRadius.large,
    borderWidth: 1,
    borderColor: theme.colors.accent,
  },
  // Línea divisora vertical
  divider: {
    width: 2,
    height: '60%',
    backgroundColor: theme.colors.accent,
    marginHorizontal: isSmall ? theme.spacing.small : theme.spacing.medium,
  },
  // Contenedor para la posición
  positionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  positionText: {
    color: '#FFFFFF',
    fontFamily: theme.fonts.bold,
    fontSize: isSmall ? 14 : 21,
    letterSpacing: isSmall ? 1 : 2,
  },
  // Contenedor para el logo
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamLogo: {
    width: isSmall ? 25 : 40,
    height: isSmall ? 25 : 40,
    borderRadius: isSmall ? 12.5 : 23,
    borderWidth: isSmall ? 1 : 2,
    borderColor: theme.colors.accent,
  },
  // Contenedor para el nombre
  nameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: isSmall ? 30 : 45, // Espacio para el contenedor flotante
  },
  firstName: {
    color: '#FFFFFF',
    fontFamily: theme.fonts.heading,
    fontSize: isSmall ? 12 : 24,
    letterSpacing: isSmall ? 1 : 3,
    textTransform: 'uppercase',
    textShadowColor: theme.colors.primary,
    textShadowOffset: isSmall ? { width: 1, height: 1 } : { width: 2, height: 2 },
    textShadowRadius: isSmall ? 1 : 4,
  },
  lastName: {
    color: theme.colors.accent,
    fontFamily: theme.fonts.heading,
    fontSize: isSmall ? 14 : 36,
    letterSpacing: isSmall ? 2 : 4,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: isSmall ? { width: 1, height: 1 } : { width: 2, height: 2 },
    textShadowRadius: isSmall ? 2 : 6,
  },
  currentUserBadge: {
    position: 'absolute',
    top: isSmall ? -55 : -10,
    backgroundColor: theme.colors.accent,
    paddingHorizontal: theme.spacing.small,
    paddingVertical: theme.spacing.small / 2,
    borderRadius: theme.borderRadius.small,
  },
  currentUserBadgeText: {
    fontSize: isSmall ? 6 : 8,
    fontFamily: theme.fonts.bold,
    color: theme.colors.background,
  },
});
