import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import OnBoarding from "./pages/OnBoarding";
import SourceConfig from "./pages/SourceConfig";
import ProtectedRoute from "./pages/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",

    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/OnBoarding",
    element: <OnBoarding />,
  },
  {
    path: "/sourceConfig",
    element: <SourceConfig />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
