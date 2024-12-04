/* eslint-disable react/no-array-index-key */
import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import { getStyles } from './styles';
import { RootState } from '../../../../shared/store/redux/rootReducer';

export function TeamOverviewScreenSkeleton(): React.JSX.Element {
  const { theme, themeMode } = useSelector((state: RootState) => state.theme);
  const styles = getStyles(theme, themeMode);

  return (
    <View style={styles.container}>
      {/* Header Skeleton */}
      <View style={styles.teamHeaderSkeleton}>
        <View style={styles.teamLogoSkeleton} />
        <View style={styles.teamNameSkeleton} />
        <View style={styles.teamGenderSkeleton} />
      </View>

      {/* Stats Skeleton */}
      <View style={styles.teamStatsSkeletonContainer}>
        {Array.from({ length: 4 }).map((_, index) => (
          <View key={index} style={styles.statBoxSkeleton} />
        ))}
      </View>

      {/* Roster Skeleton */}
      <View style={styles.teamRosterSkeleton}>
        <View style={styles.sectionTitleSkeleton} />
        <View style={styles.playerCardSkeletonGrid}>
          {Array.from({ length: 6 }).map((_, index) => (
            <View key={index} style={styles.playerCardSkeleton} />
          ))}
        </View>
      </View>
    </View>
  );
}
