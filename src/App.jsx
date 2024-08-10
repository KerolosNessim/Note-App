import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import { RecoilRoot } from "recoil";

function App() {
  let routers = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <Register /> },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        { path: "home", element: <Home /> },
      ],
    },
  ]);
  return (
    <>
      <RecoilRoot>
        <RouterProvider router={routers}></RouterProvider>
      </RecoilRoot>
    </>
  );
}

export default App;
