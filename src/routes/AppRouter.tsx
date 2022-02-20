import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Profile from "../components/profile/Profile";
import { auth } from "../configs/firebaseConfig";
import GiftsApp from "../GiftsApp";
import { login } from "../store/actions/auth.actions";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
  const dispatch = useDispatch();

  const [isLogged, setIsLogged] = useState(false)

  onAuthStateChanged(auth, async(user) => {

    if( user?.uid ) {
        dispatch( login(user.uid, user.displayName));
        setIsLogged( true );
    } else {
        setIsLogged( false );
    }
})

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GiftsApp />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />
        
        
        <Route path="/profile/:profileId" 
          element={
            <PrivateRoute isLogged= { isLogged }>
              <Profile />
            </PrivateRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter