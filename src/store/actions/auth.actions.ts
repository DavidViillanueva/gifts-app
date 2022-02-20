import firebase from 'firebase/compat/app';
import { auth } from '../../configs/firebaseConfig';
import { types } from "../../configs/types";
import { createUserWithEmailAndPassword, getAuth, updateCurrentUser } from "firebase/auth";
import { Navigate } from 'react-router-dom';


export const startLoginWithEmailPassword = ( email: string, password:string) => {
    return ( dispatch:any) => {
        firebase.auth().signInWithEmailAndPassword(email,password)
            .then( ({ user }) => {
                if (user)
                    dispatch (
                        login( user.uid, user.displayName )
                    )
            })
            .catch( e => {
                console.error(e)
            })
    }
};

export const startRegisterWithEmailPasswordName = ( email:string , password:string, name:string ) => {
    return ( dispatch:any ) => {
        createUserWithEmailAndPassword(auth, email, password )
            .then( async( userCredential ) =>{
                const user = userCredential.user;

                if( user ) {  
                    updateCurrentUser( auth , {
                        ...user,
                        displayName: name
                    })
                    dispatch(
                        login( user.uid, name)
                    );
                }
            })
            .catch( e => {
                console.error(e)
            })
    }   
}

export const login = ( uid:any, displayName:any) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});