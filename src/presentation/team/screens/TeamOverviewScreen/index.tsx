import React from 'react';
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

export function TeamOverviewScreen() {
  const { theme, themeMode } = useSelector((state: RootState) => state.theme);
  const styles = getStyles(theme, themeMode);

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

  // Comprehensive loading and error handling
  if (isLoading) {
    return <TeamOverviewScreenSkeleton />;
  }

  // Error handling
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

  // Feedback user
  if (!team || !teamAllTimeStats || !teamPlayerUserList) {
    return (
      <BasketColLayout>
        <View style={{
          flex: 1,
          padding: 15,
          backgroundColor: theme.colors.background,
        }}
        >
          <FeedbackBannerComponent
            theme={theme}
            themeMode={themeMode}
            subtitle="¡Únete a un Equipo!"
            description="Para competir en BasketCol necesitas ser parte de un equipo. Puedes crear tu propio equipo y ser capitán o unirte a uno existente. ¡Los mejores jugadores brillan en equipo! 🏀"
            accentColor={theme.colors.tertiary} // Usando un color diferente al primary para destacar
            primaryAction={{
              label: '',
              onPress: () => {},
            // onPress: handleCreateTeam,
            }}
/*             secondaryAction={{
              label: 'Explorar Equipos',
            onPress: handleExploreTeams,
            }} */
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
    <View style={styles.teamStatsContainer}>
      <View style={styles.statBox}>
        <Text style={styles.statValue}>
          {teamAllTimeStats.totalGamesPlayed}
        </Text>
        <Text style={styles.statLabel}>Total Games</Text>
      </View>
      <View style={styles.statBox}>
        <Text style={styles.statValue}>
          {teamAllTimeStats.totalGamesWon}
        </Text>
        <Text style={styles.statLabel}>Games Won</Text>
      </View>
      <View style={styles.statBox}>
        <Text style={styles.statValue}>
          {((teamAllTimeStats.totalGamesWon
            / teamAllTimeStats.totalGamesPlayed) * 100).toFixed(1)}
          %
        </Text>
        <Text style={styles.statLabel}>Win Rate</Text>
      </View>
      <View style={styles.statBox}>
        <Text style={styles.statValue}>
          {(teamAllTimeStats.totalPoints
            / teamAllTimeStats.totalGamesPlayed).toFixed(1)}
        </Text>
        <Text style={styles.statLabel}>PPG</Text>
      </View>
    </View>
  );

  const renderTeamRoster = () => (
    <View style={styles.teamRosterContainer}>
      <Text style={styles.sectionTitle}>Team Roster</Text>
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

  return (
    <BasketColLayout>
      <ScrollView style={styles.container}>
        {renderTeamHeader()}
        {renderTeamStats()}
        {renderTeamRoster()}
      </ScrollView>
    </BasketColLayout>
  );
}
