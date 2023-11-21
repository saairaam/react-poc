import { movieData } from '../assets/Data';
import ListMovies from '../components/ListMovies';
import useReduxAuthState from '../use-redux-auth-state';
export const AdminHome = () => {
  const auth = useReduxAuthState();
  const { user } = auth;
  return (
    <div className="flex w-[80%]  flex-col gap-10">
      <div className="font-cinzel flex justify-center text-4xl text-yellow-700">
        Welcome {user?.username}
      </div>
      <div>
        <ListMovies movies={movieData} />
      </div>
    </div>
  );
};
