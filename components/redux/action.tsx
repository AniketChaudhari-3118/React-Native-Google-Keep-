import { ADD_TO_CART } from "./constants";

export function addToCart(item: any) {
    return {
        type: ADD_TO_CART,
        data: item,
    };
}