import { createContext, useContext, useState } from "react"

export const BranchContext = createContext({})

const BranchContextProvider = (props) => {
  const [branch, setBranch] = useState({ name: "Makati" })

  return (
    <BranchContext.Provider value={{ branch, setBranch }}>
      {props.children}
    </BranchContext.Provider>
  )
}

export default BranchContextProvider
