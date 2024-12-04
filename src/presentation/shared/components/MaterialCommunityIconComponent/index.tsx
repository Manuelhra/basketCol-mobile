import React from 'react';
import { ColorValue, StyleProp, TextStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type MaterialCommunityIconComponentProps = {
  name: string;
  size?: number;
  color?: number | ColorValue;
  style?: StyleProp<TextStyle>;
};

export function MaterialCommunityIconComponent({
  name,
  size,
  color,
  style,
}: MaterialCommunityIconComponentProps): React.JSX.Element {
  return (
    <Icon
      name={name}
      size={size}
      color={color}
      style={style}
    />
  );
}
