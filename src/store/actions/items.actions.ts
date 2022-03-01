import { doc, getDoc } from "firebase/firestore";
import { errors } from "../../configs/errors.types";
import { databaseRef } from "../../configs/firebaseConfig";
import { types } from "../../configs/types";

export const startLoadingItems = ( idUser: string ) => {
    return ( dispatch: any) => {
        dispatch( setLoading() );
        const docRef = doc(databaseRef, "items", idUser );
        getDoc(docRef).then( docSnap => {
            if( docSnap.exists() ) {
                dispatch( unsetError() )
                dispatch( setItems( docSnap.data() ) );
            } else {
                dispatch( setError(errors.E100) );
            }

            dispatch( unsetLoading() );
        })
    }
}

const setLoading = () => ({
    type: types.itemsSetLoading
})

const unsetLoading = () => ({
    type: types.itemsUnsetLoading
})

const setError = (error: string) => ({
    type: types.itemsSetError,
    payload: {
        error: error
    }
})

const unsetError = () => ({
    type: types.itemsUnsetError
})

const setItems = ( items: [] | object ) => ({
    type: types.itemsAdd,
    payload: {
        items: items
    }
})
