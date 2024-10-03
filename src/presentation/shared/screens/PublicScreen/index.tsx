import React from 'react';
import { Text, View } from 'react-native';

type PublicScreenProps = {};

export const PublicScreen = ({}: PublicScreenProps): React.JSX.Element => {
  return (
    <View>
      <Text>Public Screen</Text>
    </View>
  );
};
