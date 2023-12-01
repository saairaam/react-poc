import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import Contextpage from '../Contextpage';

const Player = () => {
  const { setHeader } = useContext(Contextpage);
  const [moviedet, setMoviedet] = useState([]);
  const { id } = useParams();

  const APIKEY = '81641874fb2655f9a557bc338d178253';
  const fetchMovie = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}&language=en-US`
    );
    const moviedetail = await data.json();
    setMoviedet(moviedetail);
  };

  useEffect(() => {
    fetchMovie();
    setHeader('Player');
  }, []);

  document.title = `${moviedet.title}`;

  return (
    <div className="flex min-h-screen w-full flex-col justify-center gap-y-10">
      <div className="flex justify-center text-4xl text-yellow-500">{moviedet.title}</div>
      <iframe
        className="h-[80vh]"
        title="sssa"
        src="https://www.youtube.com/embed/tgbNymZ7vqY"
      ></iframe>
    </div>
  );
};

export default Player;
