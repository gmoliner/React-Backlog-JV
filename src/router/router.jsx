import { createBrowserRouter } from "react-router-dom";

// layout
import RootLayout from "../layouts/RootLayout";

// Components
import PrivateRoute from "../components/PrivateRoute";
import RedirectUser from "../components/RedirectUser";

// Pages
import PopularGames from "../pages/Games/PopularGames";
import GameDetail from "../pages/GameDetail/GameDetail";
import Search from "../pages/Search/Search";
import Home from "../pages/Home/Home";
import NoMatch from "../pages/NoMatch/NoMatch";
import Dashboard from "../pages/Login/Dashboard";
import Login from "../pages/Login/Login";
import Signup from "../pages/Login/Signup";
import UpdateProfile from "../pages/Login/UpdateProfile";
import ForgotPassword from "../pages/Login/ForgotPassword";
import BacklogHome from "../pages/Backlog/BacklogHome";

const router = createBrowserRouter([
    {
    element: <RootLayout />,
    children: [
      {
        path: "/", 
        element: <Home />
      },
      {
        path: "dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
      },     
      {
        path: "login",
        element: <RedirectUser><Login /></RedirectUser>,
      },      
      {
        path: "signup",
        element: <RedirectUser><Signup /></RedirectUser>,
      },      
      {
        path: "update-profile",
        element: <PrivateRoute><UpdateProfile /></PrivateRoute>,
      },   
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },                      
      {
        path: "backlog",
        element: <PrivateRoute><BacklogHome /></PrivateRoute>,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "games",
        element: <PopularGames />
      }, 
      {
        path: "/games/:gameID",
        element: <GameDetail />
      },
      {
        path: "*",
        element: <NoMatch />
      }   
    ],
  },
]);

export default router