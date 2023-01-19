import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Modal,
  TextField,
  RadioGroup,
  Radio,
} from "@mui/material"
import { Close } from "@mui/icons-material"
import {
  Divider,
  IconButton,
  List,
  ListItem,
  FormControlLabel,
} from "@mui/material"
import { useContext, useState, useEffect } from "react"
import axios from "axios"
import { UserContext } from "../../../contexts/UserContext"

const SessionCard = ({ session }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const { user } = useContext(UserContext)
  const [isEvaluated, setIsEvaluated] = useState(false)
  const [evaluationItems, setEvaluationItems] = useState([
    {
      title: "Evaluation Item",
      verdict: "Passed",
    },
  ])

  const fetchSession = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_URL}/sessions/evaluations/${session._id}`
    )

    if (response.data.evaluations.length) {
      setEvaluationItems(response.data.evaluations)
      setIsEvaluated(true)
    }

    console.log(response)
  }

  const handleChangeEvaluationTitle = (newValue, index) => {
    setEvaluationItems(
      evaluationItems.map((evaluation, evaluationIndex) => {
        if (evaluationIndex === index) evaluation.title = newValue

        return evaluation
      })
    )
  }

  const handleSave = async () => {
    const data = {
      evaluations: evaluationItems,
    }

    const response = await axios.post(
      `${process.env.REACT_APP_URL}/sessions/evaluations/${session._id}`,
      data
    )

    console.log(response)
  }

  const handleChangeEvaluationVerdict = (newValue, index) => {
    setEvaluationItems(
      evaluationItems.map((evaluation, evaluationIndex) => {
        if (evaluationIndex === index) evaluation.verdict = newValue

        return evaluation
      })
    )
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    width: "500px",
    p: "24px",
  }

  const cardStyle = {
    width: "50%",
    marginBottom: "12px",
  }

  const handleAddItem = () => {
    setEvaluationItems((items) => [
      ...items,
      { title: "Evaluation Item", verdict: "Passed" },
    ])
  }

  useEffect(() => {
    fetchSession()
  }, [])

  return (
    <>
      <Card sx={cardStyle} variant="outlined">
        <CardContent>
          <Typography variant="h6">{session.studentFullName}</Typography>
          <Typography variant="h6">{`${session.date} ${session.startTime} - ${session.endTime}`}</Typography>
          <Typography variant="p">{`Instructor - ${session.instructorFullName}`}</Typography>
          <br></br>
          <Typography variant="p">{`Branch - ${session.branch}`}</Typography>
        </CardContent>
        {user.type == "Instructor" && (
          <CardActions>
            {!isEvaluated && (
              <Button
                onClick={() => {
                  handleOpen()
                  fetchSession()
                }}
              >
                Evaluate Session
              </Button>
            )}

            {isEvaluated && (
              <Button color="success" outlined>
                Evaluation Saved
              </Button>
            )}
          </CardActions>
        )}
        {user.type == "Student" && (
          <CardActions>
            {isEvaluated && (
              <Button
                onClick={() => {
                  handleOpen()
                  // fetchSession()
                }}
              >
                View Evaluation
              </Button>
            )}

            {!isEvaluated && (
              <Button disabled outlined>
                Not yet evaluated.
              </Button>
            )}
          </CardActions>
        )}
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            overflow={"hidden"}
          >
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h2"
              color={"#1976d2"}
              fontWeight={"bold"}
            >
              Evaluate Session
            </Typography>

            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>

          <Divider sx={{ marginTop: "12px", marginBottom: "12px" }} />

          <Box>
            <List>
              {evaluationItems.map((item, index) => (
                <ListItem>
                  <TextField
                    InputProps={{
                      readOnly: user.type == 'Student',
                    }}
                    variant="standard"
                    label="Evaluation Title"
                    onChange={(e) =>
                      handleChangeEvaluationTitle(e.target.value, index)
                    }
                    value={evaluationItems[index].title}
                    sx={{ mr: "12px" }}
                  />

                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    // defaultValue="Passed"
                    name="radio-buttons-group"
                    row
                    value={evaluationItems[index].verdict}
                    onChange={(e) =>
                      handleChangeEvaluationVerdict(e.target.value, index)
                    }
                  >
                    <FormControlLabel
                      value="Passed"
                      control={<Radio />}
                      label="Passed"
                    />
                    <FormControlLabel
                      value="Failed"
                      control={<Radio />}
                      label="Failed"
                    />
                  </RadioGroup>
                </ListItem>
              ))}
            </List>
          </Box>

          {user.type == "Instructor" && (
            <Box display={"flex"} justifyContent={"space-between"}>
              <Button onClick={() => handleAddItem()}>Add an item</Button>
              <Button
                onClick={() => {
                  handleSave()
                  handleClose()
                }}
              >
                Save
              </Button>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  )
}

export default SessionCard
