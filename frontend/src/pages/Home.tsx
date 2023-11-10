import { Carousel } from "../components/Carousel";
import Movies from "../components/Movies";
export const Home = () => {
  return (
    <div className="flex flex-col justify-center">
      <div className="text-white py-4 flex justify-center ">
        <p className="text-[3rem] text-yellow-500">Welcome to Freeflix</p>
      </div>
      <Movies />
    </div>
  );
};
