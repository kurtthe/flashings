import { useMutation } from '@tanstack/react-query';
import { loginService } from './service';

export const useLogin = (
  onSettled?: (data: unknown) => void,
  onError?: (error: unknown) => void,
) => {
  return useMutation(loginService, {
    onSettled,
    onError,
  });
};
