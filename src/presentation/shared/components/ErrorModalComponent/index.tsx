import React from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '../../store/redux/rootReducer';
import { MaterialCommunityIconComponent } from '../MaterialCommunityIconComponent';
import { getStyles } from './styles';

type ErrorModalComponentProps = {
  isVisible: boolean;
  errorMessage?: string;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  showCloseIcon?: boolean;
  onClose?: () => void;
  primaryActionHandler?: () => void;
  secondaryActionHandler?: () => void;
};

export function ErrorModalComponent({
  isVisible,
  errorMessage,
  primaryActionLabel,
  secondaryActionLabel,
  onClose,
  primaryActionHandler,
  secondaryActionHandler,
  showCloseIcon = true,
}: ErrorModalComponentProps): React.JSX.Element {
  const { theme, themeMode } = useSelector((state: RootState) => state.theme);
  const styles = getStyles(theme);

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {showCloseIcon && (
            <TouchableOpacity
              style={styles.closeIconContainer}
              onPress={onClose}
            >
              <MaterialCommunityIconComponent
                name="close"
                size={24}
                color={theme.colors.text}
              />
            </TouchableOpacity>
          )}

          <View style={styles.errorIconContainer}>
            <MaterialCommunityIconComponent
              name={themeMode === 'light' ? 'alert' : 'alert-outline'}
              size={40}
              color={theme.colors.background}
            />
          </View>

          <Text style={styles.messageText}>
            {errorMessage}
          </Text>

          <View style={styles.buttonContainer}>
            {primaryActionLabel && primaryActionHandler && (
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={primaryActionHandler}
              >
                <Text style={styles.primaryButtonText}>
                  {primaryActionLabel}
                </Text>
              </TouchableOpacity>
            )}

            {secondaryActionLabel && secondaryActionHandler && (
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={secondaryActionHandler}
              >
                <Text style={styles.secondaryButtonText}>
                  {secondaryActionLabel}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}
