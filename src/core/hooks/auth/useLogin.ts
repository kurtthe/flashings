import {useMutation, useQuery, UseQueryResult} from '@tanstack/react-query';
import {loginDashboardService, loginService} from './service';
import {DATA_HOOK} from '@models';

export const useLogin = ({onSuccess, onSettled, onError}: DATA_HOOK) => {
  return useMutation(loginService, {
    onSettled,
    onSuccess,
    onError,
  });
};

export const useLoginDashboard = (): UseQueryResult<{url: string}, any> =>
  useQuery({
    queryFn: () => loginDashboardService(),
    queryKey: ['login_dashboard'],
  });
