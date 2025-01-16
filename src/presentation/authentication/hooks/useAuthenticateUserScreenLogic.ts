import { useEffect, useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import {
  DomainError,
  HostUserType,
  LeagueFounderUserType,
  PlayerUserType,
  RefereeUserType,
  TeamFounderUserType,
} from '@basketcol/domain';

import { useAuthenticateUserForm } from './formik/useAuthenticateUserForm';
import { authenticateUserSchema } from './formik/schemas/authenticate-user.schema';
import { authenticationActions } from '../store/redux/slices/authentication.slice';
import { useAuthenticateUser } from './tan-stack-query/useAuthenticateUser';
import { RootState } from '../../shared/store/redux/rootReducer';
import { AppDispatch } from '../../shared/store/redux/store';
import { type MainStackNavigatorParamList } from '../../shared/navigation/MainStackNavigator';
import { authenticateUserUseCase } from '../../../basketCol/authentication/infrastructure/dependency-injection';

type InitialValues = Yup.InferType<typeof authenticateUserSchema>;

const validUserTypes = [
  { value: PlayerUserType.value, label: 'Jugador' },
  { value: HostUserType.value, label: 'Anfitrión' },
  { value: LeagueFounderUserType.value, label: 'Fundador de Liga' },
  { value: RefereeUserType.value, label: 'Árbitro' },
  { value: TeamFounderUserType.value, label: 'Fundador de Equipo' },
];

export function useAuthenticateUserScreenLogic() {
  const appTheme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch<AppDispatch>();
  const [authenticateUserErrorList, setAuthenticateUserErrorList] = useState<DomainError[]>([]);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const navigation = useNavigation<NavigationProp<MainStackNavigatorParamList>>();
  const { mutate: authenticateUser, isPending, data } = useAuthenticateUser(authenticateUserUseCase);

  useEffect(() => {
    if (data) {
      if (data.isLeft) {
        const domainError = data.left();
        const errorList = domainError.type === 'single'
          ? [domainError.error]
          : domainError.errors.map((error) => error);

        setAuthenticateUserErrorList(errorList);
        dispatch(authenticationActions.setErrors(errorList.map((errorDomain) => errorDomain.toPrimitives)));
      } else {
        setAuthenticateUserErrorList([]);
        dispatch(authenticationActions.clearErrors());

        const { authenticatedUser } = data.right();
        dispatch(authenticationActions.setAuthenticatedUser(authenticatedUser.toPrimitives));
      }
    }
  }, [data, navigation, dispatch]);

  const handleSubmit = async (values: InitialValues, { setSubmitting }: FormikHelpers<InitialValues>) => {
    const { userType, password, ...otherProps } = values;
    const authData = {
      userType,
      password,
      ...(userType === PlayerUserType.value ? { nickname: otherProps.nickname } : { email: otherProps.email }),
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

  return {
    appTheme,
    formik,
    authenticateUserErrorList,
    isPending,
    isSelectOpen,
    validUserTypes,
    toggleSelect,
    handleInputChange,
    handleSelectOption,
  };
}
