import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';

import { LeagueCardComponent } from '../../components/LeagueCardComponent';
import { dummyLeaguesData } from './dummy-data';
import { RootState } from '../../../../shared/store/redux/rootReducer';
import { getStyles } from './styles';
import { BasketColLayout } from '../../../../shared/layout/BasketColLayout';
import { type PlayerUserCompetitionsStackNavigatorParamList } from '../../../../users/player/navigation/PlayerUserBottomNavigator';

export function LeaguesDiscoveryScreen(): React.JSX.Element {
  const { theme, themeMode } = useSelector((state: RootState) => state.theme);
  const navigation = useNavigation<NavigationProp<PlayerUserCompetitionsStackNavigatorParamList, 'leaguesDiscovery'>>();

  const styles = getStyles(theme);

  const handleLeaguePress = () => {
    navigation.navigate('leagueOverview'); // Asegúrate de que 'LeagueDetails' sea una ruta válida
  };

  return (
    <BasketColLayout
      rightIcons={[
        { icon: 'menu', action: () => {} },
      ]}
    >
      <View style={styles.scrollContainer}>
        <ScrollView style={styles.scrollContainer}>
          {dummyLeaguesData.map((league) => (
            <LeagueCardComponent
              key={league.id}
              league={league}
              appTheme={theme}
              themeMode={themeMode}
              onPress={handleLeaguePress}
            />
          ))}
        </ScrollView>
      </View>
    </BasketColLayout>
  );
}
