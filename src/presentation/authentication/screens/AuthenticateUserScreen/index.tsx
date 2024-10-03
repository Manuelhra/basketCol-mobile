import React, { useEffect, useState } from 'react';
import {
  HostUserType,
  IDomainErrorPrimitives,
  LeagueFounderUserType,
  PlayerUserType,
  RefereeUserType,
  TeamFounderUserType,
} from '@basketcol/domain';
import { useSelector } from 'react-redux';
import { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import {
  View,
  StatusBar,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  HelperText,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { RootState } from '../../../shared/store/redux/rootReducer';
import { getStyles } from './styles';
import { useAuthenticateUserForm } from '../../hooks/formik/useAuthenticateUserForm';
import { authenticateUserSchema } from '../../hooks/formik/schemas/authenticate-user.schema';
import { useAuthenticateUser } from '../../hooks/tan-stack-query/useAuthenticateUser';
import { authenticateUserUseCase } from '../../../../basketCol/authentication/infrastructure/dependency-injection';

type InitialValues = Yup.InferType<typeof authenticateUserSchema>;

const validUserTypes = [
  { value: PlayerUserType.value, label: 'Jugador' },
  { value: HostUserType.value, label: 'Anfitrión' },
  { value: LeagueFounderUserType.value, label: 'Fundador de Liga' },
  { value: RefereeUserType.value, label: 'Árbitro' },
  { value: TeamFounderUserType.value, label: 'Fundador de Equipo' },
];

export function AuthenticateUserScreen(): React.JSX.Element {
  const appTheme = useSelector((state: RootState) => state.theme.theme);
  const [authenticateUserErrorList, setAuthenticateUserErrorList] = useState<IDomainErrorPrimitives[]>([]);
  const styles = getStyles(appTheme);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const {
    mutate: authenticateUser,
    isPending,
    data,
  } = useAuthenticateUser(authenticateUserUseCase);

  useEffect(() => {
    if (data?.isLeft) {
      const domainError = data.left();
      const errorList = domainError.type === 'single'
        ? [domainError.error.toPrimitives]
        : domainError.errors.map((error) => error.toPrimitives);

      setAuthenticateUserErrorList(errorList);
    } else {
      setAuthenticateUserErrorList([]);
    }
  }, [data]);

  const handleSubmit = async (
    values: InitialValues,
    { setSubmitting }: FormikHelpers<InitialValues>,
  ) => {
    const { userType, password, ...otherProps } = values;
    const authData = {
      userType,
      password,
      ...(userType === PlayerUserType.value
        ? { nickname: otherProps.nickname }
        : { email: otherProps.email }),
    };

    authenticateUser(authData);
    setSubmitting(false);
  };

  const formik = useAuthenticateUserForm({ onSubmit: handleSubmit });
  const toggleSelect = () => setIsSelectOpen(!isSelectOpen);

  const handleInputChange = (fieldName: string) => (text: string) => {
    formik.handleChange(fieldName)(text);
    setAuthenticateUserErrorList([]);
  };

  const handleSelectOption = (value: string) => {
    formik.setFieldValue('userType', value);
    toggleSelect();
    setAuthenticateUserErrorList([]);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <KeyboardAvoidingView
        // TODO: Validar en iOS si se necesita el behavior
        // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >

        <StatusBar translucent backgroundColor="transparent" />
        <ImageBackground
          source={require('../../assets/images/background-image-user-authentication.jpg')}
          style={styles.backgroundImage}
        >
          <View style={styles.glassContainer}>
            <View style={styles.glassPane}>
              <View style={styles.glassPaneInner} />
              <View style={styles.glassPaneBorder} />
            </View>
            <ScrollView contentContainerStyle={styles.content}>
              <Icon name="basketball" size={80} color={appTheme.colors.primary} />
              <Text style={styles.logo}>Basketcol</Text>

              {authenticateUserErrorList.length > 0 && (
                <View style={styles.errorContainer}>
                  {authenticateUserErrorList.map((error) => (
                    <Text key={`${error.name}.${error.message}`} style={styles.errorText}>
                      {error.message}
                    </Text>
                  ))}
                </View>
              )}

              <TouchableOpacity onPress={toggleSelect} style={styles.selectContainer}>
                <Text style={styles.selectText}>
                  {formik.values.userType ? validUserTypes.find((t) => t.value === formik.values.userType)?.label : 'Selecciona tipo de usuario'}
                </Text>
                <Icon name="chevron-down" size={24} color={appTheme.colors.text} style={styles.selectIcon} />
              </TouchableOpacity>
              {formik.touched.userType && formik.errors.userType && (
              <HelperText type="error" style={styles.errorText}>{formik.errors.userType}</HelperText>
              )}

              {formik.values.userType === PlayerUserType.value ? (
                <TextInput
                  label="Apodo"
                  mode="outlined"
                  style={styles.input}
                  value={formik.values.nickname}
                  onChangeText={handleInputChange('nickname')}
                  onBlur={formik.handleBlur('nickname')}
                  error={!!(formik.touched.nickname && formik.errors.nickname)}
                  left={<TextInput.Icon icon="account" />}
                  theme={{ colors: { text: appTheme.colors.text, primary: appTheme.colors.primary } }}
                />
              ) : (
                <TextInput
                  label="Correo electrónico"
                  mode="outlined"
                  style={styles.input}
                  value={formik.values.email}
                  onChangeText={handleInputChange('email')}
                  onBlur={formik.handleBlur('email')}
                  error={!!(formik.touched.email && formik.errors.email)}
                  left={<TextInput.Icon icon="email" />}
                  theme={{ colors: { text: appTheme.colors.text, primary: appTheme.colors.primary } }}
                />
              )}
              {formik.touched.nickname && formik.errors.nickname && (
              <HelperText type="error" style={styles.errorText}>{formik.errors.nickname}</HelperText>
              )}
              {formik.touched.email && formik.errors.email && (
              <HelperText type="error" style={styles.errorText}>{formik.errors.email}</HelperText>
              )}

              <TextInput
                label="Contraseña"
                mode="outlined"
                secureTextEntry
                style={styles.input}
                value={formik.values.password}
                onChangeText={handleInputChange('password')}
                onBlur={formik.handleBlur('password')}
                error={!!(formik.touched.password && formik.errors.password)}
                left={<TextInput.Icon icon="lock" />}
                theme={{ colors: { text: appTheme.colors.text, primary: appTheme.colors.primary } }}
              />
              {formik.touched.password && formik.errors.password && (
              <HelperText type="error" style={styles.errorText}>{formik.errors.password}</HelperText>
              )}

              <Button
                mode="contained"
                style={styles.button}
                labelStyle={styles.buttonLabel}
                icon="login"
                onPress={() => formik.handleSubmit()}
                disabled={formik.isSubmitting || isPending}
              >
                { isPending ? 'Cargando...' : 'Iniciar sesión' }
              </Button>
              <Button
                mode="text"
                style={styles.forgotPassword}
              >
                ¿Olvidaste tu contraseña?
              </Button>
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
