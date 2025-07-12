import NotFound from "@/pages/404";
import MainFrame from "@/pages/MainFrame";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import QuizzPage from "@/pages/QuizzPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainFrame />,
    children: [
      { index: true, element: <QuizzPage /> },
      { path: ":quizzId", element: <QuizzPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const RouterProv = () => {
  return <RouterProvider router={router} />;
};

export default RouterProv;
