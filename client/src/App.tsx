import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Root from "./pages/Root"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"


const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",element: <Home />
        },
        {
          path: "/login", element: <Login />
        },
        {
          path: "/register", element: <Register />
        }
      ]
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App