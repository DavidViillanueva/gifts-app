import { types } from "../../configs/types";

interface authState {
    logged: boolean,
    name: string,
    uid: string,
    loading: boolean;
    publicUser?: any;
    favoriteProfiles: any[],
    typeUser: string
}
const initialState: authState = {
    logged: false,
    name: "",
    uid: "",
    loading: false,
    favoriteProfiles: [],
    publicUser: {},
    typeUser: "user"
}


export default function authReducer(state = initialState, action: any): authState {
    switch (action.type) {
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

        case types.authSetFavoriteProfiles:
            return {
                ...state,
                favoriteProfiles: action.payload
            }

        case types.authSetTypeUser:
            return {
                ...state,
                typeUser: action.payload
            }

        case types.authSetPublicProfile:
            return {
                ...state,
                publicUser: action.payload
            }

        case types.authUpdatePublicProfile:
            return {
                ...state,
                publicUser: { ...state.publicUser, ...action.payload }
            }

        case types.authUnsetPublicProfile:
            return {
                ...state,
                publicUser: {}
            }

        case types.logout:
            return {
                ...state,
                logged: false,
                uid: ''
            }
        default:
            return state;
    };
};