import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Login from "../authentication/Login";
import Register from "../authentication/Register";
import HomePage from "../pages/HomePage";
import Upload from "../pages/Upload";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <div>404 error</div>,
    element: <Main />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "upload",
        element: <Upload />,
      },
    ],
  },
]);

export default router;
