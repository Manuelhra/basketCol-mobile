import React from 'react';
import { View, ScrollView } from 'react-native';

import { PlayerUserCard } from './PlayerUserCard';
import { PlayerUserStatsCard } from './PlayerUserStatsCard';
import { PlayerUserAttributesSection } from './AttributesSection';
import { PlayerUserMyProfileScreenSkeleton } from './skeleton/PlayerUserMyProfileScreenSkeleton';
import { ErrorModal } from '../../../../shared/components/ErrorModal';
import { usePlayerUserMyProfileScreenLogic } from '../../hooks/usePlayerUserMyProfileScreenLogic';
import { getStyles } from './styles';

const MOCK_STATS = {
  PTS: 0,
  AST: 0,
  REB: 0,
  GMS: 0,
} as const;

const ERROR_MESSAGE = 'Lo sentimos, ha ocurrido un error al cargar la información. Por favor, inténtalo de nuevo más tarde.';

export function PlayerUserMyProfileScreen(): React.JSX.Element {
  const {
    mode,
    theme,
    isLoading,
    requestError,
    teamActivePlayer,
    authenticatedUser,
    processedAttributes,
    handleReload,
  } = usePlayerUserMyProfileScreenLogic();

  if (isLoading || !authenticatedUser || !teamActivePlayer) {
    return <PlayerUserMyProfileScreenSkeleton theme={theme} mode={mode} />;
  }

  const styles = getStyles(theme, mode);

  // Render with error modal if there's an error
  if (requestError !== null) {
    return (
      <ScrollView style={styles.container}>
        <ErrorModal
          isVisible
          errorMessage={ERROR_MESSAGE}
          secondaryActionLabel="Reintentar"
          secondaryActionHandler={handleReload}
          showCloseIcon={false}
        />
        <PlayerUserMyProfileScreenSkeleton theme={theme} mode={mode} />
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <PlayerUserCard
        firstName={authenticatedUser.name.firstName}
        lastName={authenticatedUser.name.lastName}
        position={teamActivePlayer.teamPlayer?.position || ''}
        playerUserImage={authenticatedUser.profileImage}
        teamLogo={teamActivePlayer.teamInfo?.logo || null}
        appTheme={theme}
        mode={mode}
      />

      <View style={styles.statsOverview}>
        {Object.entries(MOCK_STATS).map(([title, value]) => (
          <PlayerUserStatsCard
            key={title}
            title={title.toUpperCase()}
            value={value}
            appTheme={theme}
            mode={mode}
          />
        ))}
      </View>

      <PlayerUserAttributesSection
        theme={theme}
        mode={mode}
        processedAttributes={processedAttributes}
      />
    </ScrollView>
  );
}
