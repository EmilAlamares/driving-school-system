import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login/"
import "./index.css"
import App from "./App"
import UserContextProvider from "./contexts/UserContext"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import BranchContextProvider from "./contexts/BranchContext"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <>
    <UserContextProvider>
      <BranchContextProvider>
        <Router>
          <Routes>
            <Route path="*" element={<App />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </BranchContextProvider>
    </UserContextProvider>
  </>
)
