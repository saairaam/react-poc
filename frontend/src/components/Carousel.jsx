import Moviecard from "./Moviecard"
import Movies from "./Movies"

export const Carousel = ({data}) => {
    return (
        <div className="min-w-screen">
        <div className="carousel rounded-box gap-x-2">
        {/* {data.map((item) => {
            return (
               <Moviecard movie={item} />)
        })}
         */}
        {<Movies/ >}
        </div>
        </div>
    )
}