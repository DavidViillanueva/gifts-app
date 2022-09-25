import { types } from "../../configs/types";

export const colorReducer = (state:any, action:any) => {
    switch (action.type) {
      case types.uiSetProfileColor:
        return {
            color: action.payload
        }
      default:
        return state;
    }
  }