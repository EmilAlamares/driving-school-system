import { List, ListItem, Drawer } from "@mui/material"

const Sidebar = () => {
  return (
    <Drawer
      anchor="left"
      variant="temporary"
      ModalProps={{ keepMounted: false }}
    >
      <List>
        <ListItem>Dashboard</ListItem>
      </List>
    </Drawer>
  )
}

export default Sidebar
