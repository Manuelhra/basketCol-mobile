import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { useFindCareerStatsByPlayerUserId } from './tan-stack-query/useFindCareerStatsByPlayerUserId';
import { findCareerStatsByPlayerUserIdUseCase } from '../../../../basketCol/users/player/career-stats/infrastructure/dependency-injection';
import { AppDispatch } from '../../../shared/store/redux/store';
import { logoutUser } from '../../../authentication/store/redux/slices/authentication.slice';

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
  const [activeSection, setActiveSection] = useState('attributes');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const { theme, themeMode } = useSelector((state: RootState) => state.theme);
  const { authenticatedUser, loading: SigningOut } = useSelector((state: RootState) => state.authentication);
  const navigation = useNavigation<NavigationProp<PlayerUserBottomNavigatorParamList, 'myProfileScreen'>>();
  const { params, name } = useRoute<RouteProp<PlayerUserBottomNavigatorParamList, 'myProfileScreen'>>();
  const dispatch = useDispatch<AppDispatch>();
  const [activeSubcategoryId, setActiveSubcategoryId] = useState<string | undefined>();

  const handleLogout = async () => {
    setActiveSubcategoryId('1-2'); // ID del botón de logout
    try {
      await dispatch(logoutUser());
    } finally {
      setActiveSubcategoryId(undefined);
    }
  };

  const settingsCategories = [
    {
      id: '2',
      title: 'Preferencias',
      subcategories: [
        {
          id: '2-1',
          title: 'Notificaciones',
          icon: 'bell',
          // action: () => handleNotificationSettings(),
        },
        {
          id: '2-2',
          title: 'Tema',
          icon: 'palette',
          // action: () => handleThemeChange(),
        },
      ],
    },
    {
      id: '1',
      title: 'Inicio de sesión',
      subcategories: [
        {
          id: '1-1',
          title: 'Cambiar contraseña',
          icon: 'key',
          // action: () => handlePasswordChange(),
        },
        {
          id: '1-2',
          title: SigningOut ? 'Cerrando sesión...' : 'Cerrar sesión',
          icon: 'logout',
          isLoading: SigningOut,
          action: handleLogout,
        },
      ],
    },
  ];

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
    isLoading: isLoadingCareerStats,
    requestError: careerStatsError,
    playerUserCareerStats,
  } = useFindCareerStatsByPlayerUserId(findCareerStatsByPlayerUserIdUseCase, params.isMyProfileScreen ? authenticatedUser?.id ?? '' : params.playerUserId);

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
  const isLoading = isLoadingAttributes || isLoadingTeam || isLoadingCareerStats;
  const requestError = attributesError || teamError || careerStatsError;

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
    playerUserCareerStats: playerUserCareerStats?.toPrimitives,
    settingsCategories,
    activeSection,
    showSettingsModal,
    activeSubcategoryId,
    setShowSettingsModal,
    setActiveSection,
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
