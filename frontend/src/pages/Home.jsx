import { Carousel } from "../components/Carousel"

export const Home = () => {
    const data = [{
    img:'https://cdn.pixabay.com/photo/2014/10/16/09/15/lens-490806_1280.jpg'
    },
    {
    img:'https://cdn.pixabay.com/photo/2014/10/16/09/15/lens-490806_1280.jpg'
        },
    {
    img:'https://cdn.pixabay.com/photo/2014/10/16/09/15/lens-490806_1280.jpg'
        },
    {
    img:'https://cdn.pixabay.com/photo/2014/10/16/09/15/lens-490806_1280.jpg'
        },
    {
    img:'https://cdn.pixabay.com/photo/2014/10/16/09/15/lens-490806_1280.jpg'
        },
    {
    img:'https://cdn.pixabay.com/photo/2014/10/16/09/15/lens-490806_1280.jpg'
        },
    {
    img:'https://cdn.pixabay.com/photo/2014/10/16/09/15/lens-490806_1280.jpg'
    },
    {
    img:'https://cdn.pixabay.com/photo/2014/10/16/09/15/lens-490806_1280.jpg'
        },
    {
    img:'https://cdn.pixabay.com/photo/2014/10/16/09/15/lens-490806_1280.jpg'
        },
    {
    img:'https://cdn.pixabay.com/photo/2014/10/16/09/15/lens-490806_1280.jpg'
        },
    {
    img:'https://cdn.pixabay.com/photo/2014/10/16/09/15/lens-490806_1280.jpg'
        },
    {
    img:'https://cdn.pixabay.com/photo/2014/10/16/09/15/lens-490806_1280.jpg'
        }
    ]
    return (
        <div className="flex flex-col justify-center" >
        <div className="text-white py-4 flex justify-center ">
               <p className="text-[3rem]">Welcome to Freeflix</p> 
        </div>
        <Carousel data={data} />
        </div>
    )
}