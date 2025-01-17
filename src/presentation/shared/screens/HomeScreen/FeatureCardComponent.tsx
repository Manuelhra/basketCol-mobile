import React from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { getStyles } from './styles';
import { RootState } from '../../store/redux/rootReducer';
import { MaterialCommunityIconComponent } from '../../components/MaterialCommunityIconComponent';

type FeatureCardComponentProps = {
  title: string;
  description: string;
  icon: string;
};

export function FeatureCardComponent({
  title,
  description,
  icon,
}: FeatureCardComponentProps): React.JSX.Element {
  const { theme, themeMode } = useSelector((state: RootState) => state.theme);
  const styles = getStyles(theme, themeMode);

  return (
    <View style={styles.featureContainer}>
      <View style={styles.featureIconContainer}>
        <MaterialCommunityIconComponent
          name={icon}
          size={28}
          color={themeMode === 'light' ? theme.colors.quaternary : '#FFFFFF'}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </View>
  );
}
