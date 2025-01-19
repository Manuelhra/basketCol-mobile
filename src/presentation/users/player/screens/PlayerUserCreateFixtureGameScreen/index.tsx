import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import { BasketColLayout } from '../../../../shared/layout/BasketColLayout';
import { RootState } from '../../../../shared/store/redux/rootReducer';
import { FeedbackBannerComponent } from '../../../../shared/components/FeedbackBannerComponent';

export function PlayerUserCreateFixtureGameScreen() {
  const { theme, themeMode } = useSelector((state: RootState) => state.theme);

  return (
    <BasketColLayout>
      <View
        style={{
          padding: 15,
          backgroundColor: theme.colors.background,
        }}
      >
        <FeedbackBannerComponent
          theme={theme}
          themeMode={themeMode}
          subtitle="Modo PvP"
          description="El modo de juego Jugador vs Jugador (PvP) está actualmente en desarrollo y se habilitará en una próxima actualización de BasketCol."
          accentColor={theme.colors.quaternary}
          primaryAction={{
            label: 'Proximamente',
            onPress: () => {},
          }}
        />
      </View>
    </BasketColLayout>
  );
}
