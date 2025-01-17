import React from 'react';
import { Text, View } from 'react-native';

import { getStyles } from './styles';
import { PlayerUserAttributeBarComponent } from './PlayerUserAttributeBarComponent';
import { ITheme } from '../../../../shared/config/theme/ITheme';
import { ThemeMode } from '../../../../shared/store/redux/slices/theme/theme.slice';

type PlayerUserAttributeCategoryComponentProps = {
  title: string;
  attributes: Record<string, number>;
  color: string;
  appTheme: ITheme;
  themeMode: ThemeMode;
};

export function PlayerUserAttributeCategoryComponent({
  title,
  attributes,
  color,
  appTheme,
  themeMode,
}: PlayerUserAttributeCategoryComponentProps): React.JSX.Element {
  const styles = getStyles(appTheme, themeMode);

  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{title}</Text>
      {Object.entries(attributes).map(([key, value]) => (
        <PlayerUserAttributeBarComponent
          key={key}
          label={key.split(/(?=[A-Z])/).join(' ')}
          value={value}
          color={color}
          appTheme={appTheme}
          themeMode={themeMode}
        />
      ))}
    </View>
  );
}
