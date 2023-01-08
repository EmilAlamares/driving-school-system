import {
  List,
  ListItem,
  MenuItem,
  Menu,
  ListItemButton,
  Typography,
} from "@mui/material"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import React, { useEffect } from "react"
import { useState } from "react"
import axios from "axios"
import { BranchContext } from "../contexts/BranchContext"
import { useContext } from "react"

const BranchMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [branches, setBranches] = useState([])
  const open = Boolean(anchorEl)
  const {setBranch} = useContext(BranchContext) 

  const handleClickListItem = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index)
    setBranch(branches[index])
    setAnchorEl(null)
  }

  const handleClose = (e) => {
    setAnchorEl(null)
  }

  const fetchBranches = async () => {
    const response = await axios.get(`${process.env.REACT_APP_URL}/branches`)

    setBranches(response.data)
  }

  useEffect(() => {
    fetchBranches()
  }, [])

  return (
    branches && <React.Fragment>
      <List
        sx={{ position: "absolute", right: 120, p: 0 }}
        component="nav"
        aria-label="Device settings"
        variant="outlined"
      >
        <ListItem disablePadding>
          <ListItemButton
            id="branch-button"
            onClick={handleClickListItem}
            sx={{ paddingRight: "4px" }}
          >
            <Typography variant="h6"> {branches[selectedIndex]?.name}</Typography>
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
            key={branch._id}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {branch.name}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  )
}

export default BranchMenu
