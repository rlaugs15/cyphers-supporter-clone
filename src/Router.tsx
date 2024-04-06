import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home/Home";
import Characters from "./pages/Characters/Characters";
import PlayerBasicInfo from "./pages/Home/PlayerBasicInfo";

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
