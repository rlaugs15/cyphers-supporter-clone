import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home/Home/Home";
import Characters from "./pages/Characters/Characters";
import PlayerBasicInfo from "./pages/Home/Home/PlayerBasicInfo";
import MostCyAll from "./pages/Home/Home/MostCypher/MostCyAll";
import MostCyRating from "./pages/Home/Home/MostCypher/MostCyRating";
import MostCyNomal from "./pages/Home/Home/MostCypher/MostCyNomal";
import Players from "./pages/Home/Players/Players";
import PlayersComparison from "./pages/Home/Players/PlayersComparison/PlayersComparison";
import Matches from "./pages/Home/Players/Matchs/Matches";
import ItemDetailScreen from "./components/ItemDetailScreen";
import CharacterInfo from "./pages/Characters/CharacterInfo/CharacterInfo";

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
        path: "players",
        element: <Players />,
        children: [
          {
            path: "playersinfo",
            element: <PlayersComparison />,
          },
        ],
      },
      {
        path: "matches/:matchId",
        element: <Matches />,
      },
      {
        path: "characters",
        element: <Characters />,
        children: [
          {
            path: ":characterName",
            element: <CharacterInfo />,
          },
        ],
      },
    ],
  },
]);
