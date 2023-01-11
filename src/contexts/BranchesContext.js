import axios from "axios"
import { createContext, useEffect, useState } from "react"

export const BranchesContext = createContext({})

const BranchesContextProvider = (props) => {
  const [branches, setBranches] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_URL}/branches`)
      setBranches(response.data)
    }
    
    fetchData()

  }, [])

  return (
    <BranchesContext.Provider value={{ branches, setBranches }}>
      {props.children}
    </BranchesContext.Provider>
  )
}

export default BranchesContextProvider
