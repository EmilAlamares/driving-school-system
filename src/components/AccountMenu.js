import { Avatar, Menu, MenuItem, IconButton } from "@mui/material"
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"
// import axios from "axios"

const AccountMenu = () => {
  let navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const { user } = useContext(UserContext)

  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = (e) => {
    setAnchorEl(null)
  }

  const handleLogout = (e) => {
    setAnchorEl(null)
    localStorage.clear()
    navigate("/login")
  }

  const initials = () => {
    return user.firstName[0] + user.lastName[0]
  }

  return (
    <>
      <IconButton
        sx={{ position: "absolute", right: 48, p: 0 }}
        onClick={handleOpen}
      >
        <Avatar sx={{ bgcolor: "purple" }}>{initials()}</Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ mt: "5px" }}
      >
        <MenuItem onClick={handleClose}>Account Settings</MenuItem>
        <MenuItem onClick={handleLogout}>Log Out</MenuItem>
      </Menu>
    </>
  )
}

export default AccountMenu
