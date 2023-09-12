import React from 'react';
import { useFormikContext } from "formik";
import { ErrorMessage, FieldInput } from '@components/forms';
import { Box, Button } from '@ui/components';
import { ForgotFormValues } from '@features/auth/container/types';

const ForgotFormComponent = () => {
  const formik = useFormikContext<ForgotFormValues>();

  const { errors, isValid, isSubmitting, handleSubmit } = formik;
  const errorMessage = errors.submit ?? '';
  return (
    <Box px="m" backgroundColor="white">
      <FieldInput
        name="email"
        placeholder="Email"
        autoCapitalize="none"
        returnKeyType="next"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCompleteType="email"
        autoCorrect={false}
        isDisabled={isSubmitting}
        label="Email"
      />
      <Box pt="xl">
        <ErrorMessage textAlign="center" py="m">
          {errorMessage}
        </ErrorMessage>
        <Button
          my="m"
          onPress={handleSubmit.bind(null, undefined)}
          isLoading={isSubmitting}
          isDisabled={!isValid || isSubmitting}>
          Send Email
        </Button>
      </Box>
    </Box>
  );
};

export default React.memo(ForgotFormComponent);
