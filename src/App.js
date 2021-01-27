import React from "react"
import { GlobalStyle } from "./style"
import { IconStyle } from "./assets/iconfont/iconfont"
import { renderRoutes } from "react-router-config"
import routes from "./routes/index.js"
import { BrowserRouter } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle></GlobalStyle>
      <IconStyle></IconStyle>
      {renderRoutes(routes)}
    </BrowserRouter>
  )
}

export default App
