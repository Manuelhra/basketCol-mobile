import React from 'react';
import { Animated, View, ScrollView } from 'react-native';

import { getStyles } from '../styles';
import { ITheme } from '../../../../../shared/config/theme/ITheme';
import { BasketColLayout } from '../../../../../shared/layout/BasketColLayout';
import { TeamCardComponentSkeleton } from '../../../../../team/components/TeamCardComponent/TeamCardComponentSkeleton';

type LeagueOverviewScreenSkeletonProps = {
  theme: ITheme;
  width: number;
  fadeAnim: Animated.Value;
};

export function LeagueOverviewScreenSkeleton({
  theme,
  width,
  fadeAnim,
}: LeagueOverviewScreenSkeletonProps): React.JSX.Element {
  const styles = getStyles(theme, width);

  const renderSeasonCardSkeleton = (index: number) => (
    <Animated.View
      key={`season-${index}`}
      style={[
        styles.seasonCard,
        {
          backgroundColor: 'rgba(0,0,0,0.1)',
          opacity: fadeAnim,
        },
      ]}
    >
      <Animated.View
        style={{
          width: '70%',
          height: 20,
          backgroundColor: 'rgba(255,255,255,0.2)',
          marginBottom: theme.spacing.small,
        }}
      />
      <Animated.View
        style={{
          width: '50%',
          height: 15,
          backgroundColor: 'rgba(255,255,255,0.2)',
          marginBottom: theme.spacing.small,
        }}
      />
      <Animated.View
        style={{
          width: '40%',
          height: 15,
          backgroundColor: 'rgba(255,255,255,0.2)',
        }}
      />
    </Animated.View>
  );

  return (
    <BasketColLayout>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Skeleton */}
        <Animated.View style={styles.headerContainer}>
          <Animated.View
            style={[
              styles.headerBackground,
              {
                backgroundColor: 'rgba(0,0,0,0.2)',
                opacity: fadeAnim,
              },
            ]}
          />
          <Animated.View
            style={[
              styles.headerOverlay,
              {
                backgroundColor: 'rgba(0,0,0,0.5)',
                opacity: fadeAnim,
              },
            ]}
          />
          <Animated.View style={styles.headerContent}>
            <Animated.View
              style={{
                width: 40,
                height: 40,
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: 20,
                marginBottom: theme.spacing.medium,
                opacity: fadeAnim,
              }}
            />
            <Animated.View
              style={{
                width: '70%',
                height: 40,
                backgroundColor: 'rgba(255,255,255,0.2)',
                opacity: fadeAnim,
              }}
            />
          </Animated.View>
        </Animated.View>

        {/* Separator */}
        <View style={styles.sectionSeparator} />

        {/* Founder Skeleton */}
        <View style={styles.founderContainer}>
          <Animated.View
            style={[
              styles.founderCard,
              {
                backgroundColor: 'rgba(0,0,0,0.1)',
                opacity: fadeAnim,
              },
            ]}
          >
            <Animated.View
              style={[
                styles.founderImage,
                {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  opacity: fadeAnim,
                },
              ]}
            />
            <View style={styles.founderInfo}>
              <Animated.View
                style={{
                  width: '70%',
                  height: 25,
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  marginBottom: theme.spacing.small,
                  opacity: fadeAnim,
                }}
              />
              <Animated.View
                style={{
                  width: '50%',
                  height: 20,
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  opacity: fadeAnim,
                }}
              />
            </View>
          </Animated.View>
        </View>

        {/* Seasons Carousel Skeleton */}
        <View style={styles.sectionTitle}>
          <Animated.View
            style={{
              width: '50%',
              height: 25,
              backgroundColor: 'rgba(255,255,255,0.2)',
              opacity: fadeAnim,
            }}
          />
        </View>
        <View style={styles.seasonScrollContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {[0, 1, 2].map(renderSeasonCardSkeleton)}
          </ScrollView>
        </View>

        {/* Teams Carousel Skeleton */}
        <View style={styles.sectionTitle}>
          <Animated.View
            style={{
              width: '50%',
              height: 25,
              backgroundColor: 'rgba(255,255,255,0.2)',
              opacity: fadeAnim,
            }}
          />
        </View>
        <View style={styles.teamScrollContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {[0, 1, 2].map((index) => (
              <TeamCardComponentSkeleton
                key={`team-${index}`}
                appTheme={theme}
                themeMode={width > 600 ? 'light' : 'dark'}
                fadeAnim={fadeAnim}
                isSmall
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </BasketColLayout>
  );
}
