import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAppDispatch from "../use-app-dispatch";
import { twMerge } from "tailwind-merge";
import { InputError } from "../components/InputError";
import { signedIn } from "../auth/slice/auth.slice";
import useReduxAuthState from "../use-redux-auth-state";
import { useEffect, useState } from "react";
import AWS, { AWSError } from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";
import { PutObjectOutput } from "aws-sdk/clients/s3";
const profilechema = yup.object({
  username: yup
    .string()
    .required("username is required")
    .min(8, "minimum 8 characters are needed")
    .label("username"),
  email: yup.string().email().label("email"),
  address: yup.string().label("address"),
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
      username: "",
      email: "",
      address: "",
    },
  });
  const env = loadEnv("dev", process.cwd(), "");
  const [file, setFile] = useState<any>();
  const [image, setImage] = useState<any>(null);
  // Function to upload file to s3
  const uploadFile = async () => {
    // S3 Bucket Name
    const S3_BUCKET = "bucket-name";

    // S3 Region
    const REGION = "region";

    // S3 Credentials
    AWS.config.update({
      accessKeyId: env.VITE_AWS_KEY,
      secretAccessKey: env.VITE_AWS_SECRET_KEY,
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    // Files Parameters

    const params = {
      Bucket: S3_BUCKET,
      Key: file?.name,
      Body: file,
    };

    // Uploading file to s3

    var upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) =>
        console.log(
          "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
        )
      )
      .promise();

    await upload.then(
      ({ err, data }: PromiseResult<PutObjectOutput, AWSError>) => {
        console.log(err);
        // Fille successfully uploaded
        alert("File uploaded successfully.");
      }
    );
  };
  // Function to handle file and store it to file state
  const handleFileChange = (e: any) => {
    // Uploaded file
    const file = e.target.files[0];
    // Changing file state
    setFile(file);
  };
  const [stateuser, setUser] = useState<any>();
  const auth = useReduxAuthState();
  const { user } = auth;
  const appDispatch = useAppDispatch();
  const handleUpdate = async (data: any) => {
    console.log("Logging in with:", data);
    await appDispatch(signedIn({ ...data, picture: image, role: user?.role }));
    await uploadFile();
  };

  const noimage = "../assets/images/blankProfile.png";
  // const profileimage = auth.user ? "./src/assets/images/User.jpg" : noimage;
  useEffect(() => {
    setValue("username", user ? user?.username : "");
    setUser(user);
    setImage(user ? user.picture : noimage);
  }, []);

  return (
    <div className="w-[575px] flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg ">
        <form onSubmit={handleSubmit(handleUpdate)}>
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold mb-4 text-black">My profile</h2>
          </div>
          <div className="flex gap-x-2">
            <div className="mb-4">
              <div className="flex gap-x-5">
                <div className="w-20 rounded-full">
                  <img src={image} className="rounded-full" />
                </div>
                <div>
                  <p className="text-yellow-600">Change Profile Picture</p>
                  <input
                    type="file"
                    className="w-full"
                    onChange={handleFileChange}
                  ></input>
                </div>
              </div>
            </div>
          </div>

          {/* group 1 start */}
          <div className="flex gap-x-2">
            <div className="mb-4">
              <label className="block text-sm font-medium text-yellow-600">
                Username
              </label>
              <div>
                <input
                  type="text"
                  value={user?.username}
                  disabled={!!user?.username}
                  className={twMerge(
                    `mt-1 p-2 w-full text-sm font-sans font-normal leading-5 px-3 py-2 rounded-lg shadow-md ${
                      user?.username
                        ? "cursor-not-allowed bg-zinc-500"
                        : "cursor-pointer bg-white"
                    }  shadow-slate-100 focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500  focus:border-purple-500   text-slate-900  focus-visible:outline-0`
                  )}
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
              <input
                type="email"
                value={user?.email}
                disabled={user?.email ? true : false}
                className={twMerge(
                  `mt-1 p-2 w-full text-sm font-sans font-normal leading-5 px-3 py-2 rounded-lg shadow-md ${
                    user?.email ? "cursor-not-allowed" : "cursor-pointer"
                  }  shadow-slate-100 focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500  focus:border-purple-500  bg-white text-slate-900  focus-visible:outline-0`
                )}
                {...register("email")}
              />
              {errors.email && <InputError error={errors.email.message} />}
            </div>
          </div>
          {/* group 1 end */}
          {/* group 2 start */}
          <div className="">
            <div className="mb-4">
              <label className="block text-sm font-medium text-yellow-600">
                Address
              </label>
              <div>
                <textarea
                  className="mt-1 p-2 w-full text-sm font-sans font-normal leading-5 px-3 py-2 rounded-lg shadow-md  shadow-slate-100 focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500  focus:border-purple-500  bg-white text-slate-900  focus-visible:outline-0"
                  {...register("address")}
                />
                {errors.address && (
                  <InputError error={errors.address.message} />
                )}
              </div>
            </div>
          </div>
          {/* group 2 end */}
          <button
            type="submit"
            className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black text-yellow-500 p-2 rounded-md w-full"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
