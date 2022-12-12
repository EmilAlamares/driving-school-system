import {
    Box,
    Typography,
    Card,
    CardContent,
    Divider,
    Avatar,
  } from "@mui/material"
  import { AccessTimeFilled, AccountCircleRounded } from "@mui/icons-material"
  import InstructorTable from "./components/InstructorTable"
  
  const cardContentStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  }
  
  const Instructors = () => {
    return (
      <Box>
        <Card variant="outlined" sx={{ display: "inline-block", width: 250 }}>
          <CardContent sx={cardContentStyles}>
            <Typography variant="h6">
          Total Instructors
              <Typography>89</Typography>
            </Typography>
            <Avatar sx={{ bgcolor: "#1976d2" }}>
              <AccountCircleRounded />
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
        <Divider sx={{marginTop: '10px'}} />
  
       <Box paddingTop={'10px'}>
        <InstructorTable />
       </Box>
      </Box>
    )
  }
  
  export default Instructors
  