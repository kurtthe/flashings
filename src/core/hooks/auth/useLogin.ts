import { useMutation } from '@tanstack/react-query';
import { loginService } from './service';
import { DATA_HOOK } from '@models';

export const useLogin = ({ onSuccess, onSettled, onError }: DATA_HOOK) => {
  return useMutation(loginService, {
    onSettled,
    onSuccess,
    onError,
  });
};
