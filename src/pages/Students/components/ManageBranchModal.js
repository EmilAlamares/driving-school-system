import * as React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { Close } from "@mui/icons-material"
import {
  Divider,
  IconButton,
  Modal,
  TextField,
  Autocomplete,
} from "@mui/material"
import Typography from "@mui/material/Typography"
import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { BranchesContext } from "../../../contexts/BranchesContext"
import dayjs from "dayjs"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker"
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker"
const _ = require("lodash")

export default function ManageBranchModal({ branch }) {
  const { branches } = useContext(BranchesContext)
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: "24px",
  }

  const [open, setOpen] = useState(false)
  const [selectedBranch, setSelectedBranch] = useState(null)
  const [instructor, setInstructor] = useState(null)
  const [instructorOptions, setInstructorOptions] = useState(null)
  const [sessions, setSessions] = useState([
    { date: dayjs("2023-01-01"), startTime: null, endTime: null },
  ])

  const handleAddSession = () => {
    setSessions((sessions) => [
      ...sessions,
      { date: dayjs("2023-01-01"), startTime: "", endTime: "" },
    ])
  }

  const handleChangeSessionDate = (newDate, index) => {
    setSessions(
      sessions.map((session, sessionIndex) => {
        if (sessionIndex === index) session.date = newDate

        return session
      })
    )
  }

  const handleChangeSessionStartTime = (newTime, index) => {
    setSessions(
      sessions.map((session, sessionIndex) => {
        if (sessionIndex === index) session.startTime = newTime

        return session
      })
    )
  }

  const handleChangeSessionEndTime = (newTime, index) => {
    setSessions(
      sessions.map((session, sessionIndex) => {
        if (sessionIndex === index) session.endTime = newTime

        return session
      })
    )
  }

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = () => {
    console.log(selectedBranch)
    console.log(branch)
  }

  // Fetch Instructors
  useEffect(() => {
    if (selectedBranch) {
      const fetchInstructors = async () => {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/branches/${selectedBranch.name}/Instructor`
        )
        setInstructorOptions(response.data)
        setInstructor(null)
      }
      fetchInstructors()
    } else setInstructor(null)
  }, [selectedBranch])

  return (
    <React.Fragment>
      <Button sx={{ p: 0 }} onClick={handleOpen}>
        Manage Branch
      </Button>
      <Modal
        // hideBackdrop
        open={open}
        onClose={handleClose}
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
              Manage Branch
            </Typography>

            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
          <Divider sx={{ marginTop: "24px" }} />

          <Box>
            <Autocomplete
              fullWidth
              // multiple
              id="branches-select"
              options={_.filter(branches, (item) => item.name != branch)}
              value={selectedBranch}
              onChange={(e, newVal) => setSelectedBranch(newVal)}
              isOptionEqualToValue={(option, value) => option === value}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} label="New Branch" variant="standard" />
              )}
            />

            <Autocomplete
              fullWidth
              disabled={!selectedBranch}
              id="instructor-select"
              options={instructorOptions}
              value={instructor}
              onChange={(e, newVal) => setInstructor(newVal)}
              getOptionLabel={(option) => option.fullName}
              renderInput={(params) => (
                <TextField {...params} label="Instructor" variant="standard" />
              )}
            />
          </Box>

          <Box sx={{ mt: "12px", mb: "12px" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {sessions.map((item, index) => (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    mt: "12px",
                  }}
                >
                  <DesktopDatePicker
                    label={`Session ${index + 1} Date`}
                    inputFormat="MM-DD-YYYY"
                    value={sessions[index].date}
                    onChange={(newValue) =>
                      handleChangeSessionDate(newValue, index)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        disabled={instructor == null}
                      />
                    )}
                  />
                  <DesktopTimePicker
                    value={sessions[index].startTime}
                    onChange={(newValue) =>
                      handleChangeSessionStartTime(newValue, index)
                    }
                    label="Start Time"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        disabled={instructor == null}
                      />
                    )}
                  />
                  <DesktopTimePicker
                    value={sessions[index].endTime}
                    onChange={(newValue) =>
                      handleChangeSessionEndTime(newValue, index)
                    }
                    label="End Time"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        disabled={instructor == null}
                      />
                    )}
                  />
                </Box>
              ))}
            </LocalizationProvider>
            <Button
              sx={{ position: "absolute", right: "12px" }}
              disabled={instructor == null}
              variant="text"
              onClick={() => handleAddSession()}
              size="small"
            >
              Add Session
            </Button>
          </Box>

          <Box textAlign={"right"} mt={"24px"}>
            <Button variant="text" sx={{ color: "red" }} onClick={handleClose}>
              Close
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
    </React.Fragment>
  )
}
