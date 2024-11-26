import React from 'react';
import { Animated, ScrollView } from 'react-native';

import { getStyles } from '../styles';
import { ITheme } from '../../../../../shared/config/theme/ITheme';
import { ThemeMode } from '../../../../../shared/store/redux/slices/theme/theme.slice';
import { SkeletonCard } from './SkeletonCard';
import { SkeletonStatsCard } from './SkeletonStatsCard';
import { SkeletonAttributesSection } from './SkeletonAttributesSection';

type PlayerUserMyProfileScreenSkeletonProps = {
  theme: ITheme;
  mode: ThemeMode;
};

export function PlayerUserMyProfileScreenSkeleton({
  theme,
  mode,
}: PlayerUserMyProfileScreenSkeletonProps): React.JSX.Element {
  const styles = getStyles(theme, mode);
  const fadeAnim = React.useRef(new Animated.Value(0.5)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <SkeletonCard
        theme={theme}
        mode={mode}
        fadeAnim={fadeAnim}
      />
      <SkeletonStatsCard
        theme={theme}
        mode={mode}
        fadeAnim={fadeAnim}
      />
      <SkeletonAttributesSection
        theme={theme}
        mode={mode}
        fadeAnim={fadeAnim}
      />
    </ScrollView>
  );
}
