import { StyleSheet } from 'react-native';

import { ITheme } from '../../config/theme/ITheme';

export const getStyles = (theme: ITheme) => StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.medium,
  },
  modalContainer: {
    width: '90%',
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.large,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'relative',
  },
  closeIconContainer: {
    position: 'absolute',
    top: theme.spacing.small,
    right: theme.spacing.small,
    zIndex: 10,
  },
  errorIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.medium,
  },
  messageText: {
    fontFamily: theme.fonts.regular,
    color: theme.colors.text,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: theme.spacing.large,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.small,
    paddingHorizontal: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
    flex: 1,
    marginRight: theme.spacing.small,
  },
  primaryButtonText: {
    fontFamily: theme.fonts.bold,
    color: theme.colors.background,
    textAlign: 'center',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: theme.colors.error,
    paddingVertical: theme.spacing.small,
    paddingHorizontal: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
    flex: 1,
    marginLeft: theme.spacing.small,
  },
  secondaryButtonText: {
    fontFamily: theme.fonts.bold,
    color: theme.colors.background,
    textAlign: 'center',
    fontSize: 16,
  },
});
