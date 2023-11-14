import { movieData } from "../assets/Data";
import { Section } from "../components/Section";
export const Home = () => {
  return (
    <div className="flex flex-col justify-center w-full object-contain">
      <section className="text-white flex justify-center py-48 bg-[url('./src/assets/images/background.jpg')]">
        <p className="hidden text-[3rem] text-yellow-700 font-cinzel md:flex md:justify-center">
          Welcome to freeflix
        </p>
        <div className=" md:hidden flex flex-col justify-center">
          <p className="text-[3rem] text-yellow-700 font-cinzel flex justify-center">
            Welcome
          </p>
          <p className="text-[3rem] text-yellow-700 font-cinzel flex justify-center">
            to
          </p>{" "}
          <p className="text-[3rem] text-yellow-700 font-cinzel flex justify-center">
            freeflix
          </p>
        </div>
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
