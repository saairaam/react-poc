import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi";
const noimage = "../assets/images/no-image.jpg";
import { FaPlay } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Detail = () => {
  const APIKEY = "81641874fb2655f9a557bc338d178253";
  const { id } = useParams();

  const [moviedet, setMoviedet] = useState<any>();
  const [castdata, setCastdata] = useState<any>([]);
  const [moviegenres, setMoviegenres] = useState<any>([]);
  const [video, setVideo] = useState([]);
  const [loader, setLoader] = useState(Boolean);
  const fetchMovie = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}&language=en-US`
    );
    const moviedetail = await data.json();
    setMoviedet(moviedetail);
    console.log(moviedetail);
    setMoviegenres(moviedetail.genres);
    setLoader(false);
  };

  const fetchCast = async () => {
    const castdata = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${APIKEY}&language`
    );
    const castdetail = await castdata.json();
    setCastdata(castdetail.cast);
    setLoader(false);
  };

  const fetchVideo = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${APIKEY}&language=en-US`
    );
    const videodata = await data.json();
    setVideo(videodata.results);
    // console.log(videodata.results);
  };

  useEffect(() => {
    fetchMovie();
    fetchCast();
    fetchVideo();
  }, []);

  return (
    <div className="min-x-screen overflow-x-scroll">
      {loader ? (
        <div className="h-screen w-full overflow-hidden flex justify-center items-center">
          <span className="loader m-10"></span>
        </div>
      ) : (
        <div>
          <Link
            to="/"
            className="fixed z-10 text-4xl text-black bg-white m-3 md:m-5 rounded-full"
          >
            {<HiChevronLeft />}
          </Link>

          {/* poster */}
          <div className="relative h-auto md:h-[82vh] flex justify-center">
            <div className="h-full shadowbackdrop fixed"></div>
            <h1 className="text-white absolute bottom-0 p-10 text-2xl md:text-6xl font-bold text-center">
              {moviedet?.title}
            </h1>
            {moviedet?.backdrop_path === null ? (
              <img src={noimage} className="h-full" />
            ) : (
              <img
                src={
                  "https://image.tmdb.org/t/p/original/" +
                  moviedet?.backdrop_path
                }
                className="h-full
                "
              />
            )}
          </div>

          {/* overview */}
          <h2 className="text-center p-5">{moviedet?.overview}</h2>

          <div className="text-blue-100 font-semibold my-3 flex justify-center">
            <h2 className="bg-blue-600/30 border-2 border-blue-700 py-2 px-3 rounded-full">
              Release Date : {moviedet?.release_date}
            </h2>
          </div>

          {/* tag */}
          <div className="flex justify-center flex-wrap">
            {moviegenres.map((tag: any) => (
              <>
                <div
                  key={tag.id}
                  className="text-white font-semibold bg-gray-800 rounded-full px-4 py-1 m-2"
                >
                  {tag.name}
                </div>
              </>
            ))}
          </div>
          <div className="flex justify-center items-center mt-3 gap-5 flex-wrap">
            {Array.from(video)
              .filter((trail: any) => trail.type === "Trailer")
              .map((trail: any, index) => (
                <>
                  <>
                    <a
                      key={trail.id}
                      href={"https://www.youtube.com/watch?v=" + trail.key}
                      target="_blank"
                      className="flex border-2 border-red-600 bg-red-600/40 p-3 items-center justify-center gap-2 text-xl font-semibold rounded-full text-white"
                    >
                      <FaPlay />
                      Watch trailer{"  "}
                      {Array.from(video).filter(
                        (trail: any) => trail.type === "Trailer"
                      ).length > 1
                        ? index + 1
                        : ""}
                    </a>
                  </>
                </>
              ))}
          </div>

          {/* cast */}
          <div className="flex flex-col items-center min-w-screen overflow-x-scroll">
            <h1 className="text-3xl text-blue-300 font-semibold text-center p-2">
              Cast
            </h1>

            <div className="md:px-5 flex flex-row my-5 overflow-scroll relative scrollbar-thin scrollbar-thumb-gray-500/20 scrollbar-track-gray-900/90 md:pb-3">
              {castdata.map((cast: any) => (
                <>
                  {cast.profile_path !== null ? (
                    <>
                      <div className="flex min-w-[9rem] md:min-w-[10rem] max-w-[9rem] md:max-w-[10rem] h-full items-center text-center flex-col mx-1">
                        <LazyLoadImage
                          effect="blur"
                          src={
                            "https://image.tmdb.org/t/p/w500" +
                            cast.profile_path
                          }
                          className="w-full h-full rounded-xl"
                        />
                        <p className="text-white">{cast.name}</p>
                        <p className="text-blue-300">({cast.character})</p>
                      </div>
                    </>
                  ) : null}
                </>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Detail;
