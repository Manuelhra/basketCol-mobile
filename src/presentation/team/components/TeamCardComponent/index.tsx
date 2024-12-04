import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import { getStyles } from './styles';
import { TeamHttpResponseDTO } from '../../../../basketCol/team/application/dtos/TeamHttpResponseDTO';
import { ITheme } from '../../../shared/config/theme/ITheme';
import { ThemeMode } from '../../../shared/store/redux/slices/theme/theme.slice';
import { MaterialCommunityIconComponent } from '../../../shared/components/MaterialCommunityIconComponent';

type TeamCardComponentProps = {
  team: TeamHttpResponseDTO;
  appTheme: ITheme;
  themeMode: ThemeMode;
  isSmall?: boolean;
  isSelected?: boolean;
  onPress?: () => void;
};

export function TeamCardComponent({
  team,
  appTheme,
  themeMode,
  isSmall = false,
  onPress,
  isSelected = false,
}: TeamCardComponentProps): React.JSX.Element {
  const styles = getStyles(appTheme, themeMode, isSmall);

  return (
    <TouchableOpacity
      style={[
        styles.cardContainer,
        isSelected && styles.selectedCard,
      ]}
      onPress={onPress}
    >
      {/* Background Image with Overlay */}
      <Image
        source={{ uri: team.mainImage.url }}
        style={styles.backgroundImage}
        blurRadius={2}
      />
      <View style={styles.overlay} />

      {/* Team Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: team.logo.url }}
          style={styles.teamLogo}
          resizeMode="contain"
        />
      </View>

      {/* Team Name */}
      <View style={styles.teamNameContainer}>
        <Text style={styles.teamNamePrimary} numberOfLines={1}>
          {team.officialName.split(' ')[0]}
        </Text>
        <Text style={styles.teamNameSecondary} numberOfLines={1}>
          {team.officialName.split(' ').slice(1).join(' ')}
        </Text>
      </View>

      {/* Team Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <MaterialCommunityIconComponent
            name="account-group"
            color={appTheme.colors.accent}
            size={20}
          />
          <Text style={styles.statText}>Players: 12</Text>
        </View>
        <View style={styles.statItem}>
          <MaterialCommunityIconComponent
            name="trophy"
            color={appTheme.colors.accent}
            size={20}
          />
          <Text style={styles.statText}>Wins: 15</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
