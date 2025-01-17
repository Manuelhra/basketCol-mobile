import React from 'react';
import { Text, View } from 'react-native';

import { getStyles } from './styles';
import { ITheme } from '../../../../shared/config/theme/ITheme';
import { ThemeMode } from '../../../../shared/store/redux/slices/theme/theme.slice';

type PlayerUserStatsCardComponentProps = {
  title: string;
  value: string | number;
  appTheme: ITheme;
  themeMode: ThemeMode;
};

export function PlayerUserStatsCardComponent({
  title,
  value,
  appTheme,
  themeMode,
}: PlayerUserStatsCardComponentProps): React.JSX.Element {
  const styles = getStyles(appTheme, themeMode);

  return (
    <View style={styles.statsCard}>
      <Text style={styles.statsValue}>{value}</Text>
      <Text style={styles.statsTitle}>{title}</Text>
    </View>
  );
}
