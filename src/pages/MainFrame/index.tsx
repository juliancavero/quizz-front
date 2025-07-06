import React from "react";
import { Outlet } from "react-router-dom";

const MainFrame: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MainFrame;
