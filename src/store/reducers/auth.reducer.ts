import { types } from "../../configs/types";

export const authReducer = ( state = {}, action: any) => {
    switch ( action.type ) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            }
    
        case types.logout:
            return { }
        default:
            return state;
    };
};