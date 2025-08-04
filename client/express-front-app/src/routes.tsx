import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";
import UserList from "./pages/UserList";
import UpdateUser from "./pages/UpdateUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "add-user", element: <AddUser /> },
      { path: "users", element: <UserList /> },
      { path: "update-user/:id", element: <UpdateUser /> },
    ],
  },
]);

export default router;