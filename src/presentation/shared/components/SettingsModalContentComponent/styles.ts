import { StyleSheet } from 'react-native';
import { ITheme } from '../../config/theme/ITheme';

export const getStyles = (theme: ITheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingVertical: theme.spacing.medium,
  },
  categoryContainer: {
    marginBottom: theme.spacing.medium,
    backgroundColor: theme.colors.background,
    paddingBottom: theme.spacing.medium,
    borderBottomWidth: 3.5,
    borderBottomColor: theme.colors.divider,
  },
  categoryTitle: {
    fontSize: 12.5,
    color: theme.colors.textSecondary,
    paddingHorizontal: theme.spacing.medium,
    paddingBottom: theme.spacing.small,
    fontFamily: theme.fonts.regular,
  },
  lastCategoryContainer: {
    borderBottomWidth: 0,
  },
  subcategoriesContainer: {
    backgroundColor: theme.colors.background,
  },
  subcategoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.medium,
  },
  icon: {
    marginRight: theme.spacing.medium,
  },
  subcategoryTitle: {
    fontSize: 14,
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
  },
  subcategoryContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeSubcategory: {
    backgroundColor: theme.colors.backgroundSelected,
  },
  disabledSubcategory: {
    opacity: 0.7,
  },
  disabledText: {
    color: theme.colors.textDisabled,
  },
  loader: {
    marginLeft: theme.spacing.small,
  },
});
