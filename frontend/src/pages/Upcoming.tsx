import React, { useEffect, useContext } from "react";
import Contextpage from "../Contextpage";
import Moviecard from "../components/Moviecard";

function Upcoming() {
  const { fetchUpcoming, upcoming } = useContext(Contextpage);

  useEffect(() => {
    fetchUpcoming();
  });

  return (
    <div>
      <div className="flex justify-center text-yellow-700 font-cinzel text-4xl">
        Upcoming
      </div>
      <div className="w-full md:p-10 mb-20 md:mb-0">
        <div className="flex flex-wrap relative justify-evenly md:justify-around">
          <>
            {upcoming.map((upc: any) => (
              <Moviecard index={upc.id} item={upc} upcoming={true} />
            ))}
          </>
        </div>
      </div>
    </div>
  );
}

export default Upcoming;
