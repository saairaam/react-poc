import { movieData } from "../assets/Data";
import { Section } from "../components/Section";
export const AdminHome = () => {
  return (
    <div className="flex flex-col justify-center w-full">
      <section className="text-white flex justify-center py-48">
        <p className="text-[3rem] text-yellow-700 font-cinzel">Welcome Admin</p>
      </section>
      <div>
        <Section
          link={"/upcoming"}
          heading={"Upcoming Movies"}
          movieData={movieData}
        />
        <Section
          link={"/trending"}
          heading={"Trending Movies"}
          movieData={movieData}
        />
        <Section
          link={"/mostAcclaimed"}
          heading={"Most Acclaimed Movies"}
          movieData={movieData}
        />
      </div>
    </div>
  );
};
