import * as Yup from 'yup';

export const formsKeys = {
  helpEmailUsModal: {
    subject: 'subject',
    message: 'message',
    loanId: 'loanId',
  },
} as const;

export const forms = {
  helpEmailUsModal: {
    initialValues: {
      [formsKeys.helpEmailUsModal.subject]: __DEV__ ? 'Test subject' : '',
      [formsKeys.helpEmailUsModal.message]: __DEV__ ? 'Test message' : '',
    },
    placeholders: {
      [formsKeys.helpEmailUsModal.subject]: 'Subject',
      [formsKeys.helpEmailUsModal.message]: 'Message Here',
      [formsKeys.helpEmailUsModal.loanId]: 'Select loan',
    },
    schema: Yup.object({
      [formsKeys.helpEmailUsModal.subject]: Yup.string()
        .required('Must include subject.')
        .trim(),
      [formsKeys.helpEmailUsModal.message]: Yup.string()
        .required('Must include message.')
        .trim(),
      [formsKeys.helpEmailUsModal.loanId]:
        Yup.string().required('Must select a loan'),
    }),
  },
} as const;
