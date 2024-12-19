import React, { useEffect } from 'react';
import { View, Animated } from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { getStyles } from '../styles';
import { LinearGradientComponent } from '../LinearGradientComponent';
import { BasketColLayout } from '../../../../../../../shared/layout/BasketColLayout';
import { RootState } from '../../../../../../../shared/store/redux/rootReducer';

export function LeagueSeasonFixtureOverviewScreenSkeleton(): React.JSX.Element {
  const { theme, themeMode } = useSelector((state: RootState) => state.theme);
  const styles = getStyles(theme, themeMode);
  const insets = useSafeAreaInsets();

  // Create animated value for shimmer effect
  const shimmerAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [shimmerAnim]);

  return (
    <BasketColLayout>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.headerContainer}>
          <LinearGradientComponent
            colors={[
              theme.colors.primary,
              theme.colors.secondary,
              theme.colors.quaternary,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerGradient}
          >
            <View style={styles.headerContentContainer}>
              {/* Back button skeleton */}
              <Animated.View
                style={[
                  styles.backButton,
                  { opacity: shimmerAnim },
                ]}
              />

              {/* Date info skeleton */}
              <View style={styles.dateInfoContainer}>
                <Animated.View
                  style={[
                    {
                      width: 80, height: 16, backgroundColor: theme.colors.background, borderRadius: 4,
                    },
                    { opacity: shimmerAnim },
                  ]}
                />
                <Animated.View
                  style={[
                    {
                      width: 120, height: 24, backgroundColor: theme.colors.background, borderRadius: 4, marginVertical: theme.spacing.small,
                    },
                    { opacity: shimmerAnim },
                  ]}
                />
                <Animated.View
                  style={[
                    styles.leagueTagContainer,
                    { width: 100, height: 30 },
                    { opacity: shimmerAnim },
                  ]}
                />
              </View>

              {/* Header meta skeleton */}
              <View style={styles.headerMetaContainer}>
                <Animated.View
                  style={[
                    styles.matchCountBadge,
                    { width: 80, height: 30 },
                    { opacity: shimmerAnim },
                  ]}
                />
                <Animated.View
                  style={[
                    {
                      width: 24, height: 24, backgroundColor: theme.colors.background, borderRadius: 12,
                    },
                    { opacity: shimmerAnim },
                  ]}
                />
              </View>
            </View>
          </LinearGradientComponent>

          <View style={styles.headerCurve} />
        </View>

        {/* Match cards skeleton */}
        <Animated.ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {Array.from({ length: 4 }).map((number) => (
            <Animated.View
              key={`${number} - ${Math.random()}`}
              style={[
                styles.matchCard,
                { opacity: shimmerAnim },
              ]}
            >
              <View style={styles.matchCardContent}>
                {/* Home team skeleton */}
                <View style={styles.teamContainer}>
                  <Animated.View
                    style={[
                      {
                        width: 80, height: 80, backgroundColor: theme.colors.textSecondary, borderRadius: 40,
                      },
                      { opacity: shimmerAnim },
                    ]}
                  />
                  <Animated.View
                    style={[
                      {
                        width: 100, height: 16, backgroundColor: theme.colors.textSecondary, borderRadius: 4, marginTop: theme.spacing.small,
                      },
                      { opacity: shimmerAnim },
                    ]}
                  />
                </View>

                {/* Match details skeleton */}
                <View style={styles.matchDetailsContainer}>
                  <Animated.View
                    style={[
                      {
                        width: 40, height: 18, backgroundColor: theme.colors.textSecondary, borderRadius: 4,
                      },
                      { opacity: shimmerAnim },
                    ]}
                  />
                  <Animated.View
                    style={[
                      {
                        width: 60, height: 14, backgroundColor: theme.colors.textSecondary, borderRadius: 4, marginVertical: theme.spacing.small,
                      },
                      { opacity: shimmerAnim },
                    ]}
                  />
                  <Animated.View
                    style={[
                      {
                        width: 50, height: 16, backgroundColor: theme.colors.textSecondary, borderRadius: 4,
                      },
                      { opacity: shimmerAnim },
                    ]}
                  />
                </View>

                {/* Away team skeleton */}
                <View style={styles.teamContainer}>
                  <Animated.View
                    style={[
                      {
                        width: 80, height: 80, backgroundColor: theme.colors.textSecondary, borderRadius: 40,
                      },
                      { opacity: shimmerAnim },
                    ]}
                  />
                  <Animated.View
                    style={[
                      {
                        width: 100, height: 16, backgroundColor: theme.colors.textSecondary, borderRadius: 4, marginTop: theme.spacing.small,
                      },
                      { opacity: shimmerAnim },
                    ]}
                  />
                </View>
              </View>
            </Animated.View>
          ))}
        </Animated.ScrollView>
      </View>
    </BasketColLayout>
  );
}
