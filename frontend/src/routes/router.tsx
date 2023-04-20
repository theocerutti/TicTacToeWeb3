import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import HomePage from '../pages/HomePage';
import ExplorerPage from '../pages/ExplorerPage';
import GamePage from '../pages/GamePage';
import ProtectedRoute from './ProtectedRoute';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="explore" element={<ExplorerPage />} />
      <Route
        path="game/:userId"
        element={
          <ProtectedRoute>
            <GamePage />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);
