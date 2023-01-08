import { createContext, useState } from "react"

export const UserContext = createContext({})

const UserContextProvider = (props) => {
  // const [user, setUser] = useState(
  //   JSON.parse(localStorage.getItem("user")) || {}
  // )

  const items = { id: JSON.parse(localStorage.getItem('user')), firstName: JSON.parse(localStorage.getItem('firstName')), lastName: JSON.parse(localStorage.getItem('lastName')) }

  const [user, setUser] = useState(
    items || {}
  )


  return (
    <UserContext.Provider value={{ user, setUser}}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider