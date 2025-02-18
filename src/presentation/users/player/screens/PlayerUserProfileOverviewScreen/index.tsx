import React from 'react';
import { ScrollView } from 'react-native';

import { AttributesSectionComponent } from './AttributesSectionComponent';
import { ErrorModalComponent } from '../../../../shared/components/ErrorModalComponent';
import { getStyles } from './styles';
import { usePlayerUserProfileOverviewScreenLogic } from '../../hooks/usePlayerUserProfileOverviewScreenLogic';
import { PlayerUserProfileOverviewScreenSkeleton } from './PlayerUserProfileOverviewScreenSkeleton';
import { PlayerUserCardComponent } from '../../components/PlayerUserCardComponent';
import { BasketColLayout } from '../../../../shared/layout/BasketColLayout';
import { Section, SectionTabsComponent } from '../../../../shared/components/SectionTabsComponent';
import { CareerStatsComponent } from '../../components/CareerStatsComponent';
import { SlideModalComponent } from '../../../../shared/components/SlideModalComponent';
import { SettingsModalContentComponent } from '../../../../shared/components/SettingsModalContentComponent';

const PLAYER_SECTIONS: Section[] = [
  { id: 'attributes', title: 'Attributes' },
  { id: 'stats', title: 'Player Stats' },
  { id: 'multimedia', title: 'Multimedia' },
  { id: 'achievements', title: 'Achievements' },
];

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
    playerUserCareerStats,
    settingsCategories,
    activeSection,
    showSettingsModal,
    activeSubcategoryId,
    setActiveSection,
    setShowSettingsModal,
    handleReload,
  } = usePlayerUserProfileOverviewScreenLogic();

  if (isLoading || !authenticatedUser || !playerUserCareerStats) {
    return <PlayerUserProfileOverviewScreenSkeleton theme={theme} themeMode={themeMode} />;
  }

  const styles = getStyles(theme, themeMode);

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

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'attributes':
        return (
          <AttributesSectionComponent
            theme={theme}
            themeMode={themeMode}
            processedAttributes={processedAttributes}
          />
        );
      case 'stats':
        return (
          <CareerStatsComponent
            theme={theme}
            themeMode={themeMode}
            careerStats={playerUserCareerStats}
          />
        );
      default:
        return null;
    }
  };

  return (
    <BasketColLayout
      rightIcons={[
        {
          icon: 'menu',
          action: () => setShowSettingsModal(true),
        },
      ]}
    >
      <SlideModalComponent
        isVisible={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      >
        <SettingsModalContentComponent
          theme={theme}
          categories={settingsCategories}
          activeSubcategoryId={activeSubcategoryId}
        />
      </SlideModalComponent>

      <ScrollView style={styles.container}>
        <PlayerUserCardComponent
          firstName={!teamActivePlayer ? authenticatedUser.name.firstName : teamActivePlayer.playerUserInfo?.name.firstName || ''}
          lastName={!teamActivePlayer ? authenticatedUser.name.lastName : teamActivePlayer.playerUserInfo?.name.lastName || ''}
          profileImage={!teamActivePlayer ? authenticatedUser.profileImage : teamActivePlayer.playerUserInfo?.profileImage || {
            alt: 'image',
            dimensions: { height: 0, width: 0 },
            uploadedAt: '',
            url: '',
          }}
          position={!teamActivePlayer ? 'N/A' : teamActivePlayer.teamPlayer?.position || ''}
          teamLogo={!teamActivePlayer ? null : teamActivePlayer.teamInfo?.logo ?? null}
          appTheme={theme}
          themeMode={themeMode}
        />

        <SectionTabsComponent
          sections={PLAYER_SECTIONS}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          theme={theme}
          themeMode={themeMode}
          minTabWidth={120}
        />

        {renderActiveSection()}
      </ScrollView>
    </BasketColLayout>
  );
}
