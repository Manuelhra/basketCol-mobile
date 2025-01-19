import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { ITheme } from '../../config/theme/ITheme';
import { ThemeMode } from '../../store/redux/slices/theme/theme.slice';
import { MaterialCommunityIconComponent } from '../MaterialCommunityIconComponent';
import { getStyles } from './styles';

interface Action {
  label: string;
  onPress: () => void;
}

type EmptySeasonSectionComponentProps = {
  theme: ITheme;
  themeMode: ThemeMode;
  iconName: string;
  title: string;
  description: string;
  accentColor?: string;
  screenWidth: number;
  action?: Action;
};

export function EmptySectionComponent({
  theme,
  themeMode,
  iconName,
  title,
  description,
  accentColor = theme.colors.primary,
  screenWidth,
  action,
}: EmptySeasonSectionComponentProps): React.JSX.Element {
  const styles = getStyles(theme, themeMode, accentColor);

  return (
    <View style={[styles.emptyCard, { width: screenWidth * 0.7 }]}>
      <MaterialCommunityIconComponent
        name={iconName}
        color={accentColor}
        size={32}
      />
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyDescription}>
        { description }
      </Text>
      {action && (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={action.onPress}
        >
          <Text style={styles.actionButtonText}>{action.label}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
