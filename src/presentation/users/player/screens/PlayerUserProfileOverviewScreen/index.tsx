import React from 'react';
import { View, ScrollView } from 'react-native';

import { PlayerUserStatsCard } from './PlayerUserStatsCard';
import { PlayerUserAttributesSection } from './AttributesSection';
import { ErrorModalComponent } from '../../../../shared/components/ErrorModalComponent';
import { getStyles } from './styles';
import { usePlayerUserProfileOverviewScreenLogic } from '../../hooks/usePlayerUserProfileOverviewScreenLogic';
import { PlayerUserProfileOverviewScreenSkeleton } from './PlayerUserProfileOverviewScreenSkeleton';
import { PlayerUserCardComponent } from '../../components/PlayerUserCardComponent';
import { BasketColLayout } from '../../../../shared/layout/BasketColLayout';

const MOCK_STATS = {
  PTS: 0,
  AST: 0,
  REB: 0,
  GMS: 0,
} as const;

const ERROR_MESSAGE = 'Lo sentimos, ha ocurrido un error al cargar la información. Por favor, inténtalo de nuevo más tarde.';

export function PlayerUserProfileOverviewScreen(): React.JSX.Element {
  const {
    themeMode,
    theme,
    isLoading,
    requestError,
    teamActivePlayer,
    authenticatedUser,
    processedAttributes,
    handleReload,
  } = usePlayerUserProfileOverviewScreenLogic();

  if (isLoading || !authenticatedUser || !teamActivePlayer || !teamActivePlayer.playerUserInfo) {
    return <PlayerUserProfileOverviewScreenSkeleton theme={theme} themeMode={themeMode} />;
  }

  // TODO: Agregar id en los params de la ruta y enviaselo a la lógica
  // TODO: Crear los DTOS Necesarios para tipar
  const styles = getStyles(theme, themeMode);

  // Render with error modal if there's an error
  if (requestError !== null) {
    return (
      <ScrollView style={styles.container}>
        <ErrorModalComponent
          isVisible
          errorMessage={ERROR_MESSAGE}
          secondaryActionLabel="Reintentar"
          secondaryActionHandler={handleReload}
          showCloseIcon={false}
        />
        <PlayerUserProfileOverviewScreenSkeleton theme={theme} themeMode={themeMode} />
      </ScrollView>
    );
  }

  return (
    <BasketColLayout
      rightIcons={[
        { icon: 'menu', action: () => {} },
      ]}
    >
      <ScrollView style={styles.container}>
        <PlayerUserCardComponent
          playerUserDto={teamActivePlayer.playerUserInfo}
          position={teamActivePlayer.teamPlayer?.position || ''}
          teamLogo={teamActivePlayer.teamInfo?.logo || null}
          appTheme={theme}
          themeMode={themeMode}
        />

        <View style={styles.statsOverview}>
          {Object.entries(MOCK_STATS).map(([title, value]) => (
            <PlayerUserStatsCard
              key={title}
              title={title.toUpperCase()}
              value={value}
              appTheme={theme}
              themeMode={themeMode}
            />
          ))}
        </View>

        <PlayerUserAttributesSection
          theme={theme}
          themeMode={themeMode}
          processedAttributes={processedAttributes}
        />
      </ScrollView>
    </BasketColLayout>
  );
}
