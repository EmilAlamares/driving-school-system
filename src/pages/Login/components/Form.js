import { CardContent, TextField, Button } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import LoginIcon from "@mui/icons-material/Login"
import React from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../../../contexts/UserContext"

const Form = () => {
  let navigate = useNavigate()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const { setUser } = useContext(UserContext)



  const buttonStyle = {
    mt: "50px",
    borderRadius: "30px",
    height: "50px",
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const data = {
      email,
      password,
    }

    const response = await axios.post(
      `${process.env.REACT_APP_URL}/users/login`,
      data
    )

    console.log(response)

    if (response.data.message === "Success") {
      setLoading(false)
      setUser({id: response.data.id, firstName: response.data.firstName, lastName: response.data.lastName})
      localStorage.setItem("user", JSON.stringify(response.data.id))
      localStorage.setItem("firstName", JSON.stringify(response.data.firstName))
      localStorage.setItem("lastName", JSON.stringify(response.data.lastName))
      navigate("/")
    }
    else
    setLoading(false)

  }
  return (
    <form autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
      <TextField
        fullWidth
        label="E-mail"
        type="email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        // required
      />
      <br />
      <TextField
        fullWidth
        label="Password"
        sx={{
          mt: "20px",
          input: { color: "black !important" },
        }}
        type="password"
        value={password}
        variant="outlined"
        onChange={(e) => setPassword(e.target.value)}
        // required
      />
      <br />

      <CardContent sx={{ textAlign: "left", p: 0, mt: "10px" }}>
        <Button variant="text" size="small">
          Forgot Password?
        </Button>
      </CardContent>

      <LoadingButton
        loading={loading}
        fullWidth
        variant="contained"
        loadingPosition="end"
        sx={buttonStyle}
        type="submit"
        endIcon={<LoginIcon />}
      >
        Sign in
      </LoadingButton>
    </form>
  )
}

export default Form
