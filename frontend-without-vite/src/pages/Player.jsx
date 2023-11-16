import React, { useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { getSmashystreamUrl, getSuperembedUrl, get2embedUrl } from "../movies";
import { useState } from "react";
import Contextpage from "../Contextpage";
import { HiChevronLeft } from "react-icons/hi";

const Player = () => {
  const { setHeader } = useContext(Contextpage);
  const [moviedet, setMoviedet] = useState([]);
  const { id } = useParams();

  const APIKEY = "81641874fb2655f9a557bc338d178253";
  const fetchMovie = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}&language=en-US`
    );
    const moviedetail = await data.json();
    setMoviedet(moviedetail);
  };

  useEffect(() => {
    fetchMovie();
    setHeader("Player");
  }, []);

  document.title = `${moviedet.title}`;

  return (
    <div className="flex flex-col justify-center bg-blur gap-y-10 w-full min-h-screen">
      <div className="flex justify-center text-4xl text-yellow-500">
        {moviedet.title}
      </div>
      <iframe
        className="h-[80vh]"
        src="https://www.youtube.com/embed/tgbNymZ7vqY"
      ></iframe>
    </div>
  );
};

export default Player;
