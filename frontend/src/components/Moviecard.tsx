import { useContext } from "react";
import { useNavigate } from "react-router-dom";
const noimage = "../assets/images/no-image.jpg";
import "react-lazy-load-image-component/src/effects/blur.css";
import { toast } from "react-toastify";
import Contextpage from "../Contextpage";
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
  const { user } = useContext(Contextpage);

  return (
    <div>
      <div
        onClick={() => {
          if (user) {
            <div className="whitespace-nowrap text-sm">
              {toast.info("To check out the movie sign in or sign up")}
            </div>;
          } else {
            navigate(`/moviedetail/${item.id}`);
          }
        }}
        key={index}
        className="card relative w-full md:w-64 h-[410px] md:h-[240px] my-3 mx-4 md:my-5 md:mx-0 cursor-pointer rounded-xl overflow-hidden group  p-2 transition-all duration-300 transform hover:scale-105 hover:opacity-80"
      >
        <img
          src={"https://image.tmdb.org/t/p/w500" + item.image}
          alt={item.title}
          className="w-full h-48 object-fit rounded-lg transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 group-hover:opacity-0 transition-opacity hover:text-opacity-100"></div>
        <div className="opacity-0 group-hover:opacity-100 duration-300 absolute inset-x-0 bottom-0 flex justify-center items-end text-lg whitespace-nowrap bg-gray-200 text-black font-semibold">
          {item.title}
        </div>
        <div className="absolute  flex justify-center inset-x-0 bottom-0 bg-gray-200 opacity-100 group-hover:opacity-0 font-bold ">
          <div className="flex gap-x-2">
            {upcoming ? (
              <h3 className="text-black">Release date {item.releaseDate}</h3>
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
