
import { ADD_TO_CART } from "./constants";
const initialState: any[] = [];


export const reducer = (state=initialState, action: any) => {
    switch(action.type) {
        case ADD_TO_CART:
            return [
                ...state,
                action.data
            ];

        default:
            return state
    }
}
