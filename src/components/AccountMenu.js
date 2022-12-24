import { Avatar, Menu, MenuItem, IconButton } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const AccountMenu = () => {
  let navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = (e) => {
    setAnchorEl(null)
  }

  const handleLogout = (e) => {
    setAnchorEl(null)
    navigate('/login')
  }

  return (
    <>
      <IconButton
        sx={{ position: "absolute", right: 48, p: 0 }}
        onClick={handleOpen}
      >
        <Avatar sx={{ bgcolor: "purple" }}>J</Avatar>
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
