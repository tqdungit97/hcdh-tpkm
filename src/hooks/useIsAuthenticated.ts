import { useApplicationStore } from '../store/useApplicationStore';

export const useIsAuthenticated = (): boolean => {
  const { accessToken } = useApplicationStore();

  return !!accessToken;
};

export default useIsAuthenticated;
