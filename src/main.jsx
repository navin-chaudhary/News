import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import About from './components/About.jsx'
import './index.css'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App/>} />
      <Route path="/About" element={<About/>} />
      </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);