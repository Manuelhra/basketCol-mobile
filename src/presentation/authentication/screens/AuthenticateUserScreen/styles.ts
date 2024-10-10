import { StyleSheet } from 'react-native';

import { ITheme } from '../../../shared/config/theme/ITheme';

export const getStyles = (appTheme: ITheme) => StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  glassContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: appTheme.colors.primary,
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  input: {
    width: '100%',
    marginBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  button: {
    width: '100%',
    marginTop: 20,
  },
  buttonLabel: {
    fontSize: 18,
  },
  forgotPassword: {
    marginTop: 15,
    color: appTheme.colors.secondary,
  },
  glassPane: {
    ...StyleSheet.absoluteFillObject,
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  glassPaneInner: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  glassPaneBorder: {
    ...StyleSheet.absoluteFillObject,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    borderRadius: 20,
  },
  selectContainer: {
    width: '100%',
    marginBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: appTheme.colors.primary,
  },
  selectText: {
    color: appTheme.colors.text,
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  selectIcon: {
    position: 'absolute',
    right: 10,
    top: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: appTheme.colors.background,
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    // borderBottomColor: appTheme.colors.disabled,
  },
  modalOptionText: {
    color: appTheme.colors.text,
    fontSize: 16,
  },
  errorContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    borderRadius: 4,
    padding: 10,
    marginBottom: 15,
  },
  errorText: {
    color: appTheme.colors.error,
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'center',
  },
});
