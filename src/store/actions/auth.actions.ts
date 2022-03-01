import firebase from 'firebase/compat/app';
import { auth, databaseRef } from '../../configs/firebaseConfig';
import { types } from "../../configs/types";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';


export const startLoginWithEmailPassword = ( email: string, password:string) => {
    return ( dispatch:any) => {
        dispatch( setLoading() );
        firebase.auth().signInWithEmailAndPassword(email,password)
            .then( ({ user }) => {
                if (user)
                    dispatch (
                        login( user.uid, user.displayName )
                    )
                dispatch( unsetLoading() );
            })
            .catch( e => {
                alert(e)
                dispatch( unsetLoading() );
            })
    }
};

export const startRegisterWithEmailPasswordName = ( email:string , password:string, name:string ) => {
    return ( dispatch:any ) => {
        createUserWithEmailAndPassword(auth, email, password )
            .then( async( userCredential ) =>{
                const user = userCredential.user;
                if( user ) {  
                    updateProfile(user,{ displayName: name})
                    dispatch(
                        login( user.uid, name)
                    );

                    await setDoc(doc(databaseRef, "items", user.uid ), {});

                }
            })
            .catch( e => {
                alert(e)
            })
    }   
}

export const login = ( uid:string, displayName:string|null) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});

const setLoading = () => ({
    type: types.authSetLoading
})

const unsetLoading = () => ({
    type: types.authUnsetLoading
})