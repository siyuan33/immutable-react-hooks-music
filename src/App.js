import React from "react"
import { GlobalStyle } from "./style"
import { IconStyle } from "./assets/iconfont/iconfont"
import { renderRoutes } from "react-router-config"
import routes from "./routes"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import store from "@/store"

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        {renderRoutes(routes)}
      </BrowserRouter>
    </Provider>
  )
}

export default App
