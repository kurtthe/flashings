import * as React from 'react';
import { TextInput } from 'react-native';
import { useFormikContext } from 'formik';
import { EyeIcon, EyeOffIcon } from '@assets/icons';

import { ErrorMessage, FieldInput } from '@components/forms';
import { Box, Button, Icon, IconButton } from '@ui/components';
import { LoginFormValues } from '@features/auth/container/types';

type LoginFormComponentProps = {};

const LoginFormComponent = ({}: LoginFormComponentProps) => {
  const formik = useFormikContext<LoginFormValues>();
  const { errors, isValid, isSubmitting, handleSubmit } = formik;
  const passwordInputRef = React.useRef<TextInput>(null);
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const togglePassword = React.useCallback(
    () => setSecureTextEntry(prevState => !prevState),
    [],
  );
  const handleEmailSubmit = React.useCallback(() => {
    passwordInputRef.current?.focus();
  }, []);

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
        onSubmitEditing={handleEmailSubmit}
        label="Email"
      />
      <FieldInput
        ref={passwordInputRef}
        name="password"
        placeholder="Password"
        mt="m"
        autoCapitalize="none"
        textContentType="password"
        autoCompleteType="password"
        secureTextEntry={secureTextEntry}
        isDisabled={isSubmitting}
        onSubmitEditing={handleSubmit.bind(null, undefined)}
        rightIcon={
          <IconButton
            onPress={togglePassword}
            ml="s"
            p="xs"
            isDisabled={isSubmitting}
            icon={<Icon as={secureTextEntry ? EyeOffIcon : EyeIcon} />}
          />
        }
        label="Password"
      />
      <Box pt="xl">
        <ErrorMessage textAlign="center" py="l">
          {errorMessage}
        </ErrorMessage>
        <Button
          onPress={handleSubmit.bind(null, undefined)}
          isLoading={isSubmitting}
          isDisabled={!isValid || isSubmitting}>
          Log In
        </Button>
        <Button mt="m" variant="outline" onPress={() => null}>
          Subcontractor Access
        </Button>
      </Box>
    </>
  );
};

export default React.memo(LoginFormComponent);
