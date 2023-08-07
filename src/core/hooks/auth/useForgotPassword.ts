import { useMutation } from '@tanstack/react-query';
import { forgotPasswordService } from './service';

export const useForgotPassword = (
  onSettled?: (data: unknown) => void,
  onError?: (error: unknown) => void,
) => {
  return useMutation(forgotPasswordService, {
    onSettled,
    onError,
  });
};
