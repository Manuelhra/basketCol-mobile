import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  CommonActions,
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { RootState } from '../../../shared/store/redux/rootReducer';
import { useGetPlayerUserAttributeCategories } from './tan-stack-query/useGetPlayerUserAttributeCategories';
import { getPlayerUserAttributeCategoriesUseCase } from '../../../../basketCol/users/player/attributes/shared/infrastructure/dependency-injection';
import { useFindTeamActivePlayer } from './tan-stack-query/useFindTeamActivePlayer';
import { findTeamActivePlayerUseCase } from '../../../../basketCol/team/team-player/infrastructure/dependency-injection';
import { type PlayerUserBottomNavigatorParamList } from '../navigation/PlayerUserBottomNavigator';

// Función auxiliar para extraer datos de manera segura
const safeExtractPrimitives = <T>(obj: { toPrimitives?: T } | null | undefined): T | null => obj?.toPrimitives ?? null;

// Función auxiliar para extraer atributos
const extractAttributes = (attributes: BaseAttributes | null | undefined): Record<string, number> | null => {
  if (!attributes) return null;
  const {
    id,
    createdAt,
    updatedAt,
    playerUserId,
    ...rest
  } = attributes;
  return rest;
};

export const usePlayerUserProfileOverviewScreenLogic = () => {
  const { theme, themeMode } = useSelector((state: RootState) => state.theme);
  const { authenticatedUser } = useSelector((state: RootState) => state.authentication);
  const navigation = useNavigation<NavigationProp<PlayerUserBottomNavigatorParamList, 'myProfileScreen'>>();
  const { params, name } = useRoute<RouteProp<PlayerUserBottomNavigatorParamList, 'myProfileScreen'>>();

  const handleReload = useCallback(() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{
          name,
          params: params.isMyProfileScreen ? { isMyProfileScreen: true } : { isMyProfileScreen: false, playerUserId: params.playerUserId },
        }],
      }),
    );
  }, [navigation]);

  const {
    isLoading: isLoadingAttributes,
    requestError: attributesError,
    playerUserAttributeCategories,
  } = useGetPlayerUserAttributeCategories(
    getPlayerUserAttributeCategoriesUseCase,
    params.isMyProfileScreen ? authenticatedUser?.id ?? '' : params.playerUserId,
  );

  const {
    isLoading: isLoadingTeam,
    requestError: teamError,
    teamActivePlayer,
  } = useFindTeamActivePlayer(findTeamActivePlayerUseCase, params.isMyProfileScreen ? authenticatedUser?.id ?? '' : params.playerUserId);

  const processedAttributes: ProcessedAttributes = {
    defensive: extractAttributes(safeExtractPrimitives(playerUserAttributeCategories?.defensiveAttributes)),
    physical: extractAttributes(safeExtractPrimitives(playerUserAttributeCategories?.physicalAttributes)),
    finishing: extractAttributes(safeExtractPrimitives(playerUserAttributeCategories?.finishingAttributes)),
    shooting: extractAttributes(safeExtractPrimitives(playerUserAttributeCategories?.shootingAttributes)),
    skill: extractAttributes(safeExtractPrimitives(playerUserAttributeCategories?.skillAttributes)),
    rebounding: extractAttributes(safeExtractPrimitives(playerUserAttributeCategories?.reboundingAttributes)),
  };

  // Combinar estados de carga y errores
  const isLoading = isLoadingAttributes || isLoadingTeam;
  const requestError = attributesError || teamError;

  return {
    theme,
    themeMode,
    isLoading,
    requestError,
    processedAttributes: isLoading ? null : processedAttributes,
    teamActivePlayer: isLoading || !teamActivePlayer ? null : {
      teamPlayer: safeExtractPrimitives(teamActivePlayer.teamPlayer),
      teamInfo: safeExtractPrimitives(teamActivePlayer.teamInfo),
      playerUserInfo: safeExtractPrimitives(teamActivePlayer.playerUserInfo),
    },
    authenticatedUser,
    handleReload,
  };
};

interface BaseAttributes {
  id: string;
  createdAt: string;
  updatedAt: string;
  playerUserId: string;
  [key: string]: any;
}

interface ProcessedAttributes {
  defensive: Record<string, number> | null;
  physical: Record<string, number> | null;
  finishing: Record<string, number> | null;
  shooting: Record<string, number> | null;
  skill: Record<string, number> | null;
  rebounding: Record<string, number> | null;
}
