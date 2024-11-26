import React from 'react';
import { Animated, View } from 'react-native';

import { getStyles } from '../styles';
import { ITheme } from '../../../../../shared/config/theme/ITheme';
import { ThemeMode } from '../../../../../shared/store/redux/slices/theme/theme.slice';

type SkeletonCardProps = {
  theme: ITheme;
  mode: ThemeMode;
  fadeAnim: Animated.Value;
};

export function SkeletonCard({
  theme,
  mode,
  fadeAnim,
}: SkeletonCardProps): React.JSX.Element {
  const styles = getStyles(theme, mode);

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        {
          backgroundColor: 'rgba(0,0,0,0.1)',
          opacity: fadeAnim,
        },
      ]}
    >
      {/* Skeleton de imagen de jugador */}
      <Animated.View
        style={[
          styles.playerImage,
          {
            backgroundColor: 'rgba(0,0,0,0.2)',
            opacity: fadeAnim,
          },
        ]}
      />

      {/* Contenedor inferior del skeleton */}
      <Animated.View
        style={[
          styles.bottomInfoContainer,
          {
            backgroundColor: 'rgba(0,0,0,0.5)',
            opacity: fadeAnim,
          },
        ]}
      >
        {/* Contenedor flotante skeleton */}
        <Animated.View
          style={[
            styles.floatingContainer,
            {
              backgroundColor: 'rgba(0,0,0,0.7)',
              opacity: fadeAnim,
            },
          ]}
        >
          {/* Skeleton de posición */}
          <View
            style={[
              styles.positionContainer,
              {
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: 20,
                width: 40,
                height: 40,
              },
            ]}
          />

          <View style={styles.divider} />

          {/* Skeleton de logo */}
          <View
            style={[
              styles.logoContainer,
              {
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: 20,
                width: 40,
                height: 40,
              },
            ]}
          />
        </Animated.View>

        {/* Skeleton de nombre */}
        <View style={styles.nameContainer}>
          <Animated.View
            style={{
              width: '60%',
              height: 30,
              backgroundColor: 'rgba(255,255,255,0.2)',
              marginBottom: 10,
              opacity: fadeAnim,
            }}
          />
          <Animated.View
            style={{
              width: '40%',
              height: 40,
              backgroundColor: 'rgba(255,255,255,0.2)',
              opacity: fadeAnim,
            }}
          />
        </View>
      </Animated.View>
    </Animated.View>
  );
}
