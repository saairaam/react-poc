export const Carousel = ({ data }: any) => {
  return (
    <div className="carousel rounded-box gap-x-2">
      {data.map((item: any) => {
        return (
          <div className="carousel-item w-1/5">
            <img src={item.poster_path} alt="Movie" />
          </div>
        );
      })}
    </div>
  );
};
