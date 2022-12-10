import * as React from "react"
import PropTypes from "prop-types"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import MenuIcon from "@mui/icons-material/Menu"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { useLocation } from "react-router"
import { Link } from "react-router-dom"
import DashboardIcon from "@mui/icons-material/Dashboard"
import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Students from "./pages/Students"
import Schedules from "./pages/Schedules"
import Instructors from "./pages/Instructors"
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';

const drawerWidth = 240

function App(props) {
  const { pathname } = useLocation()
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List disablePadding>
        <ListItem key="Dashboard" disablePadding>
          <ListItemButton
            selected={pathname === "/"}
            component={Link}
            to="/"
            onClick={handleDrawerToggle}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        <ListItem key="Students" disablePadding>
          <ListItemButton
            selected={pathname === "/students"}
            component={Link}
            to="/students"
            onClick={handleDrawerToggle}
          >
            <ListItemIcon>
              <SchoolRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Students" />
          </ListItemButton>
        </ListItem>

        <ListItem key="Instructors" disablePadding>
          <ListItemButton
            component={Link}
            to="/instructors"
            onClick={handleDrawerToggle}
            selected={pathname === "/instructors"}
          >
            <ListItemIcon>
              <AccountCircleRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Instructors" />
          </ListItemButton>
        </ListItem>

        <ListItem key="Schedules" disablePadding>
          <ListItemButton
            component={Link}
            to="/schedules"
            onClick={handleDrawerToggle}
            selected={pathname === "/schedules"}
          >
            <ListItemIcon>
              <CalendarMonthRoundedIcon />
            </ListItemIcon>

            <ListItemText primary="Schedules" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Driving School Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="/instructors" element={<Instructors />} />
          <Route path="/schedules" element={<Schedules />} />
        </Routes>
      </Box>
    </Box>
  )
}

App.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
}

export default App
