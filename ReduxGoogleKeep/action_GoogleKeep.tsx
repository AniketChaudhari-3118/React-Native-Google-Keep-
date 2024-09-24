import { SET_DATA } from "./constants_GoogleKeep";


// Action to add Note data
export function addNotesData(notesData: any) {
    // console.warn(notesData);
    return {
        type: SET_DATA,
        data: notesData
    };
}

export function searchData(pinnedData: any, othersData: any) {
    return {
        type: SET_DATA,
        data: pinnedData, othersData
    }
}

