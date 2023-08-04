import React from 'react';
import { Formik, FormikProps } from 'formik';
import { LoginFormValues } from '@features/auth/container/types';
import { forms } from '../constants';
import LoginFormComponent from '@features/auth/components/LoginForm';
import { useLogin } from '@hooks/auth';
import { useNavigation } from '@react-navigation/native';
import { LOGIN_RESPONSE } from '@models';
import { StackPrivateDefinitions } from '@routes/PrivateNavigator';

const LoginForm = () => {
  const navigation = useNavigation();
  const formikRef = React.useRef<FormikProps<LoginFormValues>>(null);

  const { mutate: doLogin } = useLogin(data => {
    if ((data as LOGIN_RESPONSE).api_key) {
      navigation.navigate(StackPrivateDefinitions.FLASHING);
    }
  });

  const handleSubmit = React.useCallback(async (values: LoginFormValues) => {
    const { email, password } = values;

    doLogin({
      username: email,
      password,
    });
  }, []);

  return (
    <Formik
      innerRef={formikRef}
      initialValues={{
        ...forms.login.initialValues,
        email: forms.login.initialValues.email,
      }}
      initialErrors={forms.login.initialErrors}
      validationSchema={forms.login.schema}
      onSubmit={handleSubmit}>
      <LoginFormComponent />
    </Formik>
  );
};

export default LoginForm;
