import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Modal,
} from "@mui/material"
import { Close } from "@mui/icons-material"
import { Divider, IconButton } from "@mui/material"
import { useState } from "react"
import { useEffect } from "react"
import axios from 'axios'

const BranchCard = ({ name, address }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [instructorCount, setInstructorCount] = useState(null)
  const [studentCount, setStudentCount] = useState(null)

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/branches/${name}/Student`)
        setStudentCount(response.data.length)
      }

    const fetchInstructors = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/branches/${name}/Instructor`)
        setInstructorCount(response.data.length)
    }

    fetchStudents()
    fetchInstructors()

  }, [])

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    width: "500px",
    p: "24px",
  }

  const cardStyle = {
    width: "50%",
    marginBottom: "12px",
  }

  return (
    <>
      <Card sx={cardStyle} variant="outlined">
        <CardContent>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="p">{address}</Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => handleOpen()}>View Info</Button>
        </CardActions>
      </Card>

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
              {name + " Branch"}
            </Typography>

            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
          <Typography mt={"12px"}>{address}</Typography>
          <Divider sx={{ marginTop: "12px", marginBottom: "12px" }} />

          <Typography>Total Instructors: {instructorCount}</Typography>
          <Typography>Total Students: {studentCount}</Typography>
        </Box>
      </Modal>
    </>
  )
}

export default BranchCard
