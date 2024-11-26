import React, { useEffect, useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../shared/store/redux/rootReducer';
import { checkAuthenticationToken } from '../../store/redux/slices/authentication.slice';
import { MainStackNavigatorParamList } from '../../../shared/navigation/MainStackNavigator';
import { AppDispatch } from '../../../shared/store/redux/store';

type AuthenticationProviderProps = {
  children: React.ReactNode;
};

export function AuthenticationProvider({ children }: AuthenticationProviderProps): React.JSX.Element {
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.authentication);
  const [delayCompleted, setDelayCompleted] = useState(false);
  const [authenticationChecked, setAuthenticationChecked] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp<MainStackNavigatorParamList>>();

  useEffect(() => {
    dispatch(checkAuthenticationToken()).unwrap().finally(() => {
      setAuthenticationChecked(true);
    });
  }, [dispatch]);

  useEffect(() => {
    if (authenticationChecked === true && loading === false) {
      const splashDelay = setTimeout(() => {
        setDelayCompleted(true);
      }, 2000);

      return () => clearTimeout(splashDelay);
    }

    return undefined;
  }, [authenticationChecked, loading]);

  useEffect(() => {
    if (delayCompleted === false) { return; }

    if (isAuthenticated === false) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'authenticateUserScreen' }],
      });
    }

    if (isAuthenticated === true) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'userBottomNavigator' }],
      });
    }
  }, [isAuthenticated, navigation, delayCompleted]);

  return (
    <>
      {children}
    </>
  );
}
