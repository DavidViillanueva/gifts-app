import firebase from 'firebase/compat/app';
import { auth, authGoogleProvider, databaseRef, storage } from '../../configs/firebaseConfig';
import { types } from "../../configs/types";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { signInWithPopup } from "firebase/auth";
import { setError } from './items.actions';
import { ColorI } from '../../models/ui.model';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { errors } from '../../configs/errors.types';


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
        dispatch( setLoading() );
        createUserWithEmailAndPassword(auth, email, password )
            .then( async( userCredential ) =>{
                const user = userCredential.user;
                if( user ) {  
                    updateProfile(user,{ displayName: name})
                    dispatch(login(user.uid, name));
                    await setDoc(doc(databaseRef, user.uid, "giftapp"), {});
                    dispatch( updatePublicUser({ name })); 
                    await setDoc(doc(databaseRef,`${user.uid}/user-data`), { name })
                    
                    dispatch( unsetLoading() );
                }
            })
            .catch( e => {
                dispatch( unsetLoading() );
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
        const docSnap = await getDoc(docRef).then();
    
        const pathReference = ref(storage,`${uid}/profile-picture`);
        let profilePicture = '';

        await getDownloadURL(pathReference).then((url) => {
            profilePicture = url
        }).catch((e:any) => { profilePicture = ''})

        if(docSnap.exists()) {
            dispatch(setPublicUser({...docSnap.data(), profilePicture }))
        } else {
            dispatch( setError(errors.E100) );
        }
    }
}

export const startSettingColorThemePublicUser = (uid: string, color: ColorI ) => {
    return async (dispatch:any) => {
        if(uid) {
            await updateDoc(doc(databaseRef,`${uid}/user-data`), { color });
        }
    }  
}

export const startUpdatingProfile = (uid: string, publicProfile: any) => {
    return async (dispatch:any) => {
        dispatch( setLoading() );
        if(uid) {
            updateDoc(doc(databaseRef,`${uid}/user-data`), { ...publicProfile }).then(value => {
                dispatch( unsetLoading() );
                dispatch( updatePublicUser({ ...publicProfile }));
            }).catch( e => {console.error(e); dispatch( unsetLoading() );});
        }
    }  
}

export const startUploadinProfilePicture = (uid: string, picture: any) => {
    return async (dispatch:any) => {
        if(picture) {
            const storageRef = ref(storage, `${uid}/profile-picture`);
            uploadString(storageRef, picture , 'data_url')
            .then(e => {
                dispatch(updatePublicUser({ profilePicture: picture }))
            })
            .catch(e => {
                console.error(e)
            });
        }
    }
}

export const updatePublicUser = (userData: any) => ({
    type: types.authUpdatePublicProfile,
    payload: { ...userData }
})

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
        dispatch( logout() );
    };
};

export const logout = () => ({
    type: types.logout
});