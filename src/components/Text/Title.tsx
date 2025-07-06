import React from "react";

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ children, className = "" }) => {
  return <h1 className={`text-2xl font-bold m-4 ${className}`}>{children}</h1>;
};

export default Title;
