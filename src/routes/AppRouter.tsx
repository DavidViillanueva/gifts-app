import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect, useReducer } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import NavBar from "../components/layout/NavBar";
import Profile from "../components/profile/Profile";
import { auth, databaseRef } from "../configs/firebaseConfig";
import GiftsApp from "../GiftsApp";
import { login, setFavoriteProfiles, setTypeUser } from "../store/actions/auth.actions";
import PublicRoute from "./PublicRoute";
import ColorContext from "../store/context/colorContext";
import { colors } from "../configs/colors";
import { colorReducer } from "../store/reducers/color.reducer";
import { doc, getDoc } from "firebase/firestore";

const AppRouter = () => {
    const dispatch = useDispatch();

    const [isLogged, setIsLogged] = useState(false)
    const [uid, setUid] = useState('');
    const [colorTheme, setColorTheme] = useState(colors.pink);
    const [state, dispatchColor] = useReducer(colorReducer, colors.pink);

    onAuthStateChanged(auth, async (user) => {
        if (user?.uid) {
            dispatch(login(user.uid, user.displayName));
            const docRef = doc(databaseRef, `${user.uid}/user-data`);
            const docSnap = await getDoc(docRef);
            dispatch(setFavoriteProfiles(docSnap.data()?.favoriteProfiles));
            dispatch(setTypeUser(docSnap.data()?.type))
            setUid(user.uid);
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }
    })

    useEffect(() => {
        setColorTheme(state.color);
    }, [state])

    const theme = createTheme({
        palette: colorTheme
    })


    return (
        <ColorContext.Provider value={{ color: colorTheme, dispatchColor }}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <NavBar />

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