import firebase from 'firebase/compat/app';
import { auth, authGoogleProvider, databaseRef } from '../../configs/firebaseConfig';
import { types } from "../../configs/types";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import { signInWithPopup } from "firebase/auth";


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
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // let token;
        // if ( credential )
        //     token = credential.accessToken;
        // The signed-in user info.
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

export const startLogout = () => {
    return async( dispatch:any ) => {
        await auth.signOut();
        // dispatch( logoutCleaning() );
        dispatch( logout() );
    };
};

export const logout = () => ({
    type: types.logout
});