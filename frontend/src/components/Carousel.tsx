import Moviecard from "./Moviecard";

const Carousel = ({ items }: any) => {
  return (
    <div className="min-w-screen">
      <div className="flex md:p-1 gap-x-3 overflow-x-scroll ">
        {items.slice(0, 10).map((item: any, index: number) => (
          <Moviecard item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
