import { Route } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Homepage from "../components/layout/Homepage";

const AppRouter = () => {
  return (
      <div>
          <Route path="/" element={<Homepage />} />

          <Route path="/register" element={<Register />} />

          <Route path="/login" element={<Login />} />
      </div>
  )
}

export default AppRouter