import React, { useRef } from 'react';
import {
  Modal,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '../../store/redux/rootReducer';
import { getStyles } from './styles';
import { MaterialCommunityIconComponent } from '../MaterialCommunityIconComponent';

type SlideModalComponentProps = {
  isVisible: boolean;
  children: React.ReactNode;
  headerTitle?: string;
  onClose: () => void;
};

export function SlideModalComponent({
  children,
  isVisible,
  headerTitle,
  onClose,
}: SlideModalComponentProps): React.JSX.Element {
  const { theme } = useSelector((state: RootState) => state.theme);
  const slideAnimation = useRef(new Animated.Value(1)).current;
  const styles = getStyles(theme, Dimensions.get('window').width);

  const slideInModal = () => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const slideOutModal = () => {
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(onClose);
  };

  React.useEffect(() => {
    if (isVisible) {
      slideInModal();
    }
  }, [isVisible]);

  return (
    <Modal
      visible={isVisible}
      animationType="none"
      transparent
      onRequestClose={slideOutModal}
    >
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{
              translateX: slideAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, Dimensions.get('window').width],
              }),
            }],
            zIndex: 1000,
          },
        ]}
      >
        {/* Header Section */}
        <Animated.View style={styles.header}>
          <TouchableOpacity
            onPress={slideOutModal}
          >
            <MaterialCommunityIconComponent
              name="close"
              size={30}
              color={theme.colors.text}
            />
          </TouchableOpacity>
          {headerTitle && (
            <Animated.Text style={styles.headerTitle}>
              {headerTitle}
            </Animated.Text>
          )}
        </Animated.View>

        {/* Modal Content */}
        {children}
      </Animated.View>
    </Modal>
  );
}
