import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Divider,
} from "@mui/material"
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded"
import Chart from "./components/Chart"
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import { Link } from "react-router-dom"
import { useContext, useState, useEffect } from "react"
import { BranchContext } from "../../contexts/BranchContext"
import { UserContext } from "../../contexts/UserContext"
import axios from "axios"

const cardStyles = {
  width: "250px",
  height: "100px",
  textDecoration: "none",
}

const cardContentStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
}

const Dashboard = () => {
  const [instructorCount, setInstructorCount] = useState(null)
  const [studentCount, setStudentCount] = useState(null)
  const [branchesCount, setBranchesCount] = useState(null)
  const [isFetchingStudent, setIsFetchingStudent] = useState(true)
  const [isFetchingInstructor, setIsFetchingInstructor] = useState(true)
  const [isFetchingBranches, setIsFetchingBranches] = useState(true)
  const _ = require("lodash")
  const { branch } = useContext(BranchContext)
  const { user } = useContext(UserContext)

  const totalStudents = (
    <>
      <CardContent sx={cardContentStyles}>
        <Typography variant="h6">
          Students
          <Typography>
            {" "}
            {isFetchingStudent ? "Fetching..." : studentCount}
          </Typography>
        </Typography>
        <Avatar sx={{ bgcolor: "orange" }}>
          <SchoolRoundedIcon />
        </Avatar>
      </CardContent>
    </>
  )

  const totalInstructors = (
    <>
      <CardContent sx={cardContentStyles}>
        <Typography variant="h6">
          Instructors
          <Typography>
            {" "}
            {isFetchingInstructor ? "Fetching..." : instructorCount}
          </Typography>
        </Typography>
        <Avatar sx={{ bgcolor: "#1976d2" }}>
          <AccountCircleRoundedIcon />
        </Avatar>
      </CardContent>
    </>
  )

  const totalBranches = (
    <>
      <CardContent sx={cardContentStyles}>
        <Typography variant="h6">
          Branches
          <Typography>
            {isFetchingBranches ? "Fetching..." : branchesCount}
          </Typography>
        </Typography>
        <Avatar sx={{ bgcolor: "#ffead5" }}>
          <LocationOnIcon sx={{ color: "red" }} />
        </Avatar>
      </CardContent>
    </>
  )

  useEffect(() => {
    const fetchStudents = async () => {
      setIsFetchingStudent(true)
      let response

      if (user.type == "Admin") {
        response = await axios.get(
          `${process.env.REACT_APP_URL}/branches/${branch.name}/Student`
        )
        setIsFetchingStudent(false)
        setStudentCount(response.data.length)
      }

      if (user.type == "Instructor") {
        console.log(user)
        response = await axios.get(`${process.env.REACT_APP_URL}/users`)

        let filteredResponse = _.filter(response.data, (item) => {
          return item.instructorId == user.id
        })
        console.log({ filteredResponse })
        setIsFetchingStudent(false)
        setStudentCount(filteredResponse.length)
      }
    }

    const fetchInstructors = async () => {
      setIsFetchingInstructor(true)
      let response
      let response2

      if (user.type == "Admin") {
        response = await axios.get(
          `${process.env.REACT_APP_URL}/branches/${branch.name}/Instructor`
        )
        setInstructorCount(response.data.length)
      }

      if (user.type == 'Student')
      {
        response = await axios.get(`${process.env.REACT_APP_URL}/users/${user.id}`)
        response2 = await axios.get(`${process.env.REACT_APP_URL}/users/${response.data.instructorId}`)

        console.log(response2.data)
        setInstructorCount(response2.data.firstName + ' ' + response2.data.lastName)
      }

      setIsFetchingInstructor(false)
    }

    const fetchBranches = async () => {
      setIsFetchingBranches(true)
      const response = await axios.get(`${process.env.REACT_APP_URL}/branches/`)

      console.log(response)
      setIsFetchingBranches(false)
      setBranchesCount(response.data.length)
    }

    fetchStudents()
    fetchInstructors()
    fetchBranches()
  }, [branch])
  // eslint-disable-next-line
  const [chartData, setChartData] = useState({
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Students",
        data: [25, 50, 54, 69, 108, 86, 68, 79, 112, 45, 70, 60],
      },
    ],
  })
  return (
    <>
      <Box display="flex">
        {["Instructor", "Admin"].includes(user.type) && (
          <Card
            variant="outlined"
            sx={cardStyles}
            component={Link}
            to="/students"
          >
            {totalStudents}
          </Card>
        )}

        {["Student", "Admin"].includes(user.type) && (
          <Card
            variant="outlined"
            sx={{ ...cardStyles, marginLeft: "20px" }}
            component={Link}
            to="/instructors"
          >
            {totalInstructors}
          </Card>
        )}

        {user.type == "Admin" && (
          <Card
            variant="outlined"
            sx={{ ...cardStyles, marginLeft: "20px" }}
            component={Link}
            to="/branches"
          >
            {totalBranches}
          </Card>
        )}
      </Box>

      <Divider sx={{ marginTop: "24px" }} />

      {user.type == "Admin" && (
        <Box height={600}>
          <Chart chartData={chartData} />
        </Box>
      )}
    </>
  )
}

export default Dashboard
