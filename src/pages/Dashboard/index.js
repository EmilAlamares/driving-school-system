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
import { useState } from "react"

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

const totalStudents = (
  <>
    <CardContent sx={cardContentStyles}>
      <Typography variant="h6">
        Students
        <Typography>127</Typography>
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
        <Typography>89</Typography>
      </Typography>
      <Avatar sx={{ bgcolor: "#1976d2" }}>
        <AccountCircleRoundedIcon />
      </Avatar>
    </CardContent>
  </>
)

const todaySession = (
  <>
    <CardContent sx={cardContentStyles}>
      <Typography variant="h6">
        Today's Session
        <Typography>25</Typography>
      </Typography>
      <Avatar sx={{ bgcolor: "#8C7B69" }}>
        <CalendarMonthRoundedIcon />
      </Avatar>
    </CardContent>
  </>
)

const Dashboard = () => {
  const [chartData, setChartData] = useState({
    labels: ["January", "February", "March", "April", "May", 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
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
        <Card
          variant="outlined"
          sx={{ ...cardStyles, marginLeft: "20px" }}
          component={Link}
          to="/schedules"
        >
          {todaySession}
        </Card>
      </Box>

      <Divider sx={{ marginTop: "24px" }} />

      <Box height={600}>
        <Chart chartData={chartData} />
      </Box>
    </>
  )
}

export default Dashboard
