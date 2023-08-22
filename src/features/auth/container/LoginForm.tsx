import React from 'react';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import { LoginFormValues } from '@features/auth/container/types';
import { forms } from '../constants';
import { useLogin } from '@hooks/auth';
import { LOGIN_RESPONSE } from '@models';
import { LoginFormComponent } from '@features/auth/components';
import { useAppDispatch } from '@hooks/useStore';
import { actions as authActions } from '@store/auth/actions';
const LoginForm = () => {
  const dispatch = useAppDispatch();

  const formikRef = React.useRef<FormikProps<LoginFormValues>>(null);

  const { mutate: doLogin } = useLogin({
    onSuccess: data => {
      dispatch(authActions.signIn({ data: data as LOGIN_RESPONSE }));
    },
  });

  const handleSubmit = React.useCallback(
    async (
      values: LoginFormValues,
      { setSubmitting }: FormikHelpers<LoginFormValues>,
    ) => {
      const { email, password } = values;
      setSubmitting(true);
      doLogin({
        username: email,
        password,
      });
      setSubmitting(false);
    },
    [],
  );

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
