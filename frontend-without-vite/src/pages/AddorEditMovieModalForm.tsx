/* eslint-disable camelcase */
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { InputError } from '../components/InputError';
import { ModalType } from '../Types';
import { useEffect, useState } from 'react';
// import { castData } from '../assets/Data';
import Select from 'react-select';
import { castData } from '../assets/Data';
interface MovieModalProps {
  setIsMovieModalOpen: (open: boolean) => void;
  movie?: any;
  modalType: ModalType;
}
const addOrEditMovieSchema = yup.object({
  movieTitle: yup
    .string()
    .required('username is required')
    .min(8, 'minimum 8 characters are needed')
    .label('username'),
  releaseDate: yup.string().email().label('email'),
  director: yup.string().label('address'),
  image: yup.string(),
  cast: yup.mixed().nullable(),
});
type AddOrEditSchemaData = yup.InferType<typeof addOrEditMovieSchema>;
const AddorEditMovieForm = ({
  // setIsMovieModalOpen,
  movie, // modalType,
}: MovieModalProps) => {
  // const cast = movie?.cast.map(({ id, name }: any) => ({ label: name, value: id }));
  const {
    register,
    handleSubmit,
    setValue,
    // getValues,
    trigger,
    formState: { errors },
  } = useForm<AddOrEditSchemaData>({
    resolver: yupResolver(addOrEditMovieSchema),
    defaultValues: {
      movieTitle: movie?.title ?? '',
      director: movie?.director ?? '',
      cast: movie?.cast ?? [{ image: '', name: '' }],
    },
  });
  // const [file, setFile] = useState<any>();
  const [image, setImage] = useState<any>(null);
  const handleFileChange = (e: any) => {
    // Uploaded file
    const data = new FileReader();
    // const file = e.target.files[0];
    data.addEventListener('load', () => {
      setImage(data.result);
    });
    data.readAsDataURL(e.target.files[0]);
    // Changing file state
    // setFile(file);
  };
  // console.log(getValues(cast));
  useEffect(() => {
    setImage('https://image.tmdb.org/t/p/original/' + movie.image);
  }, [movie.image]);
  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      <div className="flex gap-x-2">
        <div className="mb-4">
          <div className=" flex  items-center justify-center gap-x-5 ">
            <div className="w-32">
              <img src={image} className="h-32 w-32 rounded-lg" alt="ss" />
            </div>
            <div>
              <p className="text-yellow-600">Change Movie Poster</p>
              <input type="file" className="w-full" onChange={handleFileChange}></input>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-yellow-600">Movie Title</label>
        <div>
          <input
            type="text"
            className="mt-1 w-full rounded-lg border border-solid border-slate-300 bg-white p-2 px-3 font-sans  text-sm font-normal leading-5 text-slate-900 shadow-md shadow-slate-100 hover:border-purple-500  focus:border-purple-500  focus:shadow-lg focus-visible:outline-0"
            {...register('movieTitle')}
          />
          {errors.movieTitle && <InputError error={errors.movieTitle.message} />}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-yellow-600">Director</label>
        <div>
          <input
            type="text"
            className="mt-1 w-full rounded-lg border border-solid border-slate-300 bg-white p-2 px-3 font-sans  text-sm font-normal leading-5 text-slate-900 shadow-md shadow-slate-100 hover:border-purple-500  focus:border-purple-500  focus:shadow-lg focus-visible:outline-0"
            {...register('director')}
          />
          {errors.director && <InputError error={errors.director.message} />}
        </div>
      </div>
      <div className="mb-4 w-full">
        <label className="block text-sm font-medium text-yellow-600">Cast</label>
        <Select
          options={castData.map(({ id, name }: any) => ({
            label: name,
            value: id,
          }))}
          isMulti
          defaultValue={movie.cast.map(({ id, name }: any) => ({
            label: name,
            value: id,
          }))}
          onChange={(data: any) => {
            setValue('cast', data);
            trigger('cast');
          }}
        />
      </div>
    </form>
  );
};

export default AddorEditMovieForm;
