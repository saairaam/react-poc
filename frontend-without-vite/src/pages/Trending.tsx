import { useEffect, useContext } from "react";
import Contextpage from "../Contextpage";
import Moviecard from "../components/Moviecard";
// import { Pagebtn } from '../components/Pagebtn';

function Trending() {
  const { fetchTrending, trending } = useContext(Contextpage);

  useEffect(() => {
    fetchTrending();
  });

  return (
    <div>
      <div className="flex justify-center text-yellow-700 font-cinzel text-4xl">
        Trending
      </div>
      <div className="w-full  md:p-10 mb-20 md:mb-0">
        <div className="flex flex-wrap relative justify-evenly md:justify-around">
          <>
            {trending.map((tred: any) => (
              <Moviecard index={tred.id} item={tred} />
            ))}
          </>
        </div>
        {/* <Pagebtn /> */}
      </div>
    </div>
  );
}

export default Trending;
