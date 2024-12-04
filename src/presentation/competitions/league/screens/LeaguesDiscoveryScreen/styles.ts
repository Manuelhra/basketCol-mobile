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
    padding: theme.spacing.medium,
    paddingBottom: theme.spacing.large,
  },
});
