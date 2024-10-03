import { ITheme } from './ITheme';

const lightTheme: ITheme = {
  colors: {
    primary: '#0066CC', // Azul vibrante
    secondary: '#FF6600', // Naranja brillante
    accent: '#FFCC00', // Amarillo intenso
    background: '#FFFFFF',
    text: '#000000',
    textSecondary: '#555555',
    success: '#00CC66', // Verde brillante
    error: '#FF3333', // Rojo intenso
    warning: '#FF9900', // Naranja advertencia
  },
  fonts: {
    regular: 'Roboto-Regular',
    bold: 'Roboto-Bold',
    heading: 'Oswald-Bold', // Fuente más deportiva para títulos
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
    xlarge: 32,
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 16,
  },
};

const darkTheme: ITheme = {
  colors: {
    primary: '#00A3FF', // Azul neón
    secondary: '#FF8000', // Naranja brillante
    accent: '#FFD700', // Dorado
    background: '#121212',
    text: '#FFFFFF',
    textSecondary: '#BBBBBB',
    success: '#00FF7F', // Verde neón
    error: '#FF4444', // Rojo neón
    warning: '#FFA500', // Naranja advertencia
  },
  fonts: {
    regular: 'Roboto-Regular',
    bold: 'Roboto-Bold',
    heading: 'Oswald-Bold', // Fuente más deportiva para títulos
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
    xlarge: 32,
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 16,
  },
};

export { lightTheme, darkTheme };
