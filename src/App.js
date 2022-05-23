import Navbar from "./components/Navbar/Navbar";
import './App.css';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import { AuthProvider } from "./services/auth";
import PrivateRoute from "./PrivateRoute";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";


function App() {

  return (
    <AuthProvider>
    <Router>
      <Navbar/>
      <div>
      <PrivateRoute exact path="/" component={Home} />
      <Route  path="/login" component={Login} />
      <Route path="/profile" component={Profile} />
      <Route path="/register" component={Register} />
    </div>
    </Router>
    </AuthProvider>
  )
}

export default App;
