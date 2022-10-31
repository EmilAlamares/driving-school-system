import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material"
import { grey } from "@mui/material/colors"
import React from "react"

const Login = () => {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

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
              <TextField
                label="E-mail"
                type="email"
                sx={{ width: "100%" }}
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <TextField
                label="Password"
                sx={{
                  width: "100%",
                  mt: "20px",
                  input: { color: "black !important" },
                }}
                type="password"
                value={password}
                variant="outlined"
                autoComplete={false}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />

              <CardContent sx={{ textAlign: "left", p: 0, mt: "10px" }}>
                <Button variant="text" size="small">
                  Forgot Password?
                </Button>
              </CardContent>

              <Button
                variant="contained"
                sx={{
                  mt: "50px",
                  width: "100%",
                  borderRadius: "30px",
                  height: "50px",
                }}
              >
                Sign in
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Login
