import React from 'react';
import { IImageValueObjectProps } from '@basketcol/domain/build/types/basketCol/shared/domain/value-objects/ImageValueObject';
import {
  Text,
  View,
  Image,
} from 'react-native';

import { getStyles } from './styles';
import { ITheme } from '../../../../shared/config/theme/ITheme';
import { ThemeMode } from '../../../../shared/store/redux/slices/theme/theme.slice';

type PlayerUserCardProps = {
  firstName: string;
  lastName: string;
  position: string;
  playerUserImage: IImageValueObjectProps;
  teamLogo: IImageValueObjectProps | null;
  appTheme: ITheme;
  mode: ThemeMode;
};

const getPositionAbbreviation = (position: string): string => {
  // Si la posición está vacía, devuelve un string vacío
  if (!position) return '';

  // Toma las dos primeras letras en mayúsculas
  return position.slice(0, 2).toUpperCase();
};

export function PlayerUserCard({
  firstName,
  lastName,
  position,
  playerUserImage,
  teamLogo,
  appTheme,
  mode,
}: PlayerUserCardProps): React.JSX.Element {
  const styles = getStyles(appTheme, mode);

  // Renderizado condicional del floating container
  const renderFloatingContent = () => {
    // Si hay logo de equipo, mostrar posición y logo
    if (teamLogo?.url) {
      return (
        <>
          <View style={styles.positionContainer}>
            <Text style={styles.positionText}>{getPositionAbbreviation(position)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.logoContainer}>
            <Image
              source={{ uri: teamLogo.url }}
              alt={teamLogo.alt}
              style={styles.teamLogo}
            />
          </View>
        </>
      );
    }

    // Si no hay equipo, mostrar "Agente Libre"
    return (
      <View style={[styles.positionContainer, { flex: 1, alignItems: 'center' }]}>
        <Text style={[styles.positionText, { fontSize: 18, letterSpacing: 1 }]}>
          AGENTE LIBRE
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.cardContainer}>
      <Image
        source={{ uri: playerUserImage.url }}
        alt={playerUserImage.alt}
        style={styles.playerImage}
        resizeMode="cover"
      />

      {/* Contenedor principal inferior */}
      <View style={styles.bottomInfoContainer}>
        {/* Contenedor flotante para posición y logo */}
        <View style={styles.floatingContainer}>
          {renderFloatingContent()}
        </View>

        {/* Contenedor del nombre */}
        <View style={styles.nameContainer}>
          <Text style={styles.firstName}>{firstName}</Text>
          <Text style={styles.lastName}>{lastName}</Text>
        </View>
      </View>
    </View>
  );
}
