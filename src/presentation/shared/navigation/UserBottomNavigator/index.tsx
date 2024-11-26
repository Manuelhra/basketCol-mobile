import React, { useEffect, useState } from 'react';
import { Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { PlayerUserType } from '@basketcol/domain';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { RootState } from '../../store/redux/rootReducer';
import { type MainStackNavigatorParamList } from '../MainStackNavigator';
import { UnknownUserTypeScreen } from '../../screens/UnknownUserTypeScreen';
import { useGetAuthenticatedUserByAuthToken } from '../../hooks/useGetAuthenticatedUserByAuthToken';
import { getAuthenticatedUserByAuthTokenUseCase } from '../../../../basketCol/authentication/infrastructure/dependency-injection';
import { AppDispatch } from '../../store/redux/store';
import { authenticationActions } from '../../../authentication/store/redux/slices/authentication.slice';
import { PlayerUserBottomNavigator } from '../../../users/player/navigation/PlayerUserBottomNavigator';

export function UserBottomNavigator(): React.JSX.Element | null {
  const { isAuthenticated, authenticatedUser } = useSelector((state: RootState) => state.authentication);
  const navigation = useNavigation<NavigationProp<MainStackNavigatorParamList>>();
  const [shouldFetchUser, setShouldFetchUser] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const {
    isLoading,
    // TODO: Manejar requestError,
    authenticatedUser: authenticatedUserFromHook,
  } = useGetAuthenticatedUserByAuthToken(getAuthenticatedUserByAuthTokenUseCase, { enabled: shouldFetchUser });

  useEffect(() => {
    if (isAuthenticated === false) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'authenticateUserScreen' }],
      });
    } else if (isAuthenticated === true && authenticatedUser === null) {
      setShouldFetchUser(true);
    }
  }, [isAuthenticated, authenticatedUser]);

  useEffect(() => {
    if (authenticatedUserFromHook !== null) {
      dispatch(authenticationActions.setAuthenticatedUser(authenticatedUserFromHook.toPrimitives));
      setShouldFetchUser(false);
    }
  }, [authenticatedUserFromHook]);

  if (isLoading) {
    // TODO: Terminar de maquetar, crear componente reutilizable
    return <Text>Loading...</Text>;
  }

  if (authenticatedUser === null) {
    return null;
  }

  switch (authenticatedUser.type) {
    case PlayerUserType.value: return <PlayerUserBottomNavigator />;
    default: return <UnknownUserTypeScreen />;
  }
}
