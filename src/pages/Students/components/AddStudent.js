import * as React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import { Close } from "@mui/icons-material"
import { Divider, IconButton } from "@mui/material"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Unstable_DateField as DateField } from "@mui/x-date-pickers/DateField"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: "24px",
}

const instructors = [
  { id: 1, name: "Crisostomo Ibarra" },
  { id: 2, name: "Angelica Alamares" },
  { id: 3, name: "Jed Tagle" },
  { id: 4, name: "Miguel Santiago" },
]

export default function AddStudent() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button
        sx={{ width: 200 }}
        variant="contained"
        onClick={handleOpen}
      >
        Add Student
      </Button>
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
              New Student
            </Typography>

            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
          <Divider sx={{ marginTop: "12px" }} />

          <Box >
            {/* Name, Address, Gender, Branch, Email, Contact no. */}
            <TextField variant="standard" label="First Name" />
            <TextField
              variant="standard"
              label="Middle Name"
              sx={{ marginLeft: "12px" }}
            />
            <TextField
              variant="standard"
              label="Last Name"
              sx={{ marginLeft: "12px" }}
            />
          </Box>

          <Box mt={"12px"} display={"flex"} justifyContent={'space-between'} gap={'12px'}>

            <Autocomplete
              sx={{ width: "50%" }}
              id="branches-select"
              options={["Male", "Female"]}
              // getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField {...params} label="Gender" variant="standard" />
              )}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                label="Birthdate"
                format="MM-DD-YYYY"
                fullWidth
                variant="standard"
                sx={{ width: "50%" }}
              />
            </LocalizationProvider>

          </Box>

          <Box mt={"12px"}>
            <TextField variant="standard" label="Address" fullWidth />
          </Box>

          <Box mt={"12px"} display={"flex"} gap={'12px'}>
            <TextField variant="standard" label="E-mail" fullWidth />
            <TextField variant="standard" label="Contact No." fullWidth />
          </Box>

          <Box mt={"12px"}>
            <Autocomplete
              id="instructor-select"
              options={instructors}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} label="Instructor" variant="standard" />
              )}
            />
          </Box>

          <Box textAlign={'right'} mt={'24px'}>
            <Button variant="text" sx={{color: 'red'}} onClick={handleClose}>Close</Button>
            <Button variant="text" sx={{color: 'orange'}}>Reset</Button>
            <Button variant="text">Save</Button>
          </Box>

        </Box>
      </Modal>
    </div>
  )
}
