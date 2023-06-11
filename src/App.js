import React from "react";
import { RouterProvider } from "react-router-dom";
import moment from "moment/min/moment-with-locales";
import Moment from "react-moment";
import "moment/locale/fr";

// Components
import Loading from "./components/Loading/Loading";

// Router
import router from "./router/router"

// Redux (inutilisé)
import { store } from "./redux";

// --------------------- MOMENT ----------------------------
// Sets the moment instance to use.
Moment.globalMoment = moment;

// Set the locale for every react-moment instance to French.
Moment.globalLocale = "fr";

// Set the output format for every react-moment instance.
Moment.globalFormat = "DD/MM/YYYY";

// // Set the timezone for every instance.
// Moment.globalTimezone = "France/Paris";

// // Set the output timezone for local for every instance.
Moment.globalLocal = true;

// // Use a <span> tag for every react-moment instance.
// Moment.globalElement = "span";

// Upper case all rendered dates.
Moment.globalFilter = (d) => {
  return d.toUpperCase();
};

function App() { 
  return <RouterProvider router={router} fallbackElement={<Loading loading={true} />} />
}

export default App;
