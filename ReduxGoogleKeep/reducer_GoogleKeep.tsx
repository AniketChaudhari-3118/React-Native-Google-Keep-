import { SET_DATA } from "./constants_GoogleKeep";


const initialState = {
    pinnedNotes: [],
    otherNotes: [],
};

export const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_DATA:
            return {
                ...state,
                pinnedNotes: action.pinnedData,
                otherNotes: action.othersData,
            };

        default:
            return state;
    }
};

