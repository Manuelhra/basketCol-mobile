import { StyleSheet } from 'react-native';

import { ITheme } from '../../../../shared/config/theme/ITheme';

export const getStyles = (theme: ITheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    width: '100%', // Asegura que ocupe todo el ancho
    maxWidth: 600, // Limita el ancho máximo
    paddingHorizontal: theme.spacing.medium,
    paddingBottom: theme.spacing.large,
  },
  scrollViewContent: {
    alignItems: 'center', // Centra los elementos dentro del ScrollView
  },
});
