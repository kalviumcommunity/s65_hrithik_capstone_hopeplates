import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"


const googleFontsLink = document.createElement('link')
googleFontsLink.rel = 'stylesheet'
googleFontsLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
document.head.appendChild(googleFontsLink)

import { SocketProvider } from "./context/SocketContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SocketProvider>
      <App />
    </SocketProvider>
  </React.StrictMode>
)