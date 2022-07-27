import firebase from 'firebase/compat/app';
import { auth, authGoogleProvider, databaseRef } from '../../configs/firebaseConfig';
import { types } from "../../configs/types";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { signInWithPopup } from "firebase/auth";
import { setInitialState } from './items.actions';
import { createStandaloneToast, useToast } from '@chakra-ui/react';


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

export const starLoginWithGoogle = () => {
return ( (dispatch:any) => {
    dispatch( setLoading() );
    signInWithPopup(auth, authGoogleProvider)
      .then((result) => {
        const user = result.user;
        dispatch( login(user.uid, user.displayName) );
        dispatch( unsetLoading() );
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error( errorCode + errorMessage)
        dispatch( unsetLoading() );
      });
} )
}

export const startRegisterWithGoogle = () => {

}

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

                    await setDoc(doc(databaseRef, user.uid, "giftapp"), {}); 
                    await setDoc(doc(databaseRef,`${user.uid}/user-data`), { name })

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

export const startLoadingPublicUser = (uid: string = '') => {
    return async (dispatch:any) => {
        const docRef = doc(databaseRef, `${uid}/user-data`);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists())
            dispatch(setPublicUser(docSnap.data()))
    }
}

export const setPublicUser = (user:any) => ({
    type: types.authSetPublicProfile,
    payload: user
})

export const unsetPublicUser = () => ({
    type: types.authUnsetPublicProfile
})
const setLoading = () => ({
    type: types.authSetLoading
})

const unsetLoading = () => ({
    type: types.authUnsetLoading
})

export const startLogout = () => {
    return async( dispatch:any ) => {
        await auth.signOut();
        dispatch( setInitialState() );
        dispatch( logout() );
    };
};

export const logout = () => ({
    type: types.logout
});