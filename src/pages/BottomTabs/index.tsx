import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BottomTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate(); // Se inicializa la navegación

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
    // Nueva lógica de navegación:
    switch (newValue) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/page2");
        break;
      case 2:
        navigate("/page3");
        break;
      default:
        break;
    }
  };

  return (
    <BottomNavigation
      style={{ width: "100%" }}
      value={activeTab}
      onChange={handleChange}
    >
      <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction label="Page2" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Page3" icon={<SettingsIcon />} />
    </BottomNavigation>
  );
};

export default BottomTabs;
