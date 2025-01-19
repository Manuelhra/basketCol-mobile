import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { ITheme } from '../../../../shared/config/theme/ITheme';
import { ThemeMode } from '../../../../shared/store/redux/slices/theme/theme.slice';
import { getStyles } from './styles';
import { PlayerUserAttributeCategoryComponent } from './PlayerUserAttributeCategoryComponent';
import { ATTRIBUTE_COLORS, AttributeColorKey } from '../../../../shared/config/theme/constants/player-user-attributes';

type AttributesSectionComponentProps = {
  theme: ITheme;
  themeMode: ThemeMode;
  processedAttributes: ProcessedAttributes | null;
};

export function AttributesSectionComponent({
  theme,
  themeMode,
  processedAttributes,
}: AttributesSectionComponentProps): React.JSX.Element {
  const styles = getStyles(theme, themeMode);

  // Verifica si el usuario tiene todos los atributos necesarios
  const isMissingAttributes = Object.values(processedAttributes ?? {}).some((value) => value === null);

  if (isMissingAttributes || processedAttributes === null) {
    return (
      <View style={styles.emptySectionContainer}>
        <View style={styles.card}>
          <View style={styles.brandContainer}>
            <Text style={styles.brandText}>BasketCol</Text>
          </View>
          <Text style={styles.title}>¡Únete al DRAFT!</Text>
          <Text style={styles.description}>
            Para desbloquear tus atributos de jugador, necesitas participar en una edición del DRAFT de la plataforma.
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Explorar DRAFT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.attributesContainer}>
      {Object.entries(processedAttributes).map(([key, value]) => {
        if (!value) return null;

        return (
          <PlayerUserAttributeCategoryComponent
            key={key}
            title={key.charAt(0).toUpperCase() + key.slice(1)}
            attributes={value}
            color={ATTRIBUTE_COLORS[key as AttributeColorKey]}
            appTheme={theme}
            themeMode={themeMode}
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
