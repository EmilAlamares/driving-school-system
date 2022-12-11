import {
  List,
  ListItem,
  MenuItem,
  Menu,
  ListItemButton,
  Typography,
} from "@mui/material"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import React from "react"
import { useState } from "react"

const branches = ["Taguig", "Caloocan", "Makati", "Cavite"]

const BranchMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const open = Boolean(anchorEl)

  const handleClickListItem = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index)
    setAnchorEl(null)
  }

  const handleClose = (e) => {
    setAnchorEl(null)
  }

  return (
    <React.Fragment>
      <List
        sx={{ position: "absolute", right: 120, p: 0 }}
        component="nav"
        aria-label="Device settings"
        variant="outlined"
      >
        <ListItem disablePadding>
          <ListItemButton id="branch-button" onClick={handleClickListItem} sx={{paddingRight: '4px'}}>
            <Typography variant="h6"> {branches[selectedIndex]}</Typography>
            <ArrowDropDownIcon sx={{ p: 0 }} />
          </ListItemButton>
        </ListItem>
      </List>
      <Menu
        id="branch-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {branches.map((branch, index) => (
          <MenuItem
            key={branch}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {branch}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  )
}

export default BranchMenu
