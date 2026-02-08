import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {Provider} from 'react-redux'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Details from "./Pages/Details.jsx";
import store from "./redux/store.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },{
    path: "/detail/:idMeal",
    element: <Details />
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
   <Provider store={store}>
     <RouterProvider router={router} />
   </Provider>
  </StrictMode>
);
