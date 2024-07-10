import React from 'react';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import { LoginFormValues } from '@features/auth/container/types';
import { forms } from '../constants';
import { useLogin } from '@hooks/auth';
import { LOGIN_RESPONSE } from '@models';
import { LoginFormComponent } from '@features/auth/components';
import { useAppDispatch } from '@hooks/useStore';
import { actions as authActions } from '@store/auth/actions';
import { Box, Text } from '@ui/components';
import SimpleButton from '@components/SimpleButton';
import { Routes } from '@features/auth/navigation/routes';
import { useNavigation } from '@react-navigation/native';
import { AuthStackProps } from '@features/auth/navigation/Stack.types';
const LoginForm = () => {
  const navigation = useNavigation<AuthStackProps>();
  const dispatch = useAppDispatch();

  const formikRef = React.useRef<FormikProps<LoginFormValues>>(null);

  const { mutate: doLogin, isLoading } = useLogin({
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
    <>
      <Formik
        innerRef={formikRef}
        initialValues={{
          ...forms.login.initialValues,
          email: forms.login.initialValues.email,
        }}
        initialErrors={forms.login.initialErrors}
        validationSchema={forms.login.schema}
        onSubmit={handleSubmit}>
        <LoginFormComponent isLoading={isLoading} />
      </Formik>

      <Box alignItems="center" flex={1} py="s" mb="s" backgroundColor="white">
        <SimpleButton
          style={{ marginVertical: 5 }}
          underlined
          onPress={() => navigation.navigate(Routes.HELP_SUPPORT)}>
          Need Help?
        </SimpleButton>
        <Box flexDirection="column" alignItems="center" py="s">
          <Text style={{ color: '#444857', fontSize: 15 }}>
            Don't have an account yet?
          </Text>

          <SimpleButton
            onPress={() => navigation.navigate(Routes.LEARN_HOW_TO_OPEN)}>
            Learn how to open a new account
          </SimpleButton>
        </Box>
      </Box>
    </>
  );
};

export default LoginForm;
