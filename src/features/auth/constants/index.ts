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
  forgot: {
    email: {
      email: 'Invalid email address',
      required: 'Enter your email address',
    },
  },
};

export const forms = {
  forgot: {
    initialValues: {
      email: '',
    },
    initialErrors: {
      email: '',
    },
    labels: {
      email: 'Email address',
    },
    placeholders: {
      email: 'myemail@email.com',
    },
    schema: Yup.object({
      email: Yup.string()
        .email(customValidationMessages.forgot.email.email)
        .required(customValidationMessages.forgot.email.required)
        .ensure()
        .trim()
        .lowercase(),
    }),
  },
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
