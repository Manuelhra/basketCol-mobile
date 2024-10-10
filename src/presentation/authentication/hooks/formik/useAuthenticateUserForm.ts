import * as Yup from 'yup';
import { FormikHelpers, useFormik } from 'formik';

import { authenticateUserSchema } from './schemas/authenticate-user.schema';

type InitialValues = Yup.InferType<typeof authenticateUserSchema>;

type UseAuthenticateUserFormProps = {
  onSubmit: (values: InitialValues, formikHelpers: FormikHelpers<InitialValues>) => void | Promise<any>;
};

export const useAuthenticateUserForm = ({ onSubmit }: UseAuthenticateUserFormProps) => useFormik<InitialValues>({
  initialValues: {
    userType: '',
    nickname: '',
    email: '',
    password: '',
  },
  validationSchema: authenticateUserSchema,
  onSubmit,
});
