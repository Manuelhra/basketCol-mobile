import React, { useEffect } from 'react';
import { View, Animated } from 'react-native';
import { useSelector } from 'react-redux';

import { getStyles } from './styles';
import { RootState } from '../../../../shared/store/redux/rootReducer';
import { BasketColLayout } from '../../../../shared/layout/BasketColLayout';

export function TeamOverviewScreenSkeleton(): React.JSX.Element {
  const { theme, themeMode } = useSelector((state: RootState) => state.theme);
  const styles = getStyles(theme, themeMode);

  // Create animated value for shimmer
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [fadeAnim]);

  return (
    <BasketColLayout>
      <Animated.View style={[
        styles.container,
        { opacity: fadeAnim },
      ]}
      >
        {/* Header Skeleton */}
        <Animated.View style={[
          styles.teamHeaderSkeleton,
          { opacity: fadeAnim },
        ]}
        >
          <View style={styles.teamLogoSkeleton} />
          <View style={styles.teamNameSkeleton} />
          <View style={styles.teamGenderSkeleton} />
        </Animated.View>

        {/* Stats Skeleton */}
        <Animated.View style={[
          styles.teamStatsSkeletonContainer,
          { opacity: fadeAnim },
        ]}
        >
          {Array.from({ length: 4 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
            <View key={index} style={styles.statBoxSkeleton} />
          ))}
        </Animated.View>

        {/* Roster Skeleton */}
        <View style={styles.teamRosterSkeleton}>
          <View style={styles.sectionTitleSkeleton} />
          <View style={styles.playerCardSkeletonGrid}>
            {Array.from({ length: 6 }).map((_, index) => (
              <Animated.View
              // eslint-disable-next-line react/no-array-index-key
                key={index}
                style={[
                  styles.playerCardSkeleton,
                  { opacity: fadeAnim },
                ]}
              />
            ))}
          </View>
        </View>
      </Animated.View>
    </BasketColLayout>
  );
}
