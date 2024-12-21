import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Signup from "./pages/signup/signup";
import Login from "./pages/login/login";
import HomeAdmin from "./pages-admin/home-admin/home-admin";
import AddItem from "./pages-admin/add-card/add-card";
import "./app.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home-admin" element={<HomeAdmin />} />
          <Route path="/add-card" element={<AddItem />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
