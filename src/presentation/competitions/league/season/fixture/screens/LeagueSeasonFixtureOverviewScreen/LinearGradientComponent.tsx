import React from 'react';
import { View } from 'react-native';

type LinearGradientComponentProps = {
  colors: string[];
  start: { x: number; y: number };
  end: { x: number; y: number };
  style: any;
  children: React.ReactNode;
};

export function LinearGradientComponent({
  colors,
  start,
  end,
  style,
  children,
}: LinearGradientComponentProps): React.JSX.Element {
  const gradientStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors[0], // Fallback to first color
    backgroundImage: `linear-gradient(${
      end.x > start.x ? 'to right' : 'to left'
    }, ${colors.join(', ')})`,
  };

  return (
    <View style={[style, gradientStyle]}>
      {children}
    </View>
  );
}
