import React from 'react';
import { useFormikContext } from 'formik';
import { ErrorMessage, FieldInput } from '@components/forms';
import { Box, Button } from '@ui/components';
import { ForgotFormValues } from '@features/auth/container/types';

const ForgotFormComponent = () => {
  const formik = useFormikContext<ForgotFormValues>();

  const { errors, isValid, isSubmitting, handleSubmit } = formik;
  const errorMessage = errors.submit || '';

  return (
    <>
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

      <Box pt="l">
        <ErrorMessage textAlign="center" py="l">
          {errorMessage}
        </ErrorMessage>
      </Box>

      <Box mt="6xl">
        <Button
          onPress={handleSubmit.bind(null, undefined)}
          isLoading={isSubmitting}
          isDisabled={!isValid || isSubmitting}>
          Send Email
        </Button>
      </Box>
    </>
  );
};

export default React.memo(ForgotFormComponent);
