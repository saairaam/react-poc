import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { InputError } from "../components/InputError";
const loginSchema = yup.object({
  username: yup
    .string()
    .required("username is required")
    .min(8, "minimum 8 characters are needed")
    .label("username"),
  email: yup
    .string()
    .email("valid email is required ")
    .required("Email is required")
    .label("email"),
  password: yup
    .string()
    .min(8, "minimum 8 characters are needed")
    .required("password is required")
    .label("Password"),
  confirmPassword: yup
    .string()
    .min(8, "minimum 8 characters are needed")
    .oneOf(
      [yup.ref("password")],
      "password and confirm password is not the same"
    )
    .required("password is required")
    .label("confirmPassword"),
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
      email: "",
      confirmPassword: "",
      password: "",
    },
  });

  // const appDispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogin = async (data: any) => {
    console.log("Logging in with:", data);
    const { username, email, password, confirmPassword } = data;
    const payload = {
      username,
      email,
      password,
    };
    console.log(payload);

    // appDispatch(signedIn(payload));

    // payload.role === "USER" ? navigate("/") : navigate("/adminhome");
  };
  console.log(errors);
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-3xl font-bold mb-4 text-black">Sign Up</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-yellow-600">
              Name
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
              Email
            </label>
            <div>
              <input
                type="text"
                className="mt-1 p-2 w-full text-sm font-sans font-normal leading-5 px-3 py-2 rounded-lg shadow-md  shadow-slate-100 focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500  focus:border-purple-500  bg-white text-slate-900  focus-visible:outline-0"
                {...register("email")}
              />
              {errors.email && <InputError error={errors.email.message} />}
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-yellow-600">
              Confirm Password
            </label>
            <input
              type="password"
              className="mt-1 p-2 w-full text-sm font-sans font-normal leading-5 px-3 py-2 rounded-lg shadow-md  shadow-slate-100 focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500  focus:border-purple-500  bg-white text-slate-900  focus-visible:outline-0"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <InputError error={errors.confirmPassword.message} />
            )}
          </div>

          <button
            type="submit"
            className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black text-yellow-500 p-2 rounded-md w-full"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
