import {
  createBrowserRouter, createRoutesFromElements, Route,
  RouterProvider
} from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import HomePage from "../pages/HomePage";
import ExplorerPage from "../pages/ExplorerPage";
import TicTacToe from "../components/TicTacToe";
import GamePage from "../pages/GamePage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<HomePage/>} />
      <Route path="explorer" element={<ExplorerPage/>} />
      <Route path="game/:userId" element={<GamePage/>} />
    </Route>
  )
);
