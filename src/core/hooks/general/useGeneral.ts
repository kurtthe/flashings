import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getVersionApp } from '@hooks/general/services';

export const useGetVersionApp = (): UseQueryResult<string, any> =>
  useQuery({
    queryFn: () => getVersionApp(),
    queryKey: ['get_version_app'],
    refetchInterval: 10000,
    refetchOnMount: 'always',
  });
