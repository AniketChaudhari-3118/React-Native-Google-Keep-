import {  SET_DATA } from "./constants_GoogleKeep";


const initialState: any[] = [];

export const reducer = (state = initialState, action: any) => {
    switch (action?.type) {
        case SET_DATA:
            return [
                ...state,
                action?.data
            ];
        
        default:
            return state
    }
}

