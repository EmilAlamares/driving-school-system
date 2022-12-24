import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Avatar,
} from "@mui/material"
import { AccessTimeFilled, SchoolRounded } from "@mui/icons-material"
import StudentTable from "./components/StudentTable"

const cardContentStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
}

const Students = () => {
  return (
    <Box>
      <Card variant="outlined" sx={{ display: "inline-block", width: 250 }}>
        <CardContent sx={cardContentStyles}>
          <Typography variant="h6">
            Total Students
            <Typography>127</Typography>
          </Typography>
          <Avatar sx={{ bgcolor: "orange" }}>
            <SchoolRounded />
          </Avatar>
        </CardContent>
      </Card>

      <Card
        variant="outlined"
        sx={{ display: "inline-block", marginLeft: "20px", width: 250 }}
      >
        <CardContent sx={cardContentStyles}>
          <Typography variant="h6">
            In Session
            <Typography>46</Typography>
          </Typography>
          <Avatar sx={{ bgcolor: "#8C7B69" }}>
            <AccessTimeFilled />
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
