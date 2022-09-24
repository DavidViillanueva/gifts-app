import { types } from "../../configs/types";


interface IUi {
    deleteLoading: string,
    color: any
}

const initialState: IUi = {
    deleteLoading: '',
    color: {
        light: '#757ce8',
        main: '#03a9f4',
        dark: '#087fb6',
        contrastText: '#fff'
    }
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