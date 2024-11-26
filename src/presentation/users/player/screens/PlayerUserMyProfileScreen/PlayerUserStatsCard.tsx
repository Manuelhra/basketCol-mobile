import React from 'react';
import { Text, View } from 'react-native';

import { getStyles } from './styles';
import { ITheme } from '../../../../shared/config/theme/ITheme';
import { ThemeMode } from '../../../../shared/store/redux/slices/theme/theme.slice';

type PlayerUserStatsCardProps = {
  title: string;
  value: string | number;
  appTheme: ITheme;
  mode: ThemeMode;
};

export function PlayerUserStatsCard({
  title,
  value,
  appTheme,
  mode,
}: PlayerUserStatsCardProps): React.JSX.Element {
  const styles = getStyles(appTheme, mode);

  return (
    <View style={styles.statsCard}>
      <Text style={styles.statsValue}>{value}</Text>
      <Text style={styles.statsTitle}>{title}</Text>
    </View>
  );
}
