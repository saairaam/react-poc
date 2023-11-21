/* eslint-disable no-constant-condition */
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useAppDispatch from '../use-app-dispatch';
import { twMerge } from 'tailwind-merge';
import { InputError } from '../components/InputError';
import { signedIn } from '../auth/slice/auth.slice';
import useReduxAuthState from '../use-redux-auth-state';
import { useEffect, useState } from 'react';
import * as AWS from '@aws-sdk/client-s3';
import noimage from '../assets/images/blankProfile.png';
const profilechema = yup.object({
  username: yup
    .string()
    .required('username is required')
    .min(8, 'minimum 8 characters are needed')
    .label('username'),
  email: yup.string().email().label('email'),
  address: yup.string().label('address'),
  image: yup.string(),

  //   oldpassword: yup
  //     .string()
  //     .required("oldpassword password is required")
  //     .min(8, "minimum 8 characters are needed")
  //     .label("Password"),
  //   newpassword: yup
  //     .string()
  //     .required("password is required")
  //     .min(8, "minimum 8 characters are needed")
  //     .label("Password"),
  //   newconfirmpassword: yup
  //     .string()
  //     .required("password is required")
  //     .min(8, "minimum 8 characters are needed")
  //     .label("Password"),
});
type profileFormData = yup.InferType<typeof profilechema>;
const Profile = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<profileFormData>({
    resolver: yupResolver(profilechema),
    defaultValues: {
      username: '',
      email: '',
      address: '',
    },
  });
  const [file, setFile] = useState<any>();
  const [image, setImage] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  // Function to upload file to s3
  const uploadFile = async () => {
    // S3 Bucket Name
    const S3_BUCKET = 'saairaam-react-poc';
    const S3_KEY = 'users/' + user?.username + '.png';
    // S3 Region
    const REGION = 'us-east-1';

    // S3 Credentials

    const s3 = new AWS.S3({
      region: REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? 'ASIAZ5UKGBTKBR5HTH5D',
        secretAccessKey:
          process.env.AWS_SECRET_ACCESS_KEY ?? 'p+u9DkpRKXU0d1IUt9FD9Qu756L/iSfQaD8/RPy2',
        sessionToken:
          process.env.AWS_SESSION_TOKEN ??
          'IQoJb3JpZ2luX2VjEFQaCXVzLWVhc3QtMSJIMEYCIQD+XbtTKmI3A9UvT43lCGBZsytNhrM/Ny3ZcPxovY9S/wIhALkxWm2wAXFu8yxkv2qS5HXcgcRyN23Aqv+Y+OsX6fJxKocDCJ3//////////wEQARoMNjgyMTE1ODYxNzE2Igyrjhn9+4FYd+Sa7FUq2wIXmP/2ryquSsC62sTrDj/aEilsGpH2LmROnMdpgAnype75/bflEsuaw+mnM+z1XAAgTf7AoDZKmXBRMN4Y9CNJxswTdmQ6Qq/1rU7t1jf3u5aGlw5QfFzEpzv5NGzmd+DYrQzO/DVQN3WOeB3tiEGnW9Kj6FnEvAs64frcsDY8TOizb+rE3mgKGKBUF7sWtXTz18k3nk8KjVt8z+9i/atpyUIyffYwHRd0faTQJCiGidqnhOG0Rw0YHKyS//bEU4YbcfGwaLJ9PKasst9fBS7hAdmmQkV3tigOTM/aRgXmTqkLX6CS6KCBXtO1DBx3Pt4pV9yqpVq9VLm9IPAJWqs959PKRveddjjDlJAjG/B7vN7DnmAOskf0c5qYPXI47nFAHXJkj3Q0jaSxoT+dNxZzo3SwNXXoNXHOZ8t0i3hX2duCnVlZAEtFY2zqZC/sHQlFWuB8rM793F8YXjCjwtuqBjqmAXlUOL6qrnT0w6SiG7q2tpRmBdEStCapWx3BmN74gzuIbIgg3qTho+0GlTjZspqBpURWAn8JBxzoBI3mTVOz4KUTQiv8T9BgsU/KRrobzle9BDi8G4DIK/4NzLN+nK/Lgt/1GpeztMh373FN2I0Um/6LQgKva22WEBEOpX+pWSde0VhBN3AYSK1nuv9RK7aUX72Jy76JiFBOWx88VierNbVZgdkNRBY=',
      },
    });

    // Files Parameters

    const params = {
      Bucket: S3_BUCKET,
      Key: S3_KEY,
      Body: file,
    };

    // Uploading file to s3

    const upload = s3.putObject(params);
    await setIsUploading(true);
    await upload.then(async (err: any) => {
      console.log(err);
      // Fille successfully uploaded
      alert('Profile Picture updated');
    });
    await setIsUploading(false);
  };
  // Function to handle file and store it to file state
  const handleFileChange = (e: any) => {
    // Uploaded file
    const data = new FileReader();
    const file = e.target.files[0];
    data.addEventListener('load', () => {
      setImage(data.result);
    });
    data.readAsDataURL(e.target.files[0]);
    // Changing file state
    setFile(file);
  };
  // console.log(process.env.AWS_SECRET_KEY);
  const auth = useReduxAuthState();
  const { user } = auth;
  const appDispatch = useAppDispatch();
  const handleUpdate = async (data: any) => {
    appDispatch(
      signedIn({
        ...data,
        picture: 'https://saairaam-react-poc.s3.amazonaws.com/users/' + user?.username + '.png',
        role: user?.role,
      })
    );
    await uploadFile();
  };
  const s3image = `https://saairaam-react-poc.s3.amazonaws.com/users/${user?.username}.png`;
  useEffect(() => {
    setValue('username', user ? user?.username : '');
    setImage(s3image ? s3image : noimage);
  }, [user]);
  console.log(s3image ? true : false);
  return (
    <div className="flex w-[575px] items-center justify-center">
      <div className="rounded bg-white p-8 shadow-lg ">
        <form onSubmit={handleSubmit(handleUpdate)}>
          <div className="flex justify-between">
            <h2 className="mb-4 text-3xl font-bold text-black">My profile</h2>
          </div>
          <div className="flex gap-x-2">
            <div className="mb-4">
              <div className="flex gap-x-5">
                <div className="w-20 rounded-full">
                  <img src={image} className="rounded-full" alt="ss" />
                </div>
                <div>
                  <p className="text-yellow-600">Change Profile Picture</p>
                  <input type="file" className="w-full" onChange={handleFileChange}></input>
                </div>
              </div>
            </div>
          </div>

          {/* group 1 start */}
          <div className="flex gap-x-2">
            <div className="mb-4">
              <label className="block text-sm font-medium text-yellow-600">Username</label>
              <div>
                <input
                  type="text"
                  value={user?.username}
                  disabled={!!user?.username}
                  className={twMerge(
                    `mt-1 p-2 w-full text-sm font-sans font-normal leading-5 px-3 py-2 rounded-lg shadow-md ${
                      user?.username ? 'cursor-not-allowed bg-zinc-500' : 'cursor-pointer bg-white'
                    }  shadow-slate-100 focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500  focus:border-purple-500   text-slate-900  focus-visible:outline-0`
                  )}
                  {...register('username')}
                />
                {errors.username && <InputError error={errors.username.message} />}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-yellow-600">Email</label>
              <input
                type="email"
                value={user?.email}
                disabled={user?.email ? true : false}
                className={twMerge(
                  `mt-1 p-2 w-full text-sm font-sans font-normal leading-5 px-3 py-2 rounded-lg shadow-md ${
                    user?.email ? 'cursor-not-allowed' : 'cursor-pointer'
                  }  shadow-slate-100 focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500  focus:border-purple-500  bg-white text-slate-900  focus-visible:outline-0`
                )}
                {...register('email')}
              />
              {errors.email && <InputError error={errors.email.message} />}
            </div>
          </div>
          {/* group 1 end */}
          {/* group 2 start */}
          <div className="">
            <div className="mb-4">
              <label className="block text-sm font-medium text-yellow-600">Address</label>
              <div>
                <textarea
                  className="focus:shadow-outline-purple mt-1 w-full rounded-lg border border-solid border-slate-300 bg-white p-2 px-3 font-sans  text-sm font-normal leading-5 text-slate-900 shadow-md shadow-slate-100 hover:border-purple-500  focus:border-purple-500  focus:shadow-lg focus-visible:outline-0"
                  {...register('address')}
                />
                {errors.address && <InputError error={errors.address.message} />}
              </div>
            </div>
          </div>
          {/* group 2 end */}
          <button
            type="submit"
            disabled={isUploading}
            className={twMerge(
              'w-full rounded-md bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black p-2 text-yellow-500',
              isUploading ? 'cursor-not-allowed' : 'cursor-pointer'
            )}
          >
            {isUploading ? 'Updating Profile ...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
