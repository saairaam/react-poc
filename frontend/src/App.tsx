import { Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Navbar from "./components/Navbar";
import { MovieProvider } from "./Contextpage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Home } from "./pages/Home";
import Detail from "./components/Detail";
import Player from "./pages/Player";
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
      <div className="bg-[url('./src/assets/images/background.jpg')] min-h-screen  flex items-start justify-center align-baseline font-cinzel">
        <Routes>
          {/* <Route path='/home' element={<Home />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Login />} />
          <Route path="moviedetail/:id" element={<Detail />} />
          <Route path="player/:id/:moviename" element={<Player />} />
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </div>
    </MovieProvider>
  );
}

export default App;
