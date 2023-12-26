export const searchAdmin = (data) => {
    return {
        type: 'SEARCH_ADMIN',
        payload: data,
    }
}
export const isSearch = (data) => {
    return {
        type: 'IS_SEARCH',
        payload: data
    }
}
