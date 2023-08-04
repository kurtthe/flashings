import * as Yup from 'yup';

export const customValidationMessages = {
  login: {
    email: {
      email: 'Invalid email address',
      required: 'Enter your email address',
    },
    password: {
      required: 'Enter your password',
    },
  },
};
export const forms = {
  login: {
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },
    initialErrors: {
      email: '',
      password: '',
    },
    labels: {
      email: 'Email address',
      password: 'Password',
      remember: 'Remember My Email',
    },
    placeholders: {
      email: 'myemail@email.com',
      password: '••••••••••••••',
    },
    schema: Yup.object({
      email: Yup.string()
        .email(customValidationMessages.login.email.email)
        .required(customValidationMessages.login.email.required)
        .ensure()
        .trim()
        .lowercase(),
      password: Yup.string().required(
        customValidationMessages.login.password.required,
      ),
    }),
  },
};
