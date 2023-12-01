import Moviecard from "./Moviecard";

const Carousel = ({ items }: any) => {
  return (
    <div className="min-w-screen">
      <div className=" md:p-1  gap-y-2 md:gap-x-3 overflow-x-scroll flex flex-col md:flex-row lg:flex-row">
        {items.slice(0, 10).map((item: any, index: number) => (
          <Moviecard item={item} index={index} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
