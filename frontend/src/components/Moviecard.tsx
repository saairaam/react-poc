import { useNavigate } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";
import { toast } from "react-toastify";
import useReduxAuthState from "../use-redux-auth-state";
const MovieRating = (item: any) => {
  return (item.vote_average || 0) > 7 ? (
    <h3 className=" text-green-700 ">{(item.vote_average || 0).toFixed(1)}</h3>
  ) : (item.vote_average || 0) > 5.5 ? (
    <h3 className=" text-orange-400 ">{(item.vote_average || 0).toFixed(1)}</h3>
  ) : (
    <h3 className=" text-red-600">{(item.vote_average || 0).toFixed(1)}</h3>
  );
};
const Moviecard = ({ item, index, upcoming }: any) => {
  const navigate = useNavigate();
  const auth = useReduxAuthState();

  return (
    <div className="">
      <div
        onClick={() => {
          if (!auth.user) {
            <div className="whitespace-nowrap text-sm">
              {toast.info("To check out the movie sign in or sign up")}
            </div>;
          } else {
            navigate(`/moviedetail/${item.id}`);
          }
        }}
        className="card relative w-full h-full md:w-64 lg:w-64 lg:h-[240px] md:h-[240px] my-3 md:mx-4 md:my-5  cursor-pointer rounded-xl overflow-hidden group p-1  lg:p-2 md:p-2 md:transition-all md:duration-300 md:transform md:hover:scale-105 md:hover:opacity-80 lg:transition-all lg:duration-300 lg:transform lg:hover:scale-105 lg:hover:opacity-80"
      >
        <img
          src={"https://image.tmdb.org/t/p/w500" + item.image}
          alt={item.title}
          className="w-full md:h-64 object-fit rounded-lg transition-opacity duration-300"
        />
        <div className=" absolute md:inset-0 md:bg-gradient-to-b from-transparent to-black md:opacity-50 md:group-hover:opacity-0 md:transition-opacity md:hover:text-opacity-100"></div>
        <div className=" opacity-100 md:opacity-0 md:group-hover:opacity-100 md:duration-300 absolute inset-x-0 bottom-0 flex justify-center items-end text-lg whitespace-nowrap bg-gray-200 text-black font-semibold">
          {item.title}
        </div>
        <div className="absolute  opacity-0 flex justify-center inset-x-0 bottom-0 bg-gray-200 md:opacity-100 md:group-hover:opacity-0 font-bold ">
          <div className="flex gap-x-2 ">
            {upcoming ? (
              <h3 className="text-black opacity-0 md:opacity-100 md">
                Release date {item.releaseDate}
              </h3>
            ) : (
              <>
                <h3 className="text-black">The People's rating</h3>
                <MovieRating item={item} />
              </>
            )}
          </div>
        </div>
      </div>

      {/* <Moviecard movie={item} key={item.id} /> */}
    </div>
  );
};

export default Moviecard;
