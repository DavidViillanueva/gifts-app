import { types } from "../../configs/types";

export const login = ( uid:any, displayName:any) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});