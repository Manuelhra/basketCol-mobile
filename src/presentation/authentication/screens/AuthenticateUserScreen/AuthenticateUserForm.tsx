import React from 'react';
import * as Yup from 'yup';
import { PlayerUserType } from '@basketcol/domain';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { FormikProps } from 'formik';
import {
  TextInput,
  Button,
  Text,
  HelperText,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getStyles } from './styles';
import { RootState } from '../../../shared/store/redux/rootReducer';
import { authenticateUserSchema } from '../../hooks/formik/schemas/authenticate-user.schema';

type InitialValues = Yup.InferType<typeof authenticateUserSchema>;

type AuthenticateUserFormProps = {
  formik: FormikProps<InitialValues>;
  isPending: boolean;
  validUserTypes: {
    value: string;
    label: string;
  }[];
  handleInputChange: (name: keyof InitialValues) => (text: string) => void;
  toggleSelect: () => void;
};

export function AuthenticateUserForm({
  formik,
  isPending,
  validUserTypes,
  handleInputChange,
  toggleSelect,
}: AuthenticateUserFormProps): React.JSX.Element {
  const appTheme = useSelector((state: RootState) => state.theme.theme);
  const styles = getStyles(appTheme);

  return (
    <>
      <TouchableOpacity onPress={() => toggleSelect()} style={styles.selectContainer}>
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
    </>
  );
}
