import { useEffect, useContext } from 'react';
import Contextpage from '../Contextpage';
import Moviecard from '../components/Moviecard';
// import { Pagebtn } from '../components/Pagebtn';

function Trending() {
  const { fetchTrending, trending } = useContext(Contextpage);

  useEffect(() => {
    fetchTrending();
  });

  return (
    <div>
      <div className="font-cinzel flex justify-center text-4xl text-yellow-700">Trending</div>
      <div className="mb-20  w-full md:mb-0 md:p-10">
        <div className="relative flex flex-wrap justify-evenly md:justify-around">
          <>
            {trending.map((tred: any) => (
              <Moviecard key={tred.id} item={tred} />
            ))}
          </>
        </div>
        {/* <Pagebtn /> */}
      </div>
    </div>
  );
}

export default Trending;
