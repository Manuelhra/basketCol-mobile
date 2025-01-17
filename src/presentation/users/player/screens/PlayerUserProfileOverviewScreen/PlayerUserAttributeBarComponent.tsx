import React from 'react';
import { Text, View } from 'react-native';

import { getStyles } from './styles';
import { ITheme } from '../../../../shared/config/theme/ITheme';
import { ThemeMode } from '../../../../shared/store/redux/slices/theme/theme.slice';

type PlayerUserAttributeBarComponentProps = {
  label: string;
  value: number;
  color: string;
  appTheme: ITheme;
  themeMode: ThemeMode;
};

export function PlayerUserAttributeBarComponent({
  label,
  value,
  color,
  appTheme,
  themeMode,
}: PlayerUserAttributeBarComponentProps): React.JSX.Element {
  const styles = getStyles(appTheme, themeMode);

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
