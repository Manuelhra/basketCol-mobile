import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { logoutUser } from '../../../authentication/store/redux/slices/authentication.slice';
import { AppDispatch } from '../../store/redux/store';

export function PublicScreen(): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogoutUser = () => {
    dispatch(logoutUser());
  };

  return (
    <View>
      <Text>Public Screen</Text>
      <Button onPress={() => handleLogoutUser()}>Cerrar sesión</Button>
    </View>
  );
}
