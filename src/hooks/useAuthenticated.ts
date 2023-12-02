import { useApplicationStore } from '../store/useApplicationStore';

export const useAuthenticated = () => {
  const { auth } = useApplicationStore();

  return auth;
};

export default useAuthenticated;
