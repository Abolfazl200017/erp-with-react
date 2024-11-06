import SidebarView from "./SidebarView";
import { useTheme } from "@mui/material";

function SidebarContainer({ handleDrawerClose, open }) {
  const theme = useTheme();


  return <SidebarView handleDrawerClose={handleDrawerClose} theme={theme} open={open} />
}

export default SidebarContainer;