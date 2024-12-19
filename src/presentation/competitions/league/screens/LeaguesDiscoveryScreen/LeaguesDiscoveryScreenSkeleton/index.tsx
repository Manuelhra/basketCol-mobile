import React from 'react';
import { Animated, ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '../../../../../shared/store/redux/rootReducer';
import { BasketColLayout } from '../../../../../shared/layout/BasketColLayout';
import { LeagueCardComponentSkeleton } from '../../../components/LeagueCardComponent/LeagueCardComponentSkeleton';
import { getStyles } from '../styles';

export function LeaguesDiscoveryScreenSkeleton(): React.JSX.Element {
  const { theme, themeMode } = useSelector((state: RootState) => state.theme);
  const styles = getStyles(theme);
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
    <BasketColLayout>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          style={styles.scrollContainer}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <LeagueCardComponentSkeleton
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              theme={theme}
              themeMode={themeMode}
              fadeAnim={fadeAnim}
            />
          ))}
        </ScrollView>
      </View>
    </BasketColLayout>
  );
}
