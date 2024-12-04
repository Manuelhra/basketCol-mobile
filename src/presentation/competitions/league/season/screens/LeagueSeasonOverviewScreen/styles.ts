import { StyleSheet, Dimensions } from 'react-native';

import { ITheme } from '../../../../../shared/config/theme/ITheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const getStyles = (theme: ITheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
    paddingHorizontal: theme.spacing.medium,
    marginVertical: theme.spacing.medium,
  },
  sectionSeparator: {
    height: 1,
    backgroundColor: theme.colors.textSecondary,
    marginVertical: theme.spacing.medium,
    opacity: 0.2,
  },
  headerContainer: {
    height: 250,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: theme.colors.primary, // Fondo base por si la imagen no carga
    position: 'relative',
    overflow: 'hidden',
  },
  headerBackground: {
    position: 'absolute', // Absoluto para ocupar el fondo
    height: '100%',
    width: '100%',
    resizeMode: 'cover', // Asegura que la imagen se ajuste al contenedor sin deformarse
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject, // Ocupa todo el espacio del contenedor
    backgroundColor: `${theme.colors.textSecondary}50`, // Overlay semitransparente
  },

  leagueName: {
    fontSize: 32, // Tamaño ajustado para visibilidad
    fontFamily: theme.fonts.bold,
    color: theme.colors.background,
    textAlign: 'center',
    marginBottom: theme.spacing.large,
    textShadowColor: 'rgba(0, 0, 0, 0.7)', // Mayor contraste para texto
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  seasonDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: theme.spacing.large,
    marginBottom: theme.spacing.large,
  },
  seasonDetails: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.background,
    textAlign: 'center',
  },
  seasonStatusBadge: {
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.small / 2,
    borderRadius: theme.borderRadius.medium,
    backgroundColor: theme.colors.secondary,
  },
  seasonStatusText: {
    color: theme.colors.background,
    fontFamily: theme.fonts.bold,
    fontSize: 14,
    textAlign: 'center',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    width: SCREEN_WIDTH,
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  modalCloseButton: {
    padding: theme.spacing.medium,
    alignSelf: 'flex-start',
  },

  // Carousel Container
  carouselContainer: {
    marginVertical: theme.spacing.medium,
  },
  carouselNavButton: {
    padding: theme.spacing.small,
  },

  // Fixture Card Styles
  fixtureCard: {
    width: SCREEN_WIDTH * 0.7,
    marginHorizontal: theme.spacing.small,
    borderRadius: theme.borderRadius.large,
    elevation: 3,
    shadowColor: theme.colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  fixtureCardContent: {
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.large,
    alignItems: 'center',
  },
  fixtureCardTitle: {
    color: theme.colors.background,
    fontFamily: theme.fonts.bold,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: theme.spacing.small,
  },
  fixtureCardDate: {
    color: theme.colors.background,
    fontFamily: theme.fonts.regular,
    fontSize: 14,
  },

  // MVP Card Styles
  mvpCard: {
    width: SCREEN_WIDTH * 0.6,
    height: 350,
    marginHorizontal: theme.spacing.small,
    borderRadius: theme.borderRadius.large,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: theme.colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
