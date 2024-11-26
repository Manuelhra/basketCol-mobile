import React from 'react';
import { Animated, View } from 'react-native';

import { getStyles } from '../styles';
import { ITheme } from '../../../../../shared/config/theme/ITheme';
import { ThemeMode } from '../../../../../shared/store/redux/slices/theme/theme.slice';

type SkeletonStatsCardProps = {
  theme: ITheme;
  mode: ThemeMode;
  fadeAnim: Animated.Value;
};

export function SkeletonStatsCard({
  theme,
  mode,
  fadeAnim,
}: SkeletonStatsCardProps): React.JSX.Element {
  const styles = getStyles(theme, mode);

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
