import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { errors } from "../../configs/errors.types";
import { databaseRef } from "../../configs/firebaseConfig";
import { types } from "../../configs/types";
import { IItem} from "../../models/item.model";

export const startLoadingItems = ( uid: string ) => {
    return ( dispatch: any) => {
        dispatch( setLoading() );
        getDocs( collection( databaseRef,`${uid}/giftapp/items` ) )
            .then( collectionSnap => {
                collectionSnap.forEach((doc) => {
                    const snapItem: IItem = doc.data() as IItem;
                    dispatch( addItem({
                        id: doc.id,
                        itemName: snapItem.itemName,
                        itemPrice: snapItem.itemPrice,
                        itemDescription: snapItem.itemDescription
                    }));
                })
                dispatch( unsetLoading() )
            })
            .catch( e => {
                dispatch( setError( errors.E100 ));
                dispatch( unsetLoading() )
            })
    }
}

export const startAddingItem = ( item: IItem, uid: string ) => {
    return ( dispatch: any ) => {
        dispatch( setLoadingItem() )
        addDoc(collection(databaseRef,`${uid}/giftapp/items` ), item)
            .then( snap => {
                dispatch( addItem({
                    id: snap.id,
                    itemName: item.itemName,
                    itemPrice: item.itemPrice,
                    itemDescription: item.itemDescription
                }))
                dispatch( unsetLoadingItem() );
            })
            .catch( error => {
                console.error( error )
                dispatch( unsetLoadingItem() );
            })
    }
}

export const starDeleteItem = ( item: IItem, uid: string ) => {
    return ( dispatch: any ) => {
        dispatch( setLoadingItem() )
        deleteDoc(doc( databaseRef, `${uid}/giftapp/items/${item.id}`))
            .then( () => {
                dispatch( deleteItem(item) );
                dispatch( unsetLoadingItem() );
            })
            .catch( e => {
                console.error( e );
                dispatch( unsetLoadingItem() );
            })
    }
}

const setLoading = () => ({
    type: types.itemsSetLoading
})

const unsetLoading = () => ({
    type: types.itemsUnsetLoading
})

const setLoadingItem = () => ({
    type: types.itemsSetLoadingItem
})

const unsetLoadingItem = () => ({
    type: types.itemsUnsetLoadingItem
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
    type: types.itemsSet,
    payload: {
        items: items
    }
})

const addItem = ( item: IItem ) => ({
    type: types.itemsAdd,
    payload: {
        item: item
    }
})

const deleteItem = ( item:IItem ) => ({
    type: types.itemsRemove,
    payload: {
        item
    }
})
