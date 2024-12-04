import React from 'react';
import { Animated, ScrollView } from 'react-native';

import { getStyles } from '../styles';
import { ITheme } from '../../../../../shared/config/theme/ITheme';
import { ThemeMode } from '../../../../../shared/store/redux/slices/theme/theme.slice';
import { SkeletonStatsCard } from './SkeletonStatsCard';
import { SkeletonAttributesSection } from './SkeletonAttributesSection';
import { PlayerUserCardComponentSkeleton } from '../../../components/PlayerUserCardComponent/PlayerUserCardComponentSkeleton';
import { BasketColLayout } from '../../../../../shared/layout/BasketColLayout';

type PlayerUserProfileOverviewScreenSkeletonProps = {
  theme: ITheme;
  themeMode: ThemeMode;
};

export function PlayerUserProfileOverviewScreenSkeleton({
  theme,
  themeMode,
}: PlayerUserProfileOverviewScreenSkeletonProps): React.JSX.Element {
  const styles = getStyles(theme, themeMode);
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
    <BasketColLayout
      rightIcons={[
        { icon: 'cards-heart-outline', action: () => {} },
      ]}
    >
      <ScrollView style={styles.container}>
        <PlayerUserCardComponentSkeleton
          theme={theme}
          themeMode={themeMode}
          fadeAnim={fadeAnim}
        />
        <SkeletonStatsCard
          theme={theme}
          themeMode={themeMode}
          fadeAnim={fadeAnim}
        />
        <SkeletonAttributesSection
          theme={theme}
          themeMode={themeMode}
          fadeAnim={fadeAnim}
        />
      </ScrollView>
    </BasketColLayout>
  );
}
