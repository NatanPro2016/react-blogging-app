import IsLogedIn, { LogedIn } from "./context/IsLogedIn.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import "./index.css";
import ErrorPage from "./pages/ErrorPage.jsx";
import Users from "./pages/Users.jsx";
import UsersID from "./pages/UsersID.jsx";
import Post from "./pages/Post.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import Me from "./pages/Me.jsx";
import PortectedRoute from "./components/PortectedRoute.jsx";
import Search from "./pages/Search.jsx";
import Saved from "./pages/Saved.jsx";
import LogOut from "./pages/LogOut.jsx";
import ChangeUserName from "./pages/ChangeUserName.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";
import { useContext, useEffect } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PortectedRoute>
        <Dashboard />
      </PortectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/search",
    element: (
      <PortectedRoute>
        <Search />
      </PortectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/saved",
    element: (
      <PortectedRoute>
        <Saved />
      </PortectedRoute>
    ),
    errorElement: <ErrorPage />,
  },

  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/me",
    element: (
      <PortectedRoute>
        <Me />
      </PortectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/changepassword",
    element: (
      <PortectedRoute>
        <ChangePassword />
      </PortectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/ChangeUserName",
    element: (
      <PortectedRoute>
        <ChangeUserName />
      </PortectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/logout",
    element: (
      <PortectedRoute>
        <LogOut />
      </PortectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/createPost",
    element: (
      <PortectedRoute>
        <CreatePost />
      </PortectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/user/id/:id",
    element: (
      <PortectedRoute>
        <UsersID />
      </PortectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/user/:userName",
    element: (
      <PortectedRoute>
        <Users />
      </PortectedRoute>
    ),
    errorElement: <ErrorPage />,
  },

  {
    path: "/posts/post/:id",
    element: (
      <PortectedRoute>
        <Post />
      </PortectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
]);
function App() {
  const { user } = useContext(LogedIn);
  useEffect(() => {
    if (user.darkmode === false) {
      document.body.setAttribute("data-theme", "light");
      console.log(user.darkmode);
    }
  }, [user]);
  return <RouterProvider router={router} />;
}

export default App;
