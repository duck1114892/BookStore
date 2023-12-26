

const initialState = {
    category: [],
    isFilter: false,
    range: ''
}
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTER':
            return { ...state, category: action.payload }
        case 'IS_FILTER':
            return { ...state, isFilter: action.payload }
        case 'RANGE':
            return { ...state, range: action.payload }
        case 'DEFAULT':
            return {
                category: [],
                isFilter: false,
                range: ''
            }
        default: return state


    }

}
export default rootReducer