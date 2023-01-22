import Fab from "@mui/material/Fab"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import { Close } from "@mui/icons-material"
import { Divider, IconButton } from "@mui/material"
import TextField from "@mui/material/TextField"
import { useEffect, useState, useContext } from "react"
// import axios from "axios"
// import Autocomplete from "@mui/material/Autocomplete"
import { BranchesContext } from "../../../contexts/BranchesContext"
import SearchIcon from "@mui/icons-material/Search"

const Search = ({handleSearch}) => {
  const [open, setOpen] = useState(false)
  const [studentName, setStudentName] = useState(null)
  const [instructorName, setInstructorName] = useState(null)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [selectedBranch, setSelectedBranch] = useState([])
  const { branches } = useContext(BranchesContext)

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

  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", right: 30, bottom: 30 }}
        onClick={handleOpen}
      >
        <SearchIcon fontSize="large" />
      </Fab>

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
              Search Schedules
            </Typography>

            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
          <Divider sx={{ marginTop: "24px" }} />

          <Box>
            <TextField
              variant="standard"
              label="Student Name"
              onChange={(e) => setStudentName(e.target.value)}
              value={studentName}
              fullWidth
              autoComplete="off"
            />
          </Box>
          <Box>
            <TextField
              variant="standard"
              label="Instructor Name"
              onChange={(e) => setInstructorName(e.target.value)}
              value={instructorName}
              fullWidth
              autoComplete="off"
            />
          </Box>
          {/* <Box>
          <Autocomplete
              fullWidth
              multiple
              id="branches-select"
              options={branches}
              value={selectedBranch}
              onChange={(e, newVal) => setSelectedBranch(newVal)}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} label="Branches" variant="standard" />
              )}
            />
          </Box> */}


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
                handleSearch(studentName, instructorName)
                handleClose()
              }}
            >
              Search
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default Search
