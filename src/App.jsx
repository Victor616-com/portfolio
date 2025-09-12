import { useState } from 'react'
import './App.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from '../Layout';
import HomePage from './pages/HomePage';

const router = createBrowserRouter([
    {
        path: "/portfolio/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <HomePage />,
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
