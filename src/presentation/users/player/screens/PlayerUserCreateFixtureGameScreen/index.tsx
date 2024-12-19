import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';

import { BasketColLayout } from '../../../../shared/layout/BasketColLayout';
import { RootState } from '../../../../shared/store/redux/rootReducer';

const { width, height } = Dimensions.get('window');

export function PlayerUserCreateFixtureGameScreen() {
  const { theme, themeMode } = useSelector((state: RootState) => state.theme);

  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      width: '100%',
      height,
      position: 'absolute',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    },
    backgroundOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      backgroundColor: themeMode === 'light'
        ? 'rgba(0, 102, 204, 0.05)'
        : 'rgba(0, 163, 255, 0.1)',
      zIndex: 0,
    },
    contentContainer: {
      width: width * 0.85,
      backgroundColor: themeMode === 'light'
        ? 'rgba(255,255,255,0.8)'
        : 'rgba(18,18,18,0.7)',
      borderRadius: theme.borderRadius.large,
      padding: theme.spacing.large,
      alignItems: 'center',
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
      borderWidth: 1,
      borderColor: theme.colors.accent,
    },
    logoContainer: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing.medium,
      overflow: 'hidden',
      borderWidth: 3,
      borderColor: theme.colors.accent,
    },
    basketcolLogo: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    basketcolName: {
      fontSize: 24,
      fontFamily: theme.fonts.heading,
      color: theme.colors.primary,
      textTransform: 'uppercase',
      letterSpacing: 2,
      marginTop: theme.spacing.small,
    },
    title: {
      fontSize: 28,
      fontFamily: theme.fonts.heading,
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: theme.spacing.medium,
      textTransform: 'uppercase',
      letterSpacing: 2,
    },
    subtitle: {
      fontSize: 16,
      fontFamily: theme.fonts.regular,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: theme.spacing.medium,
      paddingHorizontal: theme.spacing.medium,
    },
    betaTag: {
      backgroundColor: theme.colors.quaternary,
      paddingHorizontal: theme.spacing.medium,
      paddingVertical: theme.spacing.small,
      borderRadius: theme.borderRadius.medium,
    },
    betaTagText: {
      color: theme.colors.background,
      fontFamily: theme.fonts.bold,
      fontSize: 14,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
  });

  return (
    <BasketColLayout>
      <View style={styles.wrapper}>
        <View style={styles.backgroundOverlay} />
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../../../shared/assets/images/logo-basketcol.jpeg')}
                style={styles.basketcolLogo}
              />
            </View>
            <Text style={styles.basketcolName}>BasketCol</Text>
            <Text style={styles.title}>Modo PvP</Text>
            <Text style={styles.subtitle}>
              El modo de juego Jugador vs Jugador (PvP) está actualmente en desarrollo
              y se habilitará en una próxima actualización de BasketCol.
            </Text>
            <View style={styles.betaTag}>
              <Text style={styles.betaTagText}>Próximamente</Text>
            </View>
          </View>
        </View>
      </View>
    </BasketColLayout>
  );
}
