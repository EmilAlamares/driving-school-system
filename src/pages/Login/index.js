import { Grid, Card, CardContent, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"
import React from "react"
import Form from "./components/Form"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const isLoggedIn = localStorage.hasOwnProperty("user")
  let navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) navigate("/")
  })
  return (
    <>
      <Typography
        sx={{
          backgroundColor: grey[200],
          position: "absolute",
          m: "20px 0 0 30px",
          textTransform: "uppercase",
        }}
        variant="h6"
        color="text.secondary"
      >
        <b>Driving School Management System</b>
      </Typography>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100vh" }}
        backgroundColor={grey[200]}
      >
        <Grid item>
          <Card
            sx={{ minWidth: "550px", minHeight: "600px", borderRadius: "15px" }}
          >
            <CardContent sx={{ p: "30px" }}>
              <Typography variant="h3" color="primary" align="left">
                <b>Sign In</b>
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                align="left"
              >
                Learn to drive at your own convenience!
              </Typography>
            </CardContent>

            <CardContent
              sx={{
                mt: "50px",
                px: "100px",
                input: { color: "black !important" },
              }}
            >
              <Form />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Login
