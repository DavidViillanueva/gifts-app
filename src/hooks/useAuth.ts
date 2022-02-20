import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../configs/firebaseConfig";

const  useAuth = ():User|null => {
    let actualUser:User|null = null;
    onAuthStateChanged(auth , (user) => {
        actualUser =  user;
    })

    return actualUser;
}


export default useAuth;