import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import useAppDispatch from '../use-app-dispatch';
import { signedIn } from './slice/auth.slice';
import { ROLE } from '../Types';
import { InputError } from '../components/InputError';
import useReduxAuthState from '../use-redux-auth-state';
import PageNotFound from '../pages/PageNotFound';
const loginSchema = yup.object({
  username: yup
    .string()
    .required('username is required')
    .min(8, 'minimum 8 characters are needed')
    .label('username'),
  password: yup
    .string()
    .required('password is required')
    .min(8, 'minimum 8 characters are needed')
    .label('Password'),
  rememberMe: yup.boolean(),
});
type LoginFormData = yup.InferType<typeof loginSchema>;
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
  });
  const auth = useReduxAuthState();
  const { user } = auth;
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogin = async (data: any) => {
    console.log('Logging in with:', data);
    const payload = {
      username: data.username,
      role: data.username === 'Saai' ? ROLE['USER'] : ROLE['ADMIN'],
      rememberMe: data.rememberMe,
    };
    appDispatch(signedIn(payload));
    payload.role === 'USER' ? navigate('/') : navigate('/adminhome');
  };
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center ">
        <div className="w-96 rounded bg-white p-8 shadow-lg">
          <h2 className="mb-4 text-3xl font-bold text-black">Login</h2>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-yellow-600">Username</label>
              <div>
                <input
                  type="text"
                  className="focus:shadow-outline-purple mt-1 w-full rounded-lg border border-solid border-slate-300 bg-white p-2 px-3 font-sans  text-sm font-normal leading-5 text-slate-900 shadow-md shadow-slate-100 hover:border-purple-500  focus:border-purple-500  focus:shadow-lg focus-visible:outline-0"
                  {...register('username')}
                />
                {errors.username && <InputError error={errors.username.message} />}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-yellow-600">Password</label>
              <input
                type="password"
                className="focus:shadow-outline-purple mt-1 w-full rounded-lg border border-solid border-slate-300 bg-white p-2 px-3 font-sans  text-sm font-normal leading-5 text-slate-900 shadow-md shadow-slate-100 hover:border-purple-500  focus:border-purple-500  focus:shadow-lg focus-visible:outline-0"
                {...register('password')}
              />
              {errors.password && <InputError error={errors.password.message} />}
            </div>
            <div className=" mb-4 flex gap-x-2">
              <input
                type="checkbox"
                // className="mt-1 p-2 w-full text-sm font-sans font-normal leading-5 px-3 py-2 rounded-lg shadow-md  shadow-slate-100 focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500  focus:border-purple-500  bg-white text-slate-900  focus-visible:outline-0"
                {...register('rememberMe')}
              />
              <label className="block text-sm font-medium text-yellow-600">Remember Me</label>
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black p-2 text-yellow-500"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    return <PageNotFound />;
  }
};

export default Login;
