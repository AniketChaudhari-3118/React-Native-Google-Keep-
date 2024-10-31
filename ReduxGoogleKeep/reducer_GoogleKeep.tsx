import { PLACE_DATA, SET_DATA } from "./constants_GoogleKeep";


const initialState = {
    pinnedNotes: [],
    otherNotes: [],
    title: String,
    description: String
};

export const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_DATA:
            return {
                ...state,
                pinnedNotes: action.pinnedData,
                otherNotes: action.othersData,
            };
        case PLACE_DATA:
            return {
                ...state,
                title: action.title,
                description: action.description,
                place: action.place,
            };

        default:
            return state;
    }
};

