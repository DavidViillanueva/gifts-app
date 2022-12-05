import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { errors } from "../../configs/errors.types";
import { analytics, databaseRef, storage } from "../../configs/firebaseConfig";
import { types } from "../../configs/types";
import { IItem} from "../../models/item.model";
import { deleteObject, getDownloadURL, ref, uploadString } from "firebase/storage";
import { setDeleteLoading, unsetDeleteLoading } from "./ui.actions";
import { getAnalytics, logEvent } from "firebase/analytics";

export const startLoadingItems = ( uid: string ) => {
    return async ( dispatch: any) => {
        dispatch( setInitialState() );
        dispatch( setLoading() );
        getDocs( collection( databaseRef,`${uid}/giftapp/items` ) )
            .then( async collectionSnap => {
                collectionSnap.forEach((doc) => {
                    const snapItem: IItem = doc.data() as IItem;
                    const pathReference = ref(storage,`${uid}/${doc.id}`);
                    getDownloadURL(pathReference)
                        .then((url) => {
                            dispatch( addItem({
                                id: doc.id,
                                itemName: snapItem.itemName,
                                itemPrice: snapItem.itemPrice,
                                itemStore: snapItem.itemStore,
                                itemDescription: snapItem.itemDescription,
                                itemMark: snapItem.itemMark,
                                picture: url
                            }));
                        })
                        .catch((error) => {
                            dispatch( addItem({
                                id: doc.id,
                                itemName: snapItem.itemName,
                                itemPrice: snapItem.itemPrice,
                                itemStore: snapItem.itemStore,
                                itemDescription: snapItem.itemDescription,
                                itemMark: snapItem.itemMark,
                                picture: ''
                            }));
                            
                        })
                   
                })
                dispatch( unsetLoading() )
            })
            .catch( async (e) => {
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
                logEvent(analytics, 'add_item', {
                    user: uid,
                    item_id: snap.id
                });
                dispatch( addItem({
                    id: snap.id,
                    itemName: item.itemName,
                    itemPrice: item.itemPrice,
                    itemStore: item.itemStore,
                    itemDescription: item.itemDescription,
                    picture: item.picture,
                    itemMark: false
                }))
                if( item.picture ) {
                    const storageRef = ref(storage, `${uid}/${snap.id}`);
                    uploadString(storageRef, item.picture , 'data_url').then((snapshot) => {
                        console.log('Uploaded a base64 string!');
                    });
                }
                dispatch( unsetLoadingItem() );

            })
            .catch( error => {
                console.error( error )
                dispatch( unsetLoadingItem() );
            })
    }
}

export const startEditingItem = (item: IItem, oldItem: IItem, uuid: string) => {
    return (dispatch: any) => {
        dispatch( setDeleteLoading(item.id) );
        dispatch( setLoadingItem() )
        const newItem = {
            itemName: item.itemName ? item.itemName : oldItem.itemName,
            itemPrice: item.itemPrice ? item.itemPrice : oldItem.itemPrice,
            itemStore: item.itemStore ? item.itemStore : oldItem.itemStore,
            itemMark: item.itemMark ? item.itemMark : oldItem.itemMark,
            itemDescription: item.itemDescription ? item.itemDescription : oldItem.itemDescription,
            picture: item.picture ? item.picture : oldItem.picture 
        }
        if( item && oldItem )
        updateDoc(doc(databaseRef,`${uuid}/giftapp/items/${oldItem.id}`), newItem)
            .then(value => {
                dispatch( editItem(newItem, oldItem.id) );
                dispatch( unsetDeleteLoading() );
                dispatch( unsetLoadingItem() );
            })
            .catch( e => {
                console.error(e); 
                dispatch( unsetDeleteLoading() );
                dispatch( unsetLoadingItem() );
            });
    }
}

export const starDeleteItem = ( item: IItem, uid: string ) => {
    return ( dispatch: any ) => {
        dispatch( setDeleteLoading(item.id) )
        deleteDoc(doc( databaseRef, `${uid}/giftapp/items/${item.id}`))
            .then( () => {
                const desertRef = ref(storage, `${uid}/${item.id}`);
                deleteObject(desertRef).then(() => {
                // File deleted successfully
                }).catch((error) => {
                // Uh-oh, an error occurred!
                });
                dispatch( deleteItem(item) );
                dispatch( unsetDeleteLoading() );
            })
            .catch( e => {
                console.error( e );
                dispatch( unsetDeleteLoading() );
            })
    }
}

export const startToggleMark = ( item: IItem, userUuid: string ) => {
    return (dispatch: any) => {
        dispatch( setDeleteLoading(item.id) )
        if( item )
            updateDoc(doc(databaseRef,`${userUuid}/giftapp/items/${item.id}`), { itemMark: !item.itemMark }).then(value => {
                dispatch(markItem(item));
                dispatch( unsetDeleteLoading() );
            }).catch( e => {console.error(e); dispatch( unsetDeleteLoading() );});
    }
}

const markItem = ( item: IItem ) => ({
    type: types.itemsMark,
    payload: {
        item
    }
})

const editItem = ( newItem: IItem, itemId: string | undefined) => ({
    type: types.itemsEdit,
    payload: {
        itemId,
        newItem
    }
})

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

export const setError = (error: string) => ({
    type: types.itemsSetError,
    payload: {
        error: error
    }
})

// const unsetError = () => ({
//     type: types.itemsUnsetError
// })

// const setItems = ( items: [] | object ) => ({
//     type: types.itemsSet,
//     payload: {
//         items: items
//     }
// })

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

export const setInitialState = () => ({
    type: types.itemsReset
})
