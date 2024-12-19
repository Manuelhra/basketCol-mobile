import React from 'react';
import { ScrollView, View } from 'react-native';

import { LeagueCardComponent } from '../../components/LeagueCardComponent';
import { getStyles } from './styles';
import { BasketColLayout } from '../../../../shared/layout/BasketColLayout';
import { LeaguesDiscoveryScreenSkeleton } from './LeaguesDiscoveryScreenSkeleton';
import { ErrorModalComponent } from '../../../../shared/components/ErrorModalComponent';
import { useLeaguesDiscoveryScreenLogic } from '../../hooks/useLeaguesDiscoveryScreenLogic';

export function LeaguesDiscoveryScreen(): React.JSX.Element {
  const {
    isLoading,
    data,
    requestError,
    theme,
    themeMode,
    handleLeaguePress,
    handleReload,
  } = useLeaguesDiscoveryScreenLogic();
  const styles = getStyles(theme);

  if (isLoading || !data.leagues || !data.pagination) {
    return <LeaguesDiscoveryScreenSkeleton />;
  }

  // Error handling
  if (requestError) {
    return (
      <ScrollView style={styles.container}>
        <ErrorModalComponent
          isVisible
          showCloseIcon={false}
          secondaryActionLabel="Reintentar"
          secondaryActionHandler={handleReload}
        />
        <LeaguesDiscoveryScreenSkeleton />
      </ScrollView>
    );
  }

  return (
    <BasketColLayout>
      <View style={styles.scrollContainer}>
        <ScrollView style={styles.scrollContainer}>
          {data.leagues.map((league) => (
            <LeagueCardComponent
              key={league.id}
              league={league}
              appTheme={theme}
              themeMode={themeMode}
              onPress={() => handleLeaguePress(league.id)}
            />
          ))}
        </ScrollView>
      </View>
    </BasketColLayout>
  );
}
