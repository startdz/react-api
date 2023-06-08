import React from "react"
import Home from "./components/Home"
import { Routes, Route } from "react-router-dom"
import './index.css'
import Content from "./components/widgets/Content"

function App() {

  return (
    <React.Fragment>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/users/:id"} element={<Content />} />
      </Routes>
    </React.Fragment>
  )
}

export default App
