import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';

import { getStyles } from './styles';
import { PlayerUserCardComponent } from '../../../users/player/components/PlayerUserCardComponent';
import { BasketColLayout } from '../../../shared/layout/BasketColLayout';
import { ErrorModalComponent } from '../../../shared/components/ErrorModalComponent';
import { TeamOverviewScreenSkeleton } from './TeamOverviewScreenSkeleton';
import { useTeamOverviewScreenLogic } from '../../hooks/useTeamOverviewScreenLogic';
import { RootState } from '../../../shared/store/redux/rootReducer';
import { FeedbackBannerComponent } from '../../../shared/components/FeedbackBannerComponent';
import { Section, SectionTabsComponent } from '../../../shared/components/SectionTabsComponent';
import { TeamStatsSectionComponent } from '../../components/TeamStatsSectionComponent';

const TEAM_SECTIONS: Section[] = [
  { id: 'roster', title: 'Team Roster' },
  { id: 'stats', title: 'Team Stats' },
  { id: 'schedule', title: 'Schedule' },
  { id: 'achievements', title: 'Achievements' },
];

export function TeamOverviewScreen() {
  const { theme, themeMode } = useSelector((state: RootState) => state.theme);
  const styles = getStyles(theme, themeMode);
  const [activeSection, setActiveSection] = useState('roster');

  const {
    team,
    teamAllTimeStats,
    teamPlayerUserList,
    isLoading,
    requestError,
    errorMessage,
    renderPlayerCard,
    handleReload,
  } = useTeamOverviewScreenLogic();

  // Loading and error handling remain the same...
  if (isLoading) return <TeamOverviewScreenSkeleton />;
  if (requestError) {
    return (
      <ScrollView style={styles.container}>
        <ErrorModalComponent
          isVisible
          errorMessage={errorMessage}
          showCloseIcon={false}
          secondaryActionLabel="Reintentar"
          secondaryActionHandler={handleReload}
        />
        <TeamOverviewScreenSkeleton />
      </ScrollView>
    );
  }

  // Feedback user section remains the same...
  if (!team || !teamAllTimeStats || !teamPlayerUserList) {
    return (
      <BasketColLayout>
        <View style={styles.container}>
          <FeedbackBannerComponent
            theme={theme}
            themeMode={themeMode}
            subtitle="¡Únete a un Equipo!"
            description="Para competir en BasketCol necesitas ser parte de un equipo. Puedes crear tu propio equipo y ser capitán o unirte a uno existente. ¡Los mejores jugadores brillan en equipo! 🏀"
            accentColor={theme.colors.tertiary}
            primaryAction={{
              label: '',
              onPress: () => {},
            }}
          />
        </View>
      </BasketColLayout>
    );
  }

  const renderTeamHeader = () => (
    <ImageBackground
      source={{ uri: team.mainImage.url }}
      style={styles.teamHeaderContainer}
      resizeMode="cover"
    >
      <View style={styles.teamHeaderOverlay}>
        <Image
          source={{ uri: team.logo.url }}
          style={styles.teamLogo}
          resizeMode="contain"
        />
        <Text style={styles.teamName}>{team.officialName}</Text>
        <Text style={styles.teamGender}>{team.gender}</Text>
      </View>
    </ImageBackground>
  );

  const renderTeamStats = () => (
    <TeamStatsSectionComponent
      stats={teamAllTimeStats}
      theme={theme}
      themeMode={themeMode}
    />
  );

  const renderTeamRoster = () => (
    <View style={styles.teamRosterContainer}>
      <View style={styles.playerCardGrid}>
        {teamPlayerUserList.map((teamPlayerHttpResponseDTO) => {
          const {
            isCurrentUser,
            teamPlayerHttpResponseDTO: teamPlayer,
            onPress,
          } = renderPlayerCard(teamPlayerHttpResponseDTO);

          return (
            <View
              key={teamPlayer.id}
              style={{ width: Dimensions.get('window').width / 2 - 30 }}
            >
              <PlayerUserCardComponent
                firstName={teamPlayer.playerUser.name.firstName}
                lastName={teamPlayer.playerUser.name.lastName}
                profileImage={teamPlayer.playerUser.profileImage}
                position={teamPlayer.position || ''}
                teamLogo={null}
                showFullPosition
                appTheme={theme}
                themeMode={themeMode}
                isCurrentUser={isCurrentUser}
                isSmall
                onPress={onPress}
              />
            </View>
          );
        })}
      </View>
    </View>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'roster':
        return renderTeamRoster();
      case 'stats':
        return renderTeamStats();
      default:
        return null;
    }
  };

  return (
    <BasketColLayout>
      <ScrollView style={styles.container}>
        {renderTeamHeader()}
        <SectionTabsComponent
          sections={TEAM_SECTIONS}
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
