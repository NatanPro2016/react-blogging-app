import IsLogedIn from "./context/IsLogedIn.jsx";

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
  return (
    <IsLogedIn>
      <RouterProvider router={router} />
    </IsLogedIn>
  );
}

export default App;
