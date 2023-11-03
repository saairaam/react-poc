import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .lowercase()
    .email("validEmail")
    .required("emailRequired")
    .label("Email"),
  password: yup
    .string()
    .min(8, "passwordMin")
    .required("passwordRequired")
    .label("Password"),
  rememberMe: yup.boolean().default(true).required(),
});
type LoginFormData = yup.InferType<typeof loginSchema>;
const Login = (): JSX.Element => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { isSubmitting, errors, isValid, isSubmitted },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });
  const navigate = useNavigate();
  const handleLogin: SubmitHandler<LoginFormData> = (data) => {
    console.log("Logging in with:", data);
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Login</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <div>
              <input
                type="text"
                className="mt-1 p-2 w-full text-sm font-sans font-normal leading-5 px-3 py-2 rounded-lg shadow-md  shadow-slate-100 focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500  focus:border-purple-500  bg-white text-slate-900  focus-visible:outline-0"
                {...register("email")}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              className="mt-1 p-2 w-full text-sm font-sans font-normal leading-5 px-3 py-2 rounded-lg shadow-md  shadow-slate-100 focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500  focus:border-purple-500  bg-white text-slate-900  focus-visible:outline-0"
              {...register("password")}
            />
          </div>
          <button
            type="submit"
            className="bg-purple-900  text-white p-2 rounded-md w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
