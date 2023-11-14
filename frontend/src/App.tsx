import { Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Navbar from "./components/Navbar";
import { MovieProvider } from "./Contextpage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Home } from "./pages/Home";
import Detail from "./components/Detail";
import Player from "./pages/Player";
import SignUp from "./auth/Signup";
import Upcoming from "./pages/Upcoming";
import Trending from "./pages/Trending";
import { AdminHome } from "./pages/AdminHome";
import { Logout } from "./auth/Logout";

function App() {
  return (
    <MovieProvider>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="bg-gray-800">
        <Navbar />
        <div className="min-h-screen flex justify-center align-baseline bg-[#212B37]">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/moviedetail/:id" element={<Detail />} />
            <Route path="/player/:id/:moviename" element={<Player />} />
            <Route path="/" element={<Home />} />
            <Route path="/adminhome" element={<AdminHome />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </div>
    </MovieProvider>
  );
}

export default App;
