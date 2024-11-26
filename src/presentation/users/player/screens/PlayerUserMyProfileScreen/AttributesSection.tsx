import React from 'react';
import { View } from 'react-native';

import { ITheme } from '../../../../shared/config/theme/ITheme';
import { ThemeMode } from '../../../../shared/store/redux/slices/theme/theme.slice';
import { getStyles } from './styles';
import { PlayerUserAttributeCategory } from './PlayerUserAttributeCategory';
import { ATTRIBUTE_COLORS, AttributeColorKey } from '../../../../shared/config/theme/constants/player-user-attributes';

type PlayerUserAttributesSectionProps = {
  theme: ITheme;
  mode: ThemeMode;
  processedAttributes: ProcessedAttributes | null;
};

export function PlayerUserAttributesSection({
  theme,
  mode,
  processedAttributes,
}: PlayerUserAttributesSectionProps): React.JSX.Element {
  const styles = getStyles(theme, mode);

  if (processedAttributes === null) return <></>;

  return (
    <View style={styles.attributesContainer}>
      {Object.entries(processedAttributes).map(([key, value]) => {
        if (!value) return null;

        return (
          <PlayerUserAttributeCategory
            key={key}
            title={key.charAt(0).toUpperCase() + key.slice(1)}
            attributes={value}
            color={ATTRIBUTE_COLORS[key as AttributeColorKey]}
            appTheme={theme}
            mode={mode}
          />
        );
      })}
    </View>
  );
}

interface ProcessedAttributes {
  defensive: Record<string, number> | null;
  physical: Record<string, number> | null;
  finishing: Record<string, number> | null;
  shooting: Record<string, number> | null;
  skill: Record<string, number> | null;
  rebounding: Record<string, number> | null;
}
