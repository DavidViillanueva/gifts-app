import { types } from "../../configs/types";
import { IItem } from "../../models/item.model";

interface itemsState {
    items: [] | IItem[],
    loading: boolean,
    error: string,
    loadingItem: boolean
}

const initialState:itemsState = {
    items: [],
    loading: false,
    error: "",
    loadingItem: false
}

export default function itemsReducer( state = initialState, action: any):itemsState {
    switch ( action.type ) {
        case types.itemsSetLoading:
            return {
                ...state,
                loading: true
            }
        case types.itemsUnsetLoading:
            return {
                ...state,
                loading: false
            }
        
        case types.itemsSetError:
            return {
                ...state,
                error: action.payload.error
            }
        
        case types.itemsUnsetError:
            return {
                ...state,
                error: ""
            }
        
        case types.itemsSet:
            return {
                ...state,
                items: action.payload.items 
            }

        case types.itemsAdd: 
            return {
                ...state,
                items: [...state.items, action.payload.item ]
            }

        case types.itemsSetLoadingItem: 
            return {
                ...state,
                loadingItem: true
            }
        
        case types.itemsUnsetLoadingItem:
            return {
                ...state,
                loadingItem: false
            }
        
        default:
            return state;
    }

}