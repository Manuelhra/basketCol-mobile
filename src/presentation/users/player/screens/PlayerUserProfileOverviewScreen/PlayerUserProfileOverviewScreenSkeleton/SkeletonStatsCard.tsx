import React from 'react';
import { Animated, View } from 'react-native';

import { getStyles } from '../styles';
import { ITheme } from '../../../../../shared/config/theme/ITheme';
import { ThemeMode } from '../../../../../shared/store/redux/slices/theme/theme.slice';

type SkeletonStatsCardProps = {
  theme: ITheme;
  themeMode: ThemeMode;
  fadeAnim: Animated.Value;
};

export function SkeletonStatsCard({
  theme,
  themeMode,
  fadeAnim,
}: SkeletonStatsCardProps): React.JSX.Element {
  const styles = getStyles(theme, themeMode);

  return (
    <View style={styles.statsOverview}>
      {[1, 2, 3, 4].map((item) => (
        <Animated.View
          key={item}
          style={[
            styles.statsCard,
            {
              backgroundColor: 'rgba(0,0,0,0.1)',
              opacity: fadeAnim,
            },
          ]}
        />
      ))}
    </View>
  );
}
