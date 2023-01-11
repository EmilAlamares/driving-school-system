import BranchCard from "./components/BranchCard"
import AddIcon from "@mui/icons-material/Add"
import Fab from "@mui/material/Fab"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import { Close } from "@mui/icons-material"
import { Divider, IconButton } from "@mui/material"
import TextField from "@mui/material/TextField"
import { useEffect, useState, useContext } from "react"
import axios from "axios"

import { BranchesContext } from "../../contexts/BranchesContext"

const Branches = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [name, setName] = useState(null)
  const [address, setAddress] = useState(null)
  const { branches, setBranches } = useContext(BranchesContext)

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    width: "400px",
    borderRadius: "10px",
    boxShadow: 24,
    p: "24px",
  }

  const handleSubmit = async () => {
    const data = {
      name,
      address,
    }

    const response = await axios.post(
      `${process.env.REACT_APP_URL}/branches`,
      data
    )

    console.log(response)
    fetchBranches()
  }

  const fetchBranches = async () => {
    const response = await axios.get(`${process.env.REACT_APP_URL}/branches`)

    setBranches(response.data)
  }

  return (
    <div>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "absolute", right: 30, bottom: 30 }}
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
      {branches &&
        branches.map((branch) => (
          <BranchCard name={branch.name} address={branch.address} />
        ))}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            overflow={"hidden"}
          >
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h2"
              color={"#1976d2"}
              fontWeight={"bold"}
            >
              New Branch
            </Typography>

            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
          <Divider sx={{ marginTop: "24px" }} />

          <Box>
            <TextField
              variant="standard"
              label="Branch Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              fullWidth
              autoComplete="off"
            />
          </Box>
          <Box mt={"12px"}>
            <TextField
              variant="standard"
              label="Address"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              fullWidth
              autoComplete="off"
            />
          </Box>

          <Box textAlign={"right"} mt={"24px"}>
            <Button variant="text" sx={{ color: "red" }} onClick={handleClose}>
              Close
            </Button>
            <Button variant="text" sx={{ color: "orange" }}>
              Reset
            </Button>
            <Button
              variant="text"
              onClick={() => {
                handleSubmit()
                handleClose()
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default Branches
