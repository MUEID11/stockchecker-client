import { createBrowserRouter } from "react-router-dom";
import Main from "../../Main";
import Login from "../authentication/Login";
import Register from "../authentication/Register";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <div>404 error</div>,
    element: <Main />,
    children: [
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
