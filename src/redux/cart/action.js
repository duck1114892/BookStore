export const isAddCart = (data) => {
    return {
        type: 'ADD_CART',
        payload: data
    }
}
export const isUpdateCart = (data) => {
    return {
        type: 'UPDATE_CART',
        payload: data
    }
}
export const isDeleteCart = (data) => {
    return {
        type: 'REMOVE_CART',
        payload: data
    }
}