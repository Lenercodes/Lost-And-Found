import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Find from "./pages/Find";
import Post from "./pages/Post";
import Details from "./pages/Details";
import Login from "./pages/Login";
import About from "./pages/About";
import ClaimItem from "./pages/ClaimItem";
import ReportItem from "./pages/ReportItem";
import Profile from "./pages/Profile";
import ViewListings from "./pages/ViewListings";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/find' element={<Find />} />
        <Route path='/post' element={<Post />} />
        <Route path='/find/details/:id' element={<Details />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/claim/:id' element={<ClaimItem />} />
        <Route path='/report' element={<ReportItem />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/listings' element={<ViewListings />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
