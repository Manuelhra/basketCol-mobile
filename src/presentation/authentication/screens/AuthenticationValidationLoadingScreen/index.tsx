import React from 'react';
import { View, Text } from 'react-native';

import { styles } from './styles';

type AuthenticationValidationLoadingScreenProps = {};

export function AuthenticationValidationLoadingScreen({}: AuthenticationValidationLoadingScreenProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.viewText}>Welcome to Product App</Text>
      {/* TODO: Crear spinner */}
    </View>
  );
}
