import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Avatar,
} from "@mui/material"
import { SchoolRounded } from "@mui/icons-material"
import StudentTable from "./components/StudentTable"
import { useEffect, useState, useContext } from "react"
import { BranchContext } from "../../contexts/BranchContext"
import axios from "axios"
import { UserContext } from "../../contexts/UserContext"

const cardContentStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
}

const Students = () => {
  const [studentCount, setStudentCount] = useState(null)
  const [isFetching, setIsFetching] = useState(true)
  const { branch } = useContext(BranchContext)
  const { user } = useContext(UserContext)
  const _ = require('lodash')

  useEffect(() => {
    const fetchStudents = async () => {
      setIsFetching(true)
      let response

      if (user.type === "Admin") {
        response = await axios.get(
          `${process.env.REACT_APP_URL}/branches/${branch.name}/Student`
        )
        setIsFetching(false)
        setStudentCount(response.data.length)
      }

      if (user.type === "Instructor") {
        console.log(user)
        response = await axios.get(`${process.env.REACT_APP_URL}/users`)

        let filteredResponse = _.filter(response.data, (item) => {
          return item.instructorId === user.id
        })
        console.log({ filteredResponse })
        setIsFetching(false)
        setStudentCount(filteredResponse.length)
      }
    }

    fetchStudents()
  }, [branch])

  return (
    <Box>
      <Card variant="outlined" sx={{ display: "inline-block", width: 250 }}>
        <CardContent sx={cardContentStyles}>
          <Typography variant="h6">
            Total Students
            <Typography>{isFetching ? "Fetching..." : studentCount}</Typography>
          </Typography>
          <Avatar sx={{ bgcolor: "orange" }}>
            <SchoolRounded />
          </Avatar>
        </CardContent>
      </Card>

      <Divider sx={{ marginTop: "10px" }} />

      <Box paddingTop={"10px"}>
        <StudentTable />
      </Box>
    </Box>
  )
}

export default Students
