import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/login"
import HomePage from "./pages/Dashboard/Home"
import AppLayout from "./layout/AppLayout"
import OtpPage from "./pages/otp"
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="/otpverify" element={<OtpPage />} />
          <Route path="/home" element={<AppLayout />}>
          <Route index element={<HomePage/>} />
          </Route>
        </Routes>
      </Router>
      <Toaster position="top-center"/>
    </>
  )
}

export default App
