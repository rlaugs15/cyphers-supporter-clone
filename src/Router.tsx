import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home/Home";
import Characters from "./pages/Characters/Characters";
import PlayerBasicInfo from "./pages/Home/PlayerBasicInfo";
import MostCyAll from "./pages/Home/MostCypher/MostCyAll";
import MostCyRating from "./pages/Home/MostCypher/MostCyRating";
import MostCyNomal from "./pages/Home/MostCypher/MostCyNomal";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
        children: [
          {
            path: ":nickname",
            element: <PlayerBasicInfo />,
            children: [
              {
                path: "mostcyall",
                element: <MostCyAll />,
              },
              {
                path: "mostcyrating",
                element: <MostCyRating />,
              },
              {
                path: "mostcynomal",
                element: <MostCyNomal />,
              },
            ],
          },
        ],
      },
      {
        path: "characters",
        element: <Characters />,
      },
    ],
  },
]);
