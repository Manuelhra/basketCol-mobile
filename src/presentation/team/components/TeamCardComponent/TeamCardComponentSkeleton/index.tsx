import React from 'react';
import { Animated, View } from 'react-native';

import { getStyles } from '../styles';
import { ITheme } from '../../../../shared/config/theme/ITheme';
import { ThemeMode } from '../../../../shared/store/redux/slices/theme/theme.slice';

type TeamCardComponentSkeletonProps = {
  appTheme: ITheme;
  themeMode: ThemeMode;
  fadeAnim: Animated.Value;
  isSmall?: boolean;
};

export function TeamCardComponentSkeleton({
  appTheme,
  themeMode,
  fadeAnim,
  isSmall = false,
}: TeamCardComponentSkeletonProps): React.JSX.Element {
  const styles = getStyles(appTheme, themeMode, isSmall);

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
      {/* Skeleton Background Image */}
      <Animated.View
        style={[
          styles.backgroundImage,
          {
            backgroundColor: 'rgba(0,0,0,0.2)',
            opacity: fadeAnim,
          },
        ]}
      />

      <Animated.View
        style={[
          styles.overlay,
          {
            backgroundColor: 'rgba(0,0,0,0.6)',
            opacity: fadeAnim,
          },
        ]}
      />

      {/* Team Logo Skeleton */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            backgroundColor: 'rgba(0,0,0,0.7)',
            opacity: fadeAnim,
          },
        ]}
      >
        <View
          style={{
            width: 80,
            height: 80,
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: 40,
          }}
        />
      </Animated.View>

      {/* Team Name Skeleton */}
      <View style={styles.teamNameContainer}>
        <Animated.View
          style={{
            width: '60%',
            height: 25,
            backgroundColor: 'rgba(255,255,255,0.2)',
            marginBottom: 10,
            opacity: fadeAnim,
          }}
        />
        <Animated.View
          style={{
            width: '40%',
            height: 20,
            backgroundColor: 'rgba(255,255,255,0.2)',
            opacity: fadeAnim,
          }}
        />
      </View>

      {/* Team Stats Skeleton */}
      <View style={styles.statsContainer}>
        <Animated.View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.7)',
            paddingHorizontal: appTheme.spacing.small,
            paddingVertical: appTheme.spacing.small / 2,
            borderRadius: appTheme.borderRadius.medium,
            opacity: fadeAnim,
          }}
        >
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor: 'rgba(255,255,255,0.2)',
              marginRight: appTheme.spacing.small,
            }}
          />
          <View
            style={{
              width: 60,
              height: 15,
              backgroundColor: 'rgba(255,255,255,0.2)',
            }}
          />
        </Animated.View>

        <Animated.View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.7)',
            paddingHorizontal: appTheme.spacing.small,
            paddingVertical: appTheme.spacing.small / 2,
            borderRadius: appTheme.borderRadius.medium,
            opacity: fadeAnim,
          }}
        >
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor: 'rgba(255,255,255,0.2)',
              marginRight: appTheme.spacing.small,
            }}
          />
          <View
            style={{
              width: 60,
              height: 15,
              backgroundColor: 'rgba(255,255,255,0.2)',
            }}
          />
        </Animated.View>
      </View>
    </Animated.View>
  );
}
