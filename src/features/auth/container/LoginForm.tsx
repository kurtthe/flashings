import React from 'react';
import { Formik, FormikProps } from 'formik';
import { LoginFormValues } from '@features/auth/container/types';
import { forms } from '../constants';
import LoginFormComponent from '@features/auth/components/LoginForm';
import { RequestService } from '@services/index';
import { endPoints } from '@shared/endPoints';

const LoginForm = ({}) => {
  const formikRef = React.useRef<FormikProps<LoginFormValues>>(null);

  const handleSubmit = React.useCallback(async (values: LoginFormValues) => {
    const { email, password } = values;
    RequestService.auth(endPoints.login, {
      username: email,
      password: password,
    })
      .then(data => {
        console.log(' response login data::', data);
      })
      .catch(err => {
        console.log('error', err);
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
