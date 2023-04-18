import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Avatar,
} from "@mui/material"
import { AccountCircleRounded } from "@mui/icons-material"
import InstructorTable from "./components/InstructorTable"
import { useEffect, useState, useContext } from "react"
import { BranchContext } from "../../contexts/BranchContext"
import axios from "axios"
import { UserContext } from "../../contexts/UserContext"

const cardContentStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
}

const Instructors = () => {
  const [instructorCount, setInstructorCount] = useState(null)
  const [isFetching, setIsFetching] = useState(true)
  const { branch } = useContext(BranchContext)
  const { user } = useContext(UserContext)

  useEffect(() => {
    const fetchInstructors = async () => {
      let response
      let response2
      setIsFetching(true)

      if (user.type == "Admin") {
        response = await axios.get(
          `${process.env.REACT_APP_URL}/branches/${branch.name}/Instructor`
        )

        setInstructorCount(response.data.length)
      }

      if (user.type == 'Student') {
        response = await axios.get(`${process.env.REACT_APP_URL}/users/${user.id}`)
        response2 = await axios.get(`${process.env.REACT_APP_URL}/users/${response.data.instructorId}`)

        setInstructorCount(response2.data.firstName + ' ' + response2.data.lastName)
      }
      setIsFetching(false)
    }

    fetchInstructors()
  }, [branch])
  return (
    <Box>
      <Card variant="outlined" sx={{ display: "inline-block", width: 250 }}>
        <CardContent sx={cardContentStyles}>
          <Typography variant="h6">
           {user.type == 'Admin' ? 'Total Instructors' : 'Instructor'}
            <Typography>
              {isFetching ? "Fetching..." : instructorCount}
            </Typography>
          </Typography>
          <Avatar sx={{ bgcolor: "#1976d2" }}>
            <AccountCircleRounded />
          </Avatar>
        </CardContent>
      </Card>

      <Divider sx={{ marginTop: "10px" }} />

      <Box paddingTop={"10px"}>
        <InstructorTable />
      </Box>
    </Box>
  )
}

export default Instructors
