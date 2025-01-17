import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { getStyles } from './styles';
import { RootState } from '../../store/redux/rootReducer';
import { MaterialCommunityIconComponent } from '../../components/MaterialCommunityIconComponent';

type ComingSoonItemComponentProps = {
  title: string;
  icon: string;
};

export function ComingSoonItemComponent({ title, icon }: ComingSoonItemComponentProps): React.JSX.Element {
  const { theme, themeMode } = useSelector((state: RootState) => state.theme);
  const { width } = Dimensions.get('window');
  const ITEM_WIDTH = (width - (theme.spacing.medium * 6)) / 2;
  const styles = getStyles(theme, themeMode, ITEM_WIDTH);

  return (
    <View style={styles.comingSoonContainer}>
      <View style={styles.comingSoonIconContainer}>
        <MaterialCommunityIconComponent
          name={icon}
          size={24}
          color={themeMode === 'light' ? '#FFFFFF' : theme.colors.quaternary}
        />
      </View>
      <Text style={styles.comingSoonTitle}>{title}</Text>
      <View style={styles.comingSoonBadge}>
        <Text style={styles.comingSoonText}>Próximamente</Text>
      </View>
    </View>
  );
}
