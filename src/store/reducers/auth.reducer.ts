import { types } from "../../configs/types";

interface authState {
    logged: boolean,
    name: string,
    uid: string
}
const initialState:authState = {
    logged: false,
    name: "",
    uid: ""
}


export default function authReducer( state = initialState, action: any):authState {
    switch ( action.type ) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName,
                logged: true
            }
    
        case types.logout:
            return initialState 
        default:
            return state;
    };
};