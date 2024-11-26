import { StyleSheet } from 'react-native';

import { ITheme } from '../../../../shared/config/theme/ITheme';

export const getStyles = (appTheme: ITheme) => StyleSheet.create({
  createFixtureContainer: {
    position: 'absolute',
    bottom: -10, // Ajusta este valor según necesites
    alignItems: 'center',
    justifyContent: 'center',
    width: 80, // Ajusta el tamaño según tus necesidades
    height: 80, // Ajusta el tamaño según tus necesidades
    borderRadius: 40, // La mitad del ancho/alto para hacerlo circular
    backgroundColor: appTheme.colors.background, // Usa un color secundario de tu tema
  },
  createFixtureIcon: {
    fontSize: 50, // Tamaño del ícono
  },
});
