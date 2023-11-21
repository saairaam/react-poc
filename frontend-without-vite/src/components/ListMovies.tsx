import { useMemo, useState } from 'react';
import Dialog from './Dialog';
import AddorEditMovieModal from '../pages/AddorEditMovieModalMain';

const Published = () => {
  return (
    <div className="flex items-center">
      <div className="me-2 h-2.5 w-2.5 rounded-full bg-green-500"></div> Published
    </div>
  );
};
const Draft = () => {
  return (
    <div className="flex items-center">
      <div className="me-2 h-2.5 w-2.5 rounded-full bg-red-500"></div> Draft
    </div>
  );
};
const ListMovies = ({ movies }: any) => {
  const [isMovieModalOpen, setIsMovieModalOpen] = useState(false);
  const [activeDialogType, setActiveDialogType] = useState('');
  const [movie, setMovie] = useState('');
  const ActiveDialogContent = useMemo(() => {
    switch (activeDialogType) {
      case 'EDIT_MOVIE': {
        return (
          <AddorEditMovieModal
            modalTitle={'Edit Movie'}
            setIsMovieModalOpen={setIsMovieModalOpen}
            movie={movie}
            modalType="update"
          />
        );
      }
      default: {
        return null;
      }
    }
  }, [activeDialogType, movie]);

  return (
    <div className=" shadow-md sm:rounded-lg">
      <table className=" table rounded-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="  px-4 py-2">Title</th>
            <th className=" px-4 py-2">Created By</th>
            <th className=" px-4 py-2">Status</th>
            <th className=" px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody className="bg-gray-200 text-gray-500">
          {movies.map((movie: any) => (
            <tr
              key={movie.id}
              className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
            >
              <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                {movie.title}
              </td>
              <td className="">{movie?.creator}</td>
              <td className="px-6 py-4">
                {movie.status === 'published' ? <Published /> : <Draft />}
              </td>
              <td className="flex items-center px-6 py-4">
                <button
                  onClick={() => {
                    setActiveDialogType('EDIT_MOVIE');
                    setIsMovieModalOpen(true);
                    setMovie(movie);
                  }}
                >
                  Edit
                </button>
                <a
                  href="#"
                  className="ms-3 font-medium text-red-600 hover:underline dark:text-red-500"
                >
                  Remove
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Dialog
        containerClassName="max-h-[80vh] overflow-y-scroll"
        open={isMovieModalOpen}
        onOpenChange={(open) => setIsMovieModalOpen(open)}
        Content={ActiveDialogContent}
        onInteractOutside={(e: any) => {
          e.preventDefault();
        }}
      ></Dialog>
    </div>
  );
};
export default ListMovies;
