import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Details from "./Pages/Details.jsx";

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
    <RouterProvider router={router} />
  </StrictMode>
);
