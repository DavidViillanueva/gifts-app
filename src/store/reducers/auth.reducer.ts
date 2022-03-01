import { types } from "../../configs/types";

interface authState {
    logged: boolean,
    name: string,
    uid: string,
    loading: boolean
}
const initialState:authState = {
    logged: false,
    name: "",
    uid: "",
    loading: false
}


export default function authReducer( state = initialState, action: any):authState {
    switch ( action.type ) {
        case types.login:
            return {
                ...state,
                uid: action.payload.uid,
                name: action.payload.displayName,
                logged: true,
            }
        
        case types.authSetLoading: 
            return {
                ...state,
                loading: true
            }

        case types.authUnsetLoading:
            return {
                ...state,
                loading: false
            }
            
        case types.logout:
            return initialState 
        default:
            return state;
    };
};