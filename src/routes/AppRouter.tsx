import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import NavBar from "../components/layout/NavBar";
import Profile from "../components/profile/Profile";
import { auth } from "../configs/firebaseConfig";
import GiftsApp from "../GiftsApp";
import { login } from "../store/actions/auth.actions";
import PublicRoute from "./PublicRoute";

const AppRouter = () => {
  const dispatch = useDispatch();

  const [isLogged, setIsLogged] = useState(false)
  const [ uid, setUid] = useState('');

  onAuthStateChanged(auth, async(user) => {

    if( user?.uid ) {
        dispatch( login(user.uid, user.displayName));
        setUid( user.uid );
        setIsLogged( true );
    } else {
        setIsLogged( false );
    }
})

  return (

    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<GiftsApp />} />

        <Route path="/register" element={
          <PublicRoute isLogged={ isLogged } uid={ uid }>
            <Register /> 
          </PublicRoute>
        } />

        <Route path="/login" element={
          <PublicRoute isLogged={ isLogged } uid={ uid }>
            <Login />
          </PublicRoute>
        } />
        
        
        <Route path="/profile/:profileId"  element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter