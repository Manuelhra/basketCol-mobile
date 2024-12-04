import React from 'react';
import { Animated, View } from 'react-native';

import { getStyles } from '../styles';
import { ITheme } from '../../../../../shared/config/theme/ITheme';
import { ThemeMode } from '../../../../../shared/store/redux/slices/theme/theme.slice';

type SkeletonAttributesSectionProps = {
  theme: ITheme;
  themeMode: ThemeMode;
  fadeAnim: Animated.Value;
};

export function SkeletonAttributesSection({
  theme,
  themeMode,
  fadeAnim,
}: SkeletonAttributesSectionProps): React.JSX.Element {
  const styles = getStyles(theme, themeMode);

  return (
    <Animated.View
      style={[
        styles.attributesContainer,
        {
          backgroundColor: 'rgba(0,0,0,0.1)',
          opacity: fadeAnim,
        },
      ]}
    >
      {[1, 2, 3].map((category) => (
        <View key={category} style={styles.categoryContainer}>
          <Animated.View
            style={{
              width: '50%',
              height: 30,
              backgroundColor: 'rgba(255,255,255,0.2)',
              marginBottom: 10,
              opacity: fadeAnim,
            }}
          />
          {[1, 2, 3, 4].map((attr) => (
            <View key={attr} style={styles.attributeContainer}>
              <Animated.View
                style={{
                  width: '30%',
                  height: 20,
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  marginRight: 10,
                  opacity: fadeAnim,
                }}
              />
              <Animated.View
                style={{
                  flex: 1,
                  height: 10,
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  borderRadius: 5,
                  opacity: fadeAnim,
                }}
              />
              <Animated.View
                style={{
                  width: '10%',
                  height: 20,
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  marginLeft: 10,
                  opacity: fadeAnim,
                }}
              />
            </View>
          ))}
        </View>
      ))}
    </Animated.View>
  );
}
