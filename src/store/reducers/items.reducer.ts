import { types } from "../../configs/types";

interface itemsState {
    items: [] | object,
    loading: boolean,
    error: string
}

const initialState:itemsState = {
    items: [],
    loading: false,
    error: ""
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
        
        case types.itemsAdd:
            return {
                ...state,
                items: action.payload.items 
            }
        
        default:
            return state;
    }

}