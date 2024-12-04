import { StyleSheet } from 'react-native';

import { ITheme } from '../../config/theme/ITheme';

export const getStyles = (theme: ITheme, screenWidth: number) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    width: screenWidth,
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.background,
  },
  headerTitle: {
    flex: 1,
    marginLeft: theme.spacing.medium,
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
  },
});
