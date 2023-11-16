import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import useAppDispatch from "../use-app-dispatch";
import { signedIn } from "./slice/auth.slice";
import { ROLE } from "../Types";
import { InputError } from "../components/InputError";
const loginSchema = yup.object({
  username: yup
    .string()
    .required("username is required")
    .min(8, "minimum 8 characters are needed")
    .label("username"),
  password: yup
    .string()
    .required("password is required")
    .min(8, "minimum 8 characters are needed")
    .label("Password"),
  rememberMe: yup.boolean(),
});
type LoginFormData = yup.InferType<typeof loginSchema>;
const Login = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  const appDispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogin = async (data: any) => {
    console.log("Logging in with:", data);
    const payload = {
      username: data.username,
      role: data.username === "Saai" ? ROLE["ADMIN"] : ROLE["USER"],
      rememberMe: data.rememberMe,
    };
    appDispatch(signedIn(payload));
    payload.role === "USER" ? navigate("/") : navigate("/adminhome");
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-3xl font-bold mb-4 text-black">Login</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-yellow-600">
              Username
            </label>
            <div>
              <input
                type="text"
                className="mt-1 p-2 w-full text-sm font-sans font-normal leading-5 px-3 py-2 rounded-lg shadow-md  shadow-slate-100 focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500  focus:border-purple-500  bg-white text-slate-900  focus-visible:outline-0"
                {...register("username")}
              />
              {errors.username && (
                <InputError error={errors.username.message} />
              )}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-yellow-600">
              Password
            </label>
            <input
              type="password"
              className="mt-1 p-2 w-full text-sm font-sans font-normal leading-5 px-3 py-2 rounded-lg shadow-md  shadow-slate-100 focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500  focus:border-purple-500  bg-white text-slate-900  focus-visible:outline-0"
              {...register("password")}
            />
            {errors.password && <InputError error={errors.password.message} />}
          </div>
          <div className=" flex gap-x-2 mb-4">
            <input
              type="checkbox"
              // className="mt-1 p-2 w-full text-sm font-sans font-normal leading-5 px-3 py-2 rounded-lg shadow-md  shadow-slate-100 focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500  focus:border-purple-500  bg-white text-slate-900  focus-visible:outline-0"
              {...register("rememberMe")}
            />
            <label className="block text-sm font-medium text-yellow-600">
              Remember Me
            </label>
          </div>
          <button
            type="submit"
            className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black text-yellow-500 p-2 rounded-md w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
