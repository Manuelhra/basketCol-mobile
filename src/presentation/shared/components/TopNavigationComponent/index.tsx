import React from 'react';
import {
  Animated, Text, TouchableOpacity, View,
} from 'react-native';
import { useSelector } from 'react-redux';

import { getStyles } from './styles';
import { RootState } from '../../store/redux/rootReducer';
import { MaterialCommunityIconComponent } from '../MaterialCommunityIconComponent';

type TopNavigationComponentProps = {
  scrollY: Animated.Value;
  navbarHeight?: number;
  rightIcons?: { icon: string; action: () => void; }[];
};

export function TopNavigationComponent({
  scrollY,
  navbarHeight = 56,
  rightIcons = [],
}: TopNavigationComponentProps): React.JSX.Element {
  const { theme, themeMode } = useSelector((state: RootState) => state.theme);
  const styles = getStyles(theme, themeMode, navbarHeight);

  const translateY = scrollY.interpolate({
    inputRange: [0, navbarHeight],
    outputRange: [0, -navbarHeight],
    extrapolate: 'clamp',
  });

  const renderIcon = (iconConfig: { icon: string; action: () => void; }) => (
    <TouchableOpacity
      key={iconConfig.icon}
      onPress={iconConfig.action}
      style={styles.iconButton}
    >

      <MaterialCommunityIconComponent
        name={iconConfig.icon}
        size={24}
        color={theme.colors.text}
      />

    </TouchableOpacity>
  );

  return (
    <Animated.View
      style={[
        styles.navbar,
        {
          transform: [{ translateY }],
        },
      ]}
    >
      <Text style={styles.brandText}>BasketCol</Text>
      <View style={styles.iconContainer}>
        {rightIcons?.map(renderIcon)}
      </View>
    </Animated.View>
  );
}
