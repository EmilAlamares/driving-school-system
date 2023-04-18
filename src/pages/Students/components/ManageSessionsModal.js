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

export default function ManageSessionsModal({ branch, email, userId, instructorName }) {
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
  // const [instructor, setInstructor] = useState(null)
  // const [instructorOptions, setInstructorOptions] = useState(null)
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

  const handleSubmit = async () => {
    let data = {
      email,
      userId,
      // instructor,
      sessions,
      selectedBranch: branch,
      type: "Student Session",
    }

    // console.log(data)

    const response = await axios.put(
      `${process.env.REACT_APP_URL}/users/update`,
      data
    )

    console.log(response)
  }

  // Fetch Instructors
  // useEffect(() => {
  //   const fetchInstructors = async () => {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_URL}/branches/${branch}/Instructor`
  //     )
  //     setInstructorOptions(response.data)
  //     console.log(instructorName)
  //     console.log(instructorOptions)
  //     setInstructor(null)
  //   }
  //   fetchInstructors()
  // }, [])

  return (
    <React.Fragment>
      <Button sx={{ p: 0 }} onClick={handleOpen}>
        Manage Sessions
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
              Manage Sessions
            </Typography>

            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
          <Divider sx={{ marginTop: "24px" }} />

          {/* <Box>
            <Autocomplete
              fullWidth
              id="instructor-select"
              // options={instructorOptions}
              options={_.filter(instructorOptions, (item) => item.fullName != instructorName)}
              value={instructor}
              onChange={(e, newVal) => setInstructor(newVal)}
              getOptionLabel={(option) => option.fullName}
              renderInput={(params) => (
                <TextField {...params} label="Instructor" variant="standard" />
              )}
            />
          </Box> */}

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
                        // disabled={instructor == null}
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
                        // disabled={instructor == null}
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
                        // disabled={instructor == null}
                      />
                    )}
                  />
                </Box>
              ))}
            </LocalizationProvider>
            <Button
              sx={{ position: "absolute", right: "12px" }}
              // disabled={instructor == null}
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
