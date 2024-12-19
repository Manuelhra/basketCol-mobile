import React from 'react';
import {
  View,
  Animated,
  Dimensions,
} from 'react-native';

import { ITheme } from '../../../../../../shared/config/theme/ITheme';
import { BasketColLayout } from '../../../../../../shared/layout/BasketColLayout';
import { getStyles } from '../styles';
import { PlayerUserCardComponentSkeleton } from '../../../../../../users/player/components/PlayerUserCardComponent/PlayerUserCardComponentSkeleton';
import { ThemeMode } from '../../../../../../shared/store/redux/slices/theme/theme.slice';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type LeagueSeasonOverviewScreenSkeletonProps = {
  theme: ITheme;
  themeMode: ThemeMode;
  fadeAnim: Animated.Value;
};

export function LeagueSeasonOverviewScreenSkeleton({
  theme,
  themeMode,
  fadeAnim,
}: LeagueSeasonOverviewScreenSkeletonProps): React.JSX.Element {
  const styles = getStyles(theme);

  // eslint-disable-next-line react/no-unstable-nested-components
  function SkeletonFixtureCard() {
    return (
      <Animated.View
        style={[
          styles.fixtureCard,
          {
            width: SCREEN_WIDTH * 0.7,
            opacity: fadeAnim,
            backgroundColor: 'rgba(0,0,0,0.1)',
          },
        ]}
      >
        <View
          style={[
            styles.fixtureCardContent,
            { backgroundColor: 'rgba(0,0,0,0.2)' },
          ]}
        >
          <Animated.View
            style={{
              width: '80%',
              height: 20,
              backgroundColor: 'rgba(255,255,255,0.2)',
              marginBottom: 10,
              opacity: fadeAnim,
            }}
          />
          <Animated.View
            style={{
              width: '50%',
              height: 15,
              backgroundColor: 'rgba(255,255,255,0.2)',
              opacity: fadeAnim,
            }}
          />
        </View>
      </Animated.View>
    );
  }

  return (
    <BasketColLayout
      rightIcons={[
        {
          icon: 'calendar',
          action: () => {},
        },
      ]}
    >
      <Animated.ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Skeleton */}
        <Animated.View
          style={[
            styles.headerContainer,
            {
              backgroundColor: 'rgba(0,0,0,0.1)',
              opacity: fadeAnim,
            },
          ]}
        >
          <Animated.View
            style={{
              width: '80%',
              height: 40,
              backgroundColor: 'rgba(255,255,255,0.2)',
              marginBottom: 20,
              opacity: fadeAnim,
            }}
          />
          <Animated.View
            style={{
              width: '60%',
              height: 30,
              backgroundColor: 'rgba(255,255,255,0.2)',
              opacity: fadeAnim,
            }}
          />
        </Animated.View>

        {/* Fixtures Carousel Skeleton */}
        <View style={styles.carouselContainer}>
          <Animated.View
            style={{
              width: '50%',
              height: 25,
              backgroundColor: 'rgba(0,0,0,0.2)',
              marginBottom: 10,
              marginHorizontal: theme.spacing.medium,
              opacity: fadeAnim,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: theme.spacing.medium,
            }}
          >
            {[1, 2, 3].map((number) => (
              <SkeletonFixtureCard key={number} />
            ))}
          </View>
        </View>

        {/* MVPs Carousel Skeleton */}
        <View style={styles.carouselContainer}>
          <Animated.View
            style={{
              width: '50%',
              height: 25,
              backgroundColor: 'rgba(0,0,0,0.2)',
              marginBottom: 10,
              marginHorizontal: theme.spacing.medium,
              opacity: fadeAnim,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: theme.spacing.medium,
            }}
          >
            {[1, 2, 3].map((number) => (
              <PlayerUserCardComponentSkeleton
                key={number}
                fadeAnim={fadeAnim}
                theme={theme}
                themeMode={themeMode}
              />
            ))}
          </View>
        </View>
      </Animated.ScrollView>
    </BasketColLayout>
  );
}
