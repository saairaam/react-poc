import { RootState } from "./store";
import useAppSelector from "./use-app-selector";

const authStateSelector = (state: RootState) => state.auth;

/**
 * A reusable custom hook to select the auth state from the redux store.
 */
const useReduxAuthState = () => {
  const auth = useAppSelector(authStateSelector);
  return auth;
};

export default useReduxAuthState;
