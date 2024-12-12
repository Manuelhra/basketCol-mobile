import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import { ILeaguePrimitives } from '@basketcol/domain';

import { getStyles } from './styles';
import { ITheme } from '../../../../shared/config/theme/ITheme';
import { ThemeMode } from '../../../../shared/store/redux/slices/theme/theme.slice';

type LeagueCardComponentProps = {
  league: ILeaguePrimitives
  appTheme: ITheme;
  themeMode: ThemeMode;
  isSmall?: boolean;
  onPress?: () => void;
};

export function LeagueCardComponent({
  league,
  appTheme,
  themeMode,
  isSmall = false,
  onPress,
}: LeagueCardComponentProps): React.JSX.Element {
  const styles = getStyles(appTheme, themeMode, isSmall);

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={{ flex: 1 }} onPress={onPress}>
        <Image
          source={require('./background-card-league-logo.jpg')}
          alt="League logo"
          style={styles.leagueBackground}
          resizeMode="cover"
        />

        <View style={styles.floatingLogoContainer}>
          <Image
            source={require('./league-logo.jpg')} // Replace with actual league logo
            alt="League logo"
            style={styles.leagueLogo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.leagueLevelBadge}>
          <Text style={styles.leagueLevelText}>{league.level}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.leagueName} numberOfLines={2}>
            {league.name.official}
          </Text>
          <Text style={styles.leagueDescription} numberOfLines={2}>
            {league.description.short}
          </Text>

          <View style={styles.additionalInfoContainer}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>GÉNERO</Text>
              <Text style={styles.infoValue}>{league.gender}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>FUNDACIÓN</Text>
              <Text style={styles.infoValue}>
                {league.establishmentDate}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
