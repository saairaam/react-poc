import { AiOutlineArrowRight } from "react-icons/ai";
import Carousel from "./Carousel";

export const Section = ({ movieData, heading, link }: any) => {
  return (
    <section className="w-full pt-20 ">
      <div className="flex flex-col">
        <div className=" bg-black opacity-80"></div>
        <div className="">
          <div className=" gap-x-5 flex  justify-between px-5 text-gray-900">
            <div className="text-xl pl-2">
              <p className="px-3 bg-white rounded-xl justify-center items-center font-semibold">
                {heading}
              </p>
            </div>
            <a
              href={link}
              className=" gap-x-2 text-md flex px-3 bg-white rounded-xl justify-center items-center font-semibold  hover:scale-110 transition-all duration-500 "
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
