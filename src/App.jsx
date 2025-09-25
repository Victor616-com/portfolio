import { useState } from 'react'
import './App.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from '../Layout';
import HomePage from './pages/HomePage';
import SpotlightPage from './pages/SpotlightPage';
import VacaPage from './pages/VacaPage';
import BetterToDoPage from './pages/BetterToDoPage';

const router = createBrowserRouter([
    {
        path: "/portfolio/",
        element: <Layout />,
        children: [
            {
              index: true,
              element: <HomePage />,
            },
            {
              path: "spotlight",
              element: <SpotlightPage />,
            },
            {
              path: "vaca",
              element: <VacaPage />,
            },
            {
              path: "BetterToDo",
              element: <BetterToDoPage />,
            },
            
        ],
    },
]);

function App() {
  

  return (
    <RouterProvider router={router} />
  );
}

export default App
