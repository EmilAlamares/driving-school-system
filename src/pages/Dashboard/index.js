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
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded"
import { Link } from "react-router-dom"
import { useContext, useState, useEffect } from "react"
import { BranchContext } from "../../contexts/BranchContext"
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

// const todaySession = (
//   <>
//     <CardContent sx={cardContentStyles}>
//       <Typography variant="h6">
//         Today's Session
//         <Typography>25</Typography>
//       </Typography>
//       <Avatar sx={{ bgcolor: "#8C7B69" }}>
//         <CalendarMonthRoundedIcon />
//       </Avatar>
//     </CardContent>
//   </>
// )

const Dashboard = () => {
  const [instructorCount, setInstructorCount] = useState(null)
  const [studentCount, setStudentCount] = useState(null)
  const [isFetchingStudent, setIsFetchingStudent] = useState(true)
  const [isFetchingInstructor, setIsFetchingInstructor] = useState(true)
  const { branch } = useContext(BranchContext)

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

  useEffect(() => {
    const fetchStudents = async () => {
      setIsFetchingStudent(true)
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/branches/${branch.name}/Student`
      )
      setIsFetchingStudent(false)
      setStudentCount(response.data.length)
    }

    const fetchInstructors = async () => {
      setIsFetchingInstructor(true)

      const response = await axios.get(
        `${process.env.REACT_APP_URL}/branches/${branch.name}/Instructor`
      )
      setIsFetchingInstructor(false)

      setInstructorCount(response.data.length)
    }

    fetchStudents()
    fetchInstructors()
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
        <Card
          variant="outlined"
          sx={cardStyles}
          component={Link}
          to="/students"
        >
          {totalStudents}
        </Card>
        <Card
          variant="outlined"
          sx={{ ...cardStyles, marginLeft: "20px" }}
          component={Link}
          to="/instructors"
        >
          {totalInstructors}
        </Card>

        {/* <Card
          variant="outlined"
          sx={{ ...cardStyles, marginLeft: "20px" }}
          component={Link}
          to="/schedules"
        >
          {todaySession}
        </Card> */}
      </Box>

      <Divider sx={{ marginTop: "24px" }} />

      <Box height={600}>
        <Chart chartData={chartData} />
      </Box>
    </>
  )
}

export default Dashboard
