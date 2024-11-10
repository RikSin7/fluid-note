import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Notes from "./components/Notes";
import ViewNote from "./components/ViewNote";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Home />
      </div>
    ),
  },
  {
    path: "/notes",
    element: (
      <div>
        <Navbar />
        <Notes />
      </div>
    ),
  },
  {
    path: "/notes/:id",
    element: (
      <div>
        <Navbar />
        <ViewNote />
      </div>
    ),
  },
]);

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#000000]">
      <RouterProvider router={router}>App</RouterProvider>
    </div>
  );
}

export default App;
