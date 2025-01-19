import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import { ITheme } from '../../config/theme/ITheme';
import { ThemeMode } from '../../store/redux/slices/theme/theme.slice';
import { getStyles } from './styles';

interface Action {
  label: string;
  onPress: () => void;
  isPrimary?: boolean;
}

interface FeedbackBannerComponentProps {
  theme: ITheme;
  themeMode: ThemeMode;
  subtitle: string;
  description: string;
  accentColor?: string;
  primaryAction?: Action;
  secondaryAction?: Action;
  showLogo?: boolean;
}

export function FeedbackBannerComponent({
  theme,
  themeMode,
  subtitle,
  description,
  accentColor = theme.colors.primary,
  primaryAction,
  secondaryAction,
  showLogo = true,
}: FeedbackBannerComponentProps) {
  const styles = getStyles(theme, themeMode, accentColor);

  return (
    <View style={styles.wrapper}>
      <View style={styles.backgroundOverlay} />
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          {showLogo && (
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/images/logo-basketcol.jpeg')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
          )}

          <Text style={styles.headerText}>BASKETCOL INFORMA</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <Text style={styles.description}>{description}</Text>

          {(primaryAction || secondaryAction) && (
            <View style={styles.actionsContainer}>
              {secondaryAction && (
                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={secondaryAction.onPress}
                >
                  <Text style={styles.secondaryButtonText}>
                    {secondaryAction.label}
                  </Text>
                </TouchableOpacity>
              )}

              {primaryAction && (
                <TouchableOpacity
                  style={[
                    styles.primaryButton,
                    !secondaryAction && styles.fullWidthButton,
                  ]}
                  onPress={primaryAction.onPress}
                >
                  <Text style={styles.primaryButtonText}>
                    {primaryAction.label}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
