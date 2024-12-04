import React from 'react';
import { useSelector } from 'react-redux';
import {
  View,
  StatusBar,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Text } from 'react-native-paper';

import { RootState } from '../../../shared/store/redux/rootReducer';
import { getStyles } from './styles';
import { useAuthenticateUserScreenLogic } from '../../hooks/useAuthenticateUserScreenLogic';
import { AuthenticateUserForm } from './AuthenticateUserForm';
import { MaterialCommunityIconComponent } from '../../../shared/components/MaterialCommunityIconComponent';

export function AuthenticateUserScreen(): React.JSX.Element {
  const appTheme = useSelector((state: RootState) => state.theme.theme);
  const styles = getStyles(appTheme);
  const {
    formik,
    isPending,
    validUserTypes,
    isSelectOpen,
    authenticateUserErrorList,
    toggleSelect,
    handleSelectOption,
    handleInputChange,
  } = useAuthenticateUserScreenLogic();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <KeyboardAvoidingView
        // TODO: Validar en iOS si se necesita el behavior
        // TODO: En el useAuthenticateUser, agregar data del usuario al cache y si hay un error eliminarla
        // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >

        <StatusBar translucent backgroundColor="transparent" />
        <ImageBackground
          source={require('../../assets/images/background-image-user-authentication-screen.jpg')}
          style={styles.backgroundImage}
        >
          <View style={styles.glassContainer}>
            <View style={styles.glassPane}>
              <View style={styles.glassPaneInner} />
              <View style={styles.glassPaneBorder} />
            </View>
            <ScrollView contentContainerStyle={styles.content}>
              <MaterialCommunityIconComponent name="basketball" size={80} color={appTheme.colors.primary} />
              <Text style={styles.logo}>Basketcol</Text>

              {authenticateUserErrorList.length > 0 && (
                <View style={styles.errorContainer}>
                  {authenticateUserErrorList.map(({ toPrimitives }) => (
                    <Text key={`${toPrimitives.name}.${toPrimitives.message}`} style={styles.errorText}>
                      {toPrimitives.message}
                    </Text>
                  ))}
                </View>
              )}

              <AuthenticateUserForm
                formik={formik}
                isPending={isPending}
                validUserTypes={validUserTypes}
                handleInputChange={handleInputChange}
                toggleSelect={toggleSelect}
              />

            </ScrollView>
          </View>
        </ImageBackground>

        <Modal
          visible={isSelectOpen}
          transparent
          animationType="fade"
          onRequestClose={toggleSelect}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {validUserTypes.map((type) => (
                <TouchableOpacity
                  key={type.value}
                  style={styles.modalOption}
                  onPress={() => handleSelectOption(type.value)}
                >
                  <Text style={styles.modalOptionText}>{type.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
