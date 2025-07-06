import NotFound from "@/pages/404";
import Home from "@/pages/Home";
import MainFrame from "@/pages/MainFrame";
import Page3 from "@/pages/Page3";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import QuizzPage from "@/pages/QuizzPage";
import ResultsPage from "@/pages/ResultsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainFrame />,
    children: [
      { index: true, element: <Home /> },
      { path: "quizz/:quizzId", element: <QuizzPage /> },
      { path: "results", element: <ResultsPage /> },
      { path: "page3", element: <Page3 /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const RouterProv = () => {
  return <RouterProvider router={router} />;
};

export default RouterProv;
