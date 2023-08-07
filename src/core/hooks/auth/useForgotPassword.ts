import { useMutation } from '@tanstack/react-query';
import { forgotPasswordService } from './service';
import { DATA_HOOK } from '@models';

export const useForgotPassword = ({
  onSuccess,
  onSettled,
  onError,
}: DATA_HOOK) => {
  return useMutation(forgotPasswordService, {
    onSuccess,
    onSettled,
    onError,
  });
};
