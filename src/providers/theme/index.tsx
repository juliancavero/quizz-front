import { ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProv = ({ children }: ThemeProviderProps) => {
  return <>{children}</>;
};

export default ThemeProv;
