import React from 'react';
import { Text, View } from 'react-native';

import { getStyles } from './styles';
import { ITheme } from '../../../../shared/config/theme/ITheme';
import { ThemeMode } from '../../../../shared/store/redux/slices/theme/theme.slice';

type PlayerUserAttributeBarProps = {
  label: string;
  value: number;
  color: string;
  appTheme: ITheme;
  mode: ThemeMode;
};

export function PlayerUserAttributeBar({
  label,
  value,
  color,
  appTheme,
  mode,
}: PlayerUserAttributeBarProps): React.JSX.Element {
  const styles = getStyles(appTheme, mode);

  return (
    <View style={styles.attributeContainer}>
      <Text style={styles.attributeLabel}>{label}</Text>
      <View style={styles.barContainer}>
        <View style={[styles.barFill, { width: `${value}%`, backgroundColor: color }]} />
      </View>
      <Text style={styles.attributeValue}>{value}</Text>
    </View>
  );
}
