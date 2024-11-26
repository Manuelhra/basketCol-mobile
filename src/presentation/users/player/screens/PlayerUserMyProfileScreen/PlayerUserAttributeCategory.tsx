import React from 'react';
import { Text, View } from 'react-native';

import { getStyles } from './styles';
import { PlayerUserAttributeBar } from './PlayerUserAttributeBar';
import { ITheme } from '../../../../shared/config/theme/ITheme';
import { ThemeMode } from '../../../../shared/store/redux/slices/theme/theme.slice';

type PlayerUserAttributeCategoryProps = {
  title: string;
  attributes: Record<string, number>;
  color: string;
  appTheme: ITheme;
  mode: ThemeMode;
};

export function PlayerUserAttributeCategory({
  title,
  attributes,
  color,
  appTheme,
  mode,
}: PlayerUserAttributeCategoryProps): React.JSX.Element {
  const styles = getStyles(appTheme, mode);

  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{title}</Text>
      {Object.entries(attributes).map(([key, value]) => (
        <PlayerUserAttributeBar
          key={key}
          label={key.split(/(?=[A-Z])/).join(' ')}
          value={value}
          color={color}
          appTheme={appTheme}
          mode={mode}
        />
      ))}
    </View>
  );
}
