import { useEffect, useContext } from 'react';
import Contextpage from '../Contextpage';
import Moviecard from '../components/Moviecard';

function Upcoming() {
  const { fetchUpcoming, upcoming } = useContext(Contextpage);

  useEffect(() => {
    fetchUpcoming();
  });

  return (
    <div>
      <div className="font-cinzel flex justify-center text-4xl text-yellow-700">Upcoming</div>
      <div className="mb-20 w-full md:mb-0 md:p-10">
        <div className="relative flex flex-wrap justify-evenly md:justify-around">
          <>
            {upcoming.map((upc: any) => (
              <Moviecard key={upc.id} item={upc} upcoming={true} />
            ))}
          </>
        </div>
      </div>
    </div>
  );
}

export default Upcoming;
