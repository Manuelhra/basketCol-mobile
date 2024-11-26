import React from 'react';
import { ColorValue, StyleProp, TextStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type MaterialCommunityIconProps = {
  name: string;
  size?: number;
  color?: number | ColorValue;
  style?: StyleProp<TextStyle>;
};

export function MaterialCommunityIcon({
  name,
  size,
  color,
  style,
}: MaterialCommunityIconProps): React.JSX.Element {
  return (
    <Icon
      name={name}
      size={size}
      color={color}
      style={style}
    />
  );
}
