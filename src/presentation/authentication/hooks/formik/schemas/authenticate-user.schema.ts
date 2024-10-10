import {
  HostUserType,
  LeagueFounderUserType,
  PlayerUserType,
  RefereeUserType,
  TeamFounderUserType,
  UserPassword,
} from '@basketcol/domain';
import * as Yup from 'yup';

const validUserTypes = [
  PlayerUserType.value,
  HostUserType.value,
  LeagueFounderUserType.value,
  RefereeUserType.value,
  TeamFounderUserType.value,
];

export const authenticateUserSchema = Yup.object().shape({
  userType: Yup.string()
    .required('El tipo de usuario es obligatorio')
    .oneOf(validUserTypes, `El tipo de usuario debe ser uno de los siguientes: ${validUserTypes.join(', ')}`),
  nickname: Yup.string().when('userType', {
    is: PlayerUserType.value,
    then: () => Yup.string()
      .required('El apodo es obligatorio para los jugadores')
      .trim()
      .min(1, 'El apodo no puede estar vacío'),
    otherwise: () => Yup.string().notRequired(),
  }),
  email: Yup.string()
    .email('Debes proporcionar una dirección de correo electrónico válida')
    .when('userType', {
      is: PlayerUserType.value,
      then: () => Yup.string().notRequired(),
      otherwise: () => Yup.string().required('El correo electrónico es obligatorio'),
    })
    .transform((value) => value?.toLowerCase()),
  password: Yup.string()
    .required('La contraseña es obligatoria')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(
      UserPassword.passwordRegExp,
      UserPassword.getRequirementsAsString(),
    ),
});
