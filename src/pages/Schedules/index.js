import { useEffect } from "react"
import axios from "axios"
import { useContext, useState } from "react"
import { BranchContext } from "../../contexts/BranchContext"
import SessionCard from "./components/SessionCard"
import { Typography } from "@mui/material"

const Schedules = () => {
  const [sessions, setSessions] = useState([])
  const [isSessionLoading, setIsSessionLoading] = useState(true)
  const { branch } = useContext(BranchContext)

  useEffect(() => {
    setSessions([])
    setIsSessionLoading(true)
    const fetchSessions = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/sessions/${branch.name}`
      )

      if (response.data.length < 1) 
      return setIsSessionLoading(false)

      response.data.map(async (item) => {
        item.date = new Date(item.date).toLocaleDateString()
        item.startTime = new Date(item.startTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
        item.endTime = new Date(item.endTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })

        const student = await axios.get(
          `${process.env.REACT_APP_URL}/users/${item.studentId}`
        )

        item.studentFullName =
          student.data.firstName + " " + student.data.lastName

        const instructor = await axios.get(
          `${process.env.REACT_APP_URL}/users/${item.instructorId}`
        )

        item.instructorFullName =
          instructor.data.firstName + " " + instructor.data.lastName

        setSessions((sessions) => [...sessions, item])
        setIsSessionLoading(false)
      })

    }

    fetchSessions()
  }, [branch])
  return (
    <>
      {isSessionLoading && <Typography variant={'h6'}>Fetching...</Typography>}
      {sessions.length > 0 &&
        sessions.map((item) => <SessionCard session={item} />)}
      {!isSessionLoading && sessions.length < 1 && <Typography variant={'h6'}>No sessions found.</Typography>}

    </>
  )
}

export default Schedules
