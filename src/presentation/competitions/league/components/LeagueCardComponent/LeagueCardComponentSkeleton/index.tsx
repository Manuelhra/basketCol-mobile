import React from 'react';
import {
  View,
  Dimensions,
  Animated,
} from 'react-native';

import { getStyles } from '../styles';
import { ITheme } from '../../../../../shared/config/theme/ITheme';
import { ThemeMode } from '../../../../../shared/store/redux/slices/theme/theme.slice';

type LeagueCardSkeletonProps = {
  theme: ITheme;
  themeMode: ThemeMode;
  fadeAnim: Animated.Value;
  isSmall?: boolean;
};

export function LeagueCardComponentSkeleton({
  theme,
  themeMode,
  fadeAnim,
  isSmall = false,
}: LeagueCardSkeletonProps): React.JSX.Element {
  const styles = getStyles(theme, themeMode, isSmall);
  const screenWidth = Dimensions.get('window').width;

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        {
          width: screenWidth - (theme.spacing.large * 2),
          marginHorizontal: theme.spacing.large,
          opacity: fadeAnim,
          backgroundColor: 'rgba(0,0,0,0.1)',
        },
      ]}
    >
      {/* Floating Logo Skeleton */}
      <Animated.View
        style={[
          styles.floatingLogoContainer,
          {
            backgroundColor: 'rgba(0,0,0,0.7)',
            opacity: fadeAnim,
          },
        ]}
      />

      {/* League Level Badge Skeleton */}
      <Animated.View
        style={[
          styles.leagueLevelBadge,
          {
            backgroundColor: 'rgba(255,255,255,0.2)',
            opacity: fadeAnim,
          },
        ]}
      />

      {/* Info Container Skeleton */}
      <Animated.View
        style={[
          styles.infoContainer,
          {
            backgroundColor: 'rgba(0,0,0,0.5)',
            opacity: fadeAnim,
          },
        ]}
      >
        {/* League Name Skeleton */}
        <Animated.View
          style={{
            width: '70%',
            height: isSmall ? 20 : 30,
            backgroundColor: 'rgba(255,255,255,0.2)',
            marginBottom: theme.spacing.small,
            opacity: fadeAnim,
          }}
        />

        {/* League Description Skeleton */}
        <Animated.View
          style={{
            width: '90%',
            height: isSmall ? 15 : 20,
            backgroundColor: 'rgba(255,255,255,0.2)',
            marginBottom: theme.spacing.medium,
            opacity: fadeAnim,
          }}
        />

        {/* Additional Info Skeleton */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {/* First Info Item */}
          <View style={{ width: '40%' }}>
            <Animated.View
              style={{
                width: '70%',
                height: 10,
                backgroundColor: 'rgba(255,255,255,0.2)',
                marginBottom: theme.spacing.small,
                opacity: fadeAnim,
              }}
            />
            <Animated.View
              style={{
                width: '100%',
                height: isSmall ? 15 : 20,
                backgroundColor: 'rgba(255,255,255,0.2)',
                opacity: fadeAnim,
              }}
            />
          </View>

          {/* Second Info Item */}
          <View style={{ width: '40%' }}>
            <Animated.View
              style={{
                width: '70%',
                height: 10,
                backgroundColor: 'rgba(255,255,255,0.2)',
                marginBottom: theme.spacing.small,
                opacity: fadeAnim,
              }}
            />
            <Animated.View
              style={{
                width: '100%',
                height: isSmall ? 15 : 20,
                backgroundColor: 'rgba(255,255,255,0.2)',
                opacity: fadeAnim,
              }}
            />
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
}
