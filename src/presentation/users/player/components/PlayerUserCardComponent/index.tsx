import React from 'react';
import { IImageValueObjectProps } from '@basketcol/domain';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import { getStyles } from './styles';
import { ITheme } from '../../../../shared/config/theme/ITheme';
import { ThemeMode } from '../../../../shared/store/redux/slices/theme/theme.slice';
import { PlayerUserHttpResponseDTO } from '../../../../../basketCol/users/player/application/dtos/PlayerUserHttpResponseDTO';

type PlayerUserCardComponentProps = {
  playerUserDto: PlayerUserHttpResponseDTO;
  position: string;
  teamLogo: IImageValueObjectProps | null;
  appTheme: ITheme;
  themeMode: ThemeMode;
  isCurrentUser?: boolean;
  showFullPosition?: boolean;
  isSmall?: boolean;
  onPress?: () => void;
};

const getPositionAbbreviation = (position: string): string => (position ? position.slice(0, 2).toUpperCase() : '');

const renderFloatingContent = (
  position: string,
  teamLogo: IImageValueObjectProps | null,
  showFullPosition: boolean,
  styles: any,
) => {
  if (teamLogo?.url) {
    return (
      <>
        <View style={styles.positionContainer}>
          <Text style={styles.positionText}>{getPositionAbbreviation(position)}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.logoContainer}>
          <Image source={{ uri: teamLogo.url }} alt={teamLogo.alt} style={styles.teamLogo} />
        </View>
      </>
    );
  }

  return (
    <View style={styles.positionContainer}>
      <Text style={styles.positionText}>{showFullPosition ? position : 'AGENTE LIBRE'}</Text>
    </View>
  );
};

export function PlayerUserCardComponent({
  playerUserDto,
  position,
  teamLogo,
  appTheme,
  themeMode,
  isCurrentUser = false,
  showFullPosition = false,
  isSmall = false,
  onPress,
}: PlayerUserCardComponentProps): React.JSX.Element {
  const styles = getStyles(appTheme, themeMode, isSmall);

  return (
    <TouchableOpacity
      style={[styles.cardContainer, isCurrentUser && styles.currentUserCard]}
      onPress={onPress}
    >
      <Image
        source={{ uri: playerUserDto.profileImage.url }}
        alt={playerUserDto.profileImage.alt}
        style={styles.playerImage}
        resizeMode="cover"
      />

      <View style={styles.bottomInfoContainer}>
        <View style={styles.floatingContainer}>
          {renderFloatingContent(position, teamLogo, showFullPosition, styles)}
        </View>

        <View style={styles.nameContainer}>
          {isCurrentUser && (
            <View style={styles.currentUserBadge}>
              <Text style={styles.currentUserBadgeText}>YOU</Text>
            </View>
          )}
          <Text style={styles.firstName}>{playerUserDto.name.firstName}</Text>
          <Text style={styles.lastName}>{playerUserDto.name.lastName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
