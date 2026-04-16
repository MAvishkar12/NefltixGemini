import React from "react";
import Login from "./Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./Browse";

function Body() {
  const appouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />, // after sign in user visit
    },
  ]);

  return (
    <div>
      {/* */}

      <RouterProvider router={appouter} />
    </div>
  );
}

export default Body;
