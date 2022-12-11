import { Box, Card, CardContent, Typography, Avatar } from "@mui/material"
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded"
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded"
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded"
import { Link } from "react-router-dom"

const cardStyles = {
  width: "250px",
  height: "100px",
  margin: "20px",
  textDecoration: 'none',
}

const totalStudents = (
  <>
    <CardContent
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Typography variant="h6">
        Students
        <Typography sx={{ fontSize: "14px" }}>127</Typography>
      </Typography>
      <Avatar sx={{ bgcolor: "orange" }}>
        <SchoolRoundedIcon />
      </Avatar>
    </CardContent>
  </>
)

const totalInstructors = (
  <>
    <CardContent
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Typography variant="h6">
        Instructors
        <Typography sx={{ fontSize: "14px" }}>89</Typography>
      </Typography>
      <Avatar sx={{ bgcolor: "#1976d2" }}>
        <AccountCircleRoundedIcon />
      </Avatar>
    </CardContent>
  </>
)

const todaySession = (
  <>
    <CardContent
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Typography variant="h6">
        Today's Session
        <Typography sx={{ fontSize: "14px" }}>25</Typography>
      </Typography>
      <Avatar sx={{ bgcolor: "#8C7B69" }}>
        <CalendarMonthRoundedIcon />
      </Avatar>
    </CardContent>
  </>
)

const Dashboard = () => {
  return (
    <Box display="flex">
      <Card variant="outlined" sx={cardStyles} component={Link} to="/students">
        {totalStudents}
      </Card>
      <Card variant="outlined" sx={cardStyles} component={Link} to="/instructors">
        {totalInstructors}
      </Card>
      <Card variant="outlined" sx={cardStyles} component={Link} to="/schedules">
        {todaySession}
      </Card>
    </Box>
  )
}

export default Dashboard
