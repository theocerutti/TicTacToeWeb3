import { createHashRouter, createRoutesFromElements, Route } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import HomePage from '../pages/HomePage';
import ExplorerPage from '../pages/ExplorerPage';
import GamePage from '../pages/GamePage';
import ProtectedRoute from './ProtectedRoute';

export const router = createHashRouter(
  createRoutesFromElements(
    <Route path='/' element={<AppLayout />}>
      <Route path='/' element={<HomePage />} />
      <Route path='explore' element={<ExplorerPage />} />
      <Route path='game/:gameId' element={<ProtectedRoute><GamePage /></ProtectedRoute>} />
    </Route>
  )
);
