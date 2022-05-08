import { types } from "../../configs/types";


interface IUi {
    deleteLoading: string
}

const initialState: IUi = {
    deleteLoading: ''
}
export default function uiReducer( state = initialState, action: any):IUi {

    switch (action.type) {
        case types.uiSetDeleteLoading:
            return {
                ...state,
                deleteLoading: action.payload.itemId
            }
        case types.uiUnsetDeleteLoading:
            return {
                ...state,
                deleteLoading: ''
            }
        default:
            return state;
    }

}