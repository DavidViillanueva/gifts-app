import { types } from "../../configs/types";

export const setDeleteLoading = (itemId: string | undefined) => ({
    type: types.uiSetDeleteLoading,
    payload: {
        itemId
    }
})

export const unsetDeleteLoading = () => ({
    type: types.uiUnsetDeleteLoading
})