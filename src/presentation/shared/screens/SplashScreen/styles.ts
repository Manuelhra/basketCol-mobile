import { StyleSheet } from 'react-native';

import { ITheme } from '../../config/theme/ITheme';

export const getStyles = (appTheme: ITheme) => StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Filtro oscuro para que el texto resalte
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: appTheme.colors.accent,
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 40,
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: '500',
  },
  progressBarContainer: {
    width: '80%',
    maxWidth: 400,
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: appTheme.colors.secondary,
  },
  loadingText: {
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 20,
  },
});
