import { StyleSheet } from 'react-native';
import { ITheme } from '../../../../shared/config/theme/ITheme';
import { ThemeMode } from '../../../../shared/store/redux/slices/theme/theme.slice';

export const getStyles = (theme: ITheme, mode: ThemeMode) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
  },

  // Estilos de la tarjeta del jugador
  cardContainer: {
    borderRadius: theme.borderRadius.large,
    overflow: 'hidden',
    marginBottom: theme.spacing.large,
    height: 550,
    backgroundColor: mode === 'light'
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
  // Contenedor principal inferior (35% de la altura)
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
  // Contenedor flotante para posición y logo
  floatingContainer: {
    position: 'absolute',
    top: -30, // Ajusta esto para que flote más arriba o abajo
    left: '50%',
    transform: [{ translateX: -100 }], // La mitad del ancho del contenedor
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
  // Línea divisora vertical
  divider: {
    width: 2,
    height: '60%',
    backgroundColor: theme.colors.accent,
    marginHorizontal: theme.spacing.medium,
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
    fontSize: 21,
    letterSpacing: 2,
  },
  // Contenedor para el logo
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamLogo: {
    width: 40,
    height: 40,
    borderRadius: 23,
    borderWidth: 2,
    borderColor: theme.colors.accent,
  },
  // Contenedor para el nombre
  nameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 45, // Espacio para el contenedor flotante
  },
  firstName: {
    color: '#FFFFFF',
    fontFamily: theme.fonts.heading,
    fontSize: 24,
    letterSpacing: 3,
    textTransform: 'uppercase',
    textShadowColor: theme.colors.primary,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  lastName: {
    color: theme.colors.accent,
    fontFamily: theme.fonts.heading,
    fontSize: 36,
    letterSpacing: 4,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
  },

  // Estilos de las estadísticas
  statsOverview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: theme.spacing.large,
    padding: theme.spacing.large,
    backgroundColor: mode === 'light'
      ? '#F8F8F8'
      : '#1A1A1A',
    borderRadius: theme.borderRadius.large,
    borderWidth: 1,
    borderColor: mode === 'light'
      ? 'rgba(0,0,0,0.1)'
      : 'rgba(255,255,255,0.1)',
  },
  statsCard: {
    width: '23%',
    aspectRatio: 1,
    backgroundColor: mode === 'light'
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
    color: mode === 'light'
      ? '#FFFFFF'
      : theme.colors.accent,
    fontFamily: theme.fonts.heading,
    fontSize: 20,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  statsTitle: {
    color: mode === 'light'
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
    backgroundColor: mode === 'light'
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
    backgroundColor: mode === 'light'
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
});
