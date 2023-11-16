import React, { useEffect, useContext } from "react";
import Contextpage from "../Contextpage";

const Genre = () => {
  const { fetchGenre, genres, user, setActiveGenre, activegenre } =
    useContext(Contextpage);

  useEffect(() => {
    fetchGenre(); // Fetching Genres on Initial Render.
  }, []);

  return (
    <>
      <div className="flex flex-wrap justify-center px-2">
        {user &&
          genres.map((genre: any) => (
            <button
              onClick={() => setActiveGenre(genre.id)}
              className={
                activegenre === genre.id
                  ? "active px-4 py-2 m-2 text-[15px] text-white font-semibold rounded-3xl"
                  : "px-4 py-2 m-2 text-[15px] bg-slate-800 text-white font-semibold rounded-3xl"
              }
              key={genre.id}
            >
              {genre.name}
            </button>
          ))}
      </div>
    </>
  );
};

export default Genre;
