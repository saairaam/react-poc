import { Route, Routes } from 'react-router-dom';
import Login from './auth/Login';
import Navbar from './components/Navbar';
import { MovieProvider } from './Contextpage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Home } from './pages/Home';
import Detail from './components/Detail';
import SignUp from './auth/Signup';
import Upcoming from './pages/Upcoming';
import Trending from './pages/Trending';
import { Logout } from './auth/Logout';
import Profile from './pages/Profile';
import { AdminHome } from './pages/AdminHome';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import PageNotFound from './pages/PageNotFound';

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
        <div className="flex min-h-screen justify-center bg-[#212B37] align-baseline">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/moviedetail/:id" element={<Detail />} />
            <Route path="/" element={<Home />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/landing" element={<PageNotFound />} />
            <Route element={<AdminProtectedRoute />}>
              <Route path="/adminhome" element={<AdminHome />} />
              {/* <Route path="/edit/:movieId" element={< />} /> */}
            </Route>
          </Routes>
        </div>
      </div>
    </MovieProvider>
  );
}

export default App;
