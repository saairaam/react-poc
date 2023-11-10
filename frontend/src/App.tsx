import { Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Navbar from "./components/Navbar";
import { MovieProvider } from "./Contextpage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Home } from "./pages/Home";
import Detail from "./components/Detail";
import Player from "./pages/Player";
import Movies from "./components/Movies";
import SignUp from "./auth/Signup";
import Upcoming from "./pages/Upcoming";
import Trending from "./pages/Trending";
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
      <Navbar></Navbar>
      <div className="min-h-screen min-w-screen flex items-start justify-center align-baseline">
        <Routes>
          {/* <Route path='/home' element={<Home />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/moviedetail/:id" element={<Detail />} />
          <Route path="/player/:id/:moviename" element={<Player />} />
          <Route path="/" element={<Home />}></Route>
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/trending" element={<Trending />} />
        </Routes>
      </div>
    </MovieProvider>
  );
}

export default App;
