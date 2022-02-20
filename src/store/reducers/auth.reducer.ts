import { types } from "../../configs/types";

const initialState:authInterface = {
    logged: false,
    name: "",
    uid: ""
}

export interface authInterface {
    logged: boolean,
    name: string,
    uid: string
}

export const authReducer = ( state = initialState, action: any) => {
    switch ( action.type ) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName,
                logged: true
            }
    
        case types.logout:
            return { }
        default:
            return state;
    };
};