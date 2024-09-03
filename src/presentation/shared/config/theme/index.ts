import { ITheme } from './ITheme';

const lightTheme: ITheme = {
  colors: {
    primary: '#007AFF',
    background: '#FFFFFF',
    text: '#000000',
    secondary: '#5856D6',
    accent: '#FF2D55',
  },
  fonts: {
    regular: 'Roboto-Regular',
    bold: 'Roboto-Bold',
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
};

const darkTheme: ITheme = {
  colors: {
    primary: '#0A84FF',
    background: '#000000',
    text: '#FFFFFF',
    secondary: '#5E5CE6',
    accent: '#FF375F',
  },
  fonts: {
    regular: 'Roboto-Regular',
    bold: 'Roboto-Bold',
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
};

export { lightTheme, darkTheme };
