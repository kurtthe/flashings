import * as React from 'react';
import { TextInput } from 'react-native';
import { useFormikContext } from 'formik';
import { EyeIcon, EyeOffIcon } from '@assets/icons';

import { ErrorMessage, FieldInput } from '@components/forms';
import { Box, Button, Icon, IconButton, Text } from "@ui/components";
import { LoginFormValues } from '@features/auth/container/types';
import { ForgotButton } from '@features/auth/components';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '@features/auth/navigation/routes';
import { AuthStackProps } from '@features/auth/navigation/Stack.types';

const LoginFormComponent = () => {
  const navigation = useNavigation<AuthStackProps>();
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
      <Box alignSelf="flex-end" >
        <ForgotButton
          onPress={() => navigation.navigate(Routes.FORGOT_PASSWORD)}>
          Forgot Password?
        </ForgotButton>
      </Box>

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
      </Box>
    </Box>
  );
};

export default React.memo(LoginFormComponent);
