import NotFound from "@/pages/404";
import MainFrame from "@/pages/MainFrame";
import { createHashRouter, RouterProvider } from "react-router-dom";
import QuizzPage from "@/pages/QuizzPage";

const router = createHashRouter([
  {
    path: "/",
    element: <MainFrame />,
    children: [
      { index: true, path: ":quizzId", element: <QuizzPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const RouterProv = () => {
  return <RouterProvider router={router} />;
};

export default RouterProv;
