import { Feedback } from "../components/Feedback";
import useAppDispatch from "../use-app-dispatch";
import { signedOut } from "./slice/auth.slice";

export const Logout = () => {
  const appDispatch = useAppDispatch();
  appDispatch(signedOut());
  return (
    <div className="flex flex-col gap-y-2 justify-center items-center">
      <p>You have been logged out</p>
      <a href="/login">Sign In again here</a>
      <Feedback />
    </div>
  );
};
