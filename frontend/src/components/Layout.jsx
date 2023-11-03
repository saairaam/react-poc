import Navbar from "./Navbar";



export function Layout () {
    return (
            <div className="min-h-screen ">
            <div className="md:ml=[10rem] ">
                <Navbar />
                <outlet />
            </div>
            </div>
      
    )
}