import { Button, Select, ThemeProvider } from "@material-ui/core";
import { createTheme, MenuItem } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import NavBar from "../components/layout/NavBar";
import Profile from "../components/profile/Profile";
import { auth } from "../configs/firebaseConfig";
import GiftsApp from "../GiftsApp";
import { login } from "../store/actions/auth.actions";
import PublicRoute from "./PublicRoute";
import { RootState } from "../store/store";
import ColorContext from "../store/context/colorContext";
import { colors } from "../configs/colors";

const AppRouter = () => {
    const dispatch = useDispatch();

    const [isLogged, setIsLogged] = useState(false)
    const [uid, setUid] = useState('');
    const [colorTheme, setColorTheme] = useState(colors.pink);

    onAuthStateChanged(auth, async (user) => {
        if (user?.uid) {
            dispatch(login(user.uid, user.displayName));
            setUid(user.uid);
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }
    })

    // const state = useSelector((state: RootState) => {
    //     return state
    // })
    // useEffect(() => {
    //     setColorTheme(state.ui.color);
    // }, [])
    
    const theme = createTheme({
        palette: colorTheme
    })


    return (
        <ColorContext.Provider value={colorTheme}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <NavBar />
                    <Button onClick={() => {setColorTheme(colors.red)}}>red</Button>
                    <Button onClick={() => {setColorTheme(colors.pink)}}>pink</Button>
                    <Button onClick={() => {setColorTheme(colors.blue)}}>blue</Button>
                    <Button onClick={() => {setColorTheme(colors.cyan)}}>cyan</Button>
                    <Routes>
                        <Route path="/" element={<GiftsApp />} />

                        <Route path="/register" element={
                            <PublicRoute isLogged={isLogged} uid={uid}>
                                <Register />
                            </PublicRoute>
                        } />

                        <Route path="/login" element={
                            <PublicRoute isLogged={isLogged} uid={uid}>
                                <Login />
                            </PublicRoute>
                        } />


                        <Route path="/profile/:profileId" element={<Profile />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </ColorContext.Provider>
    )
}

export default AppRouter