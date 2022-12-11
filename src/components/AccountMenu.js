import { Avatar, Menu, MenuItem, IconButton } from "@mui/material"
import { useState } from "react"

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = (e) => {
    setAnchorEl(null)
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
        <MenuItem>Account Settings</MenuItem>
        <MenuItem>Log Out</MenuItem>
      </Menu>
    </>
  )
}

export default AccountMenu
