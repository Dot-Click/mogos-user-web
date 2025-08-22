import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/login"
import HomePage from "./pages/Dashboard/Home"
import AppLayout from "./layout/AppLayout"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="/home" element={<AppLayout />}>
          <Route index element={<HomePage/>} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
