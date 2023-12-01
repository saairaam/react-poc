import { movieData } from '../assets/Data';
import { Section } from '../components/Section';
export const Home = () => {
  return (
    <div className="flex w-full flex-col justify-center object-contain">
      <section className="flex justify-center bg-[url('')] py-48 text-white">
        <p className="font-cinzel hidden text-[3rem] text-yellow-700 md:flex md:justify-center">
          Welcome to freeflix
        </p>
        <div className=" flex flex-col justify-center md:hidden">
          <p className="font-cinzel flex justify-center text-[3rem] text-yellow-700">Welcome</p>
          <p className="font-cinzel flex justify-center text-[3rem] text-yellow-700">to</p>{' '}
          <p className="font-cinzel flex justify-center text-[3rem] text-yellow-700">freeflix</p>
        </div>
      </section>
      <div>
        <Section link={'/upcoming'} heading={'Upcoming Movies'} movieData={movieData} />
        <Section link={'/trending'} heading={'Trending Movies'} movieData={movieData} />
        <Section link={'/mostAcclaimed'} heading={'Most Acclaimed Movies'} movieData={movieData} />
      </div>
    </div>
  );
};
