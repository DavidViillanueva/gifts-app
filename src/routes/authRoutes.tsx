import { Route } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";


const AuthRoutes = () => {
  return (
    <div>
      
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </div>
  );
};

export default AuthRoutes;
