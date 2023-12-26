const initialState = {
    isSearch: false,
    data: '',

}
const searchAdminReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SEARCH_ADMIN':

            return { ...state, data: action.payload }
        case 'IS_SEARCH':

            return { ...state, isSearch: action.payload }
        default: return state
    }

}
export default searchAdminReducer