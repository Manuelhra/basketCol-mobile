import React from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '../../../../store/redux/rootReducer';

type HostUserHomeScreenProps = {};

export const HostUserHomeScreen = ({}: HostUserHomeScreenProps): React.JSX.Element => {
  const mode = useSelector((state: RootState) => state.theme.mode);

  return (
    <View style={{ backgroundColor: 'black' }}>
      <Text>{`Host User Home Screen: ${mode}`}</Text>
    </View>
  );
};
