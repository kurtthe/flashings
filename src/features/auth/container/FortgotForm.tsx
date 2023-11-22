import React from 'react';
import { Formik, FormikProps } from 'formik';
import { ForgotFormValues } from '@features/auth/container/types';
import { forms } from '../constants';
import { ForgotFormComponent } from '@features/auth/components';
import { useForgotPassword } from '@hooks/auth';
import { useNavigation } from '@react-navigation/native';
import { AuthStackProps } from '@features/auth/navigation/Stack.types';
import { Routes } from '@features/auth/navigation/routes';
import { Box, Text } from "@ui/components";
import { SimpleButton } from "@components";

const ForgotForm = () => {
  const navigation = useNavigation<AuthStackProps>();
  const formikRef = React.useRef<FormikProps<ForgotFormValues>>(null);

  const { mutate } = useForgotPassword({
    onSuccess: data => {
      navigation.navigate(Routes.FORGOT_PASSWORD_EMAIL_SENT);
    },
  });

  const handleSubmit = React.useCallback(async (values: ForgotFormValues) => {
    const { email } = values;
    mutate(email);
  }, []);

  return (
    <>
      <Formik
        innerRef={formikRef}
        initialValues={{
          ...forms.forgot.initialValues,
          email: forms.forgot.initialValues.email,
        }}
        initialErrors={forms.forgot.initialErrors}
        validationSchema={forms.forgot.schema}
        onSubmit={handleSubmit}>
        <ForgotFormComponent />
      </Formik>

      <Box flex={0.8} backgroundColor="white">
          <SimpleButton
            underlined
            onPress={() => navigation.navigate(Routes.HELP_SUPPORT)}>
            Need Help?
          </SimpleButton>
          <Box mt="s" flexDirection="column" justifyContent="center" alignItems="center">
            <Text style={{ color: '#444857', fontSize: 15 }}>
              Already remember your password?
            </Text>
            <SimpleButton onPress={() => navigation.navigate(Routes.LOGIN)}>
              Login
            </SimpleButton>
          </Box>
      </Box>
    </>
  );
};

export default ForgotForm;
