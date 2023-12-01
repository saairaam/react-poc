import { AiOutlineArrowRight } from 'react-icons/ai';
import Carousel from './Carousel';

export const Section = ({ movieData, heading, link }: any) => {
  return (
    <section className="w-full pt-20 ">
      <div className="flex flex-col">
        <div className=" bg-black opacity-80"></div>
        <div className="">
          <div className=" flex justify-between  gap-x-5 px-5 text-gray-900">
            <div className="pl-2 text-xl">
              <p className="items-center justify-center rounded-xl bg-white px-3 font-semibold">
                {heading}
              </p>
            </div>
            <a
              href={link}
              className="flex items-center justify-center gap-x-2 rounded-xl bg-white px-3 font-semibold  transition-all duration-500 hover:scale-110 "
            >
              <p className="">View All</p>
              <AiOutlineArrowRight className="" size={22} />
            </a>
          </div>
        </div>

        <Carousel items={movieData} />
      </div>
    </section>
  );
};
